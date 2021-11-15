package com.ssafy.yam.domain.user.service;

import com.ssafy.yam.domain.user.entity.Authority;
import com.ssafy.yam.domain.bookmark.entity.Bookmark;
import com.ssafy.yam.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.yam.domain.deal.entity.Deal;
import com.ssafy.yam.domain.deal.repository.DealRepository;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.user.dto.request.UserRequestDto;
import com.ssafy.yam.domain.user.dto.response.UserResponseDto;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.jwt.TokenProvider;
import com.ssafy.yam.utils.S3UploadUtils;
import com.ssafy.yam.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import static com.ssafy.yam.utils.ConstantsUtils.*;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final DealRepository dealRepository;
    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;
    private final BookmarkRepository bookmarkRepository;
    private final PasswordEncoder passwordEncoder;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ModelMapper modelMapper;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Transactional
    public boolean signup(UserRequestDto.SignUp signUp) {
        if(userRepository.existsByUserEmail(signUp.getUserEmail())) {
            return false;
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .userNickname(signUp.getUserNickname())
                .userEmail(signUp.getUserEmail())
                .userPassword(passwordEncoder.encode(signUp.getUserPassword()))
                .userImageUrl("https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png")
                .userAuthLevel(1)
                .authorities(Collections.singleton(authority))
                .build();
        userRepository.save(user);

        return true;
    }

    public UserResponseDto.LoginResDto login(UserRequestDto.Login Login) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(Login.getUserEmail(), Login.getUserPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(AUTH_HEADER, TOKEN_TYPE + jwt);

        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        String userAddress = userRepository.findByUserEmail(tokenEmail).get().getUserAddress();
        String userAreaCode = userRepository.findByUserEmail(tokenEmail).get().getUserAreaCode();

        return new UserResponseDto.LoginResDto(TOKEN_TYPE + jwt, userAddress, userAreaCode);
    }

    public boolean emailCheck(String userEmail) {
        return userRepository.existsByUserEmail(userEmail);
    }

    public UserResponseDto.SendEmailResDto sendEmail(String userEmail) {
        UserResponseDto.SendEmailResDto sendEmailResDto = new UserResponseDto.SendEmailResDto();

        // 인증번호 생성
        String key = certificationNumberGenerator();
        // 메일 생성
        UserResponseDto.EmailResDto mail = createEmail(userEmail, key);
        // 메일 전송
        mailSend(mail);
        sendEmailResDto.setCertificationNumber(key);

        return sendEmailResDto;
    }

    @Autowired
    private JavaMailSender mailSender;
    public void mailSend(UserResponseDto.EmailResDto emailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailDto.getEmail());
        message.setFrom(FROM_EMAIL_ADDRESS);
        message.setSubject(emailDto.getTitle());
        message.setText(emailDto.getMessage());
        mailSender.send(message);

    }

    public UserResponseDto.EmailResDto createEmail(String userEmail, String certificationNumber) {
        UserResponseDto.EmailResDto emailResDto = new UserResponseDto.EmailResDto();
        emailResDto.setEmail(userEmail);
        emailResDto.setTitle("YAM 인증번호 안내 관련 메일 입니다.");
        emailResDto.setMessage("안녕하세요. YAM 인증번호 안내 관련 메일 입니다." + "\n" + "고객님의 인증번호는 " + certificationNumber + "입니다.");

        return emailResDto;
    }

    public String certificationNumberGenerator(){

        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        StringBuilder sb = new StringBuilder();
        int idx = 0;

        for (int i = 0; i < 6; i++) {
            idx = (int) (charSet.length * Math.random());
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    @Autowired
    private S3UploadUtils s3UploadUtils;

    @Transactional
    public UserResponseDto.ModifyProfileResDto modifyProfile(MultipartFile userImage, String userNickname) {
        UserResponseDto.ModifyProfileResDto modifyProfileResDto = new UserResponseDto.ModifyProfileResDto(false, false);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        String userSet = tokenEmail + "(" + LocalDate.now().toString() + ")";
        String imageUrl = null;

        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        if(userImage != null) {
            try {
                imageUrl = s3UploadUtils.upload(userImage, "profile", userSet);
                logger.info(tokenEmail + " : profile image upload s3 success");
            } catch (IOException e){
                logger.info(tokenEmail + " : profile image upload s3 fail");
                e.printStackTrace();
            }
        }

        if(imageUrl != null){
            user.setUserImageUrl(imageUrl);
            modifyProfileResDto.setModifiedImage(true);
        }
        if(userNickname != null){
            user.setUserNickname(userNickname);
            modifyProfileResDto.setModifiedNickname(true);
        }

        userRepository.save(user);

        return modifyProfileResDto;
    }

    public UserResponseDto.ShowProfileResDto showProfile() {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        UserResponseDto.ShowProfileResDto showProfileResDto = modelMapper.map(user, UserResponseDto.ShowProfileResDto.class);

        return showProfileResDto;
    }

    @Transactional
    public boolean modifyAddress(UserRequestDto.ModifyAddress modifyAddress) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        user.setUserAddress(modifyAddress.getUserAddress());
        user.setUserAreaCode(modifyAddress.getUserAreaCode());
        userRepository.save(user);

        // token 에 주소정보를 담을 경우 토큰 갱신 반환해야 한다.
        return true;
    }

    public UserResponseDto.MonthScheduleResDto getMonthSchedule(String userDate) {
        LocalDate requestDate = LocalDate.parse(userDate);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        UserResponseDto.MonthScheduleResDto monthScheduleResDto = new UserResponseDto.MonthScheduleResDto();
        int currentMonth = requestDate.getMonthValue();

        List<Deal> giveList = dealRepository.findByBuyer_UserId(user.getUserId()); // 반납 리스트 : 내가 구매자
        List<Deal> takeList = dealRepository.findBySeller_UserId(user.getUserId()); // 회수 리스트 : 내가 판매자

        // 나의 거래 리스트와 현재 월이 주어지면, 해당 월에 일정이 있는 날짜를 모두 리턴
        List<LocalDate> takeDateList = new ArrayList<>();
        List<LocalDate> giveDateList = new ArrayList<>();
        List<LocalDate> takeEndDateList = new ArrayList<>();
        List<LocalDate> giveEndDateList = new ArrayList<>();
        HashSet<LocalDate> takeDateSet = new HashSet<>();
        HashSet<LocalDate> giveDateSet = new HashSet<>();
        HashSet<LocalDate> takeEndDateSet = new HashSet<>();
        HashSet<LocalDate> giveEndDateSet = new HashSet<>();

        // 내가 판매자인 경우 : 회수일정
        for (int i = 0; i < takeList.size(); i++) {
            if(takeList.get(i).getDealStartDate().getMonthValue() == currentMonth && takeList.get(i).getDealEndDate().getMonthValue() ==currentMonth) {
                // 거래 시작일과 종료일이 같은 월 안에 포함된 경우
                LocalDate pivotDate = takeList.get(i).getDealStartDate();
                while(pivotDate.isBefore(takeList.get(i).getDealEndDate().plusDays(1))) {
                    takeDateSet.add(pivotDate);
                    pivotDate = pivotDate.plusDays(1);
                }
                // 마감날짜 추가
                takeEndDateSet.add(takeList.get(i).getDealEndDate());
            } else if(takeList.get(i).getDealStartDate().getMonthValue() == currentMonth) {
                // 거래 시작일은 해당 월이지만, 거래 종료일이 이번달이 아닌 경우
                LocalDate pivotDate = takeList.get(i).getDealStartDate();
                while(pivotDate.getMonthValue() == currentMonth) {
                    takeDateSet.add(pivotDate);
                    pivotDate = pivotDate.plusDays(1);
                }
            } else if(takeList.get(i).getDealEndDate().getMonthValue() == currentMonth) {
                // 거래 종료일은 해당 월이지만, 거래 시작일이 이번달이 아닌 경우
                LocalDate pivotDate = takeList.get(i).getDealEndDate();
                while(pivotDate.getMonthValue() == currentMonth){
                    takeDateSet.add(pivotDate);
                    pivotDate = pivotDate.minusDays(1);
                }
                // 마감날짜 추가
                takeEndDateSet.add(takeList.get(i).getDealEndDate());
            } else continue;
        }

        for(LocalDate date : takeDateSet) takeDateList.add(date);
        Collections.sort(takeDateList);
        monthScheduleResDto.set회수일정(takeDateList);

        for(LocalDate date : takeEndDateSet) takeEndDateList.add(date);
        Collections.sort(takeEndDateList);
        monthScheduleResDto.set회수날짜(takeEndDateList);

        // 내가 구매자인 경우 : 반납일정
        for (int i = 0; i < giveList.size(); i++) {
            if(giveList.get(i).getDealStartDate().getMonthValue() == currentMonth && giveList.get(i).getDealEndDate().getMonthValue() ==currentMonth) {
                // 거래 시작일과 종료일이 같은 월 안에 포함된 경우
                LocalDate pivotDate = giveList.get(i).getDealStartDate();
                while(pivotDate.isBefore(giveList.get(i).getDealEndDate().plusDays(1))) {
                    giveDateSet.add(pivotDate);
                    pivotDate = pivotDate.plusDays(1);
                }
                // 마감날짜 추가
                giveEndDateSet.add(giveList.get(i).getDealEndDate());
            } else if(giveList.get(i).getDealStartDate().getMonthValue() == currentMonth) {
                // 거래 시작일은 해당 월이지만, 거래 종료일이 이번달이 아닌 경우
                LocalDate pivotDate = giveList.get(i).getDealStartDate();
                while(pivotDate.getMonthValue() == currentMonth) {
                    giveDateSet.add(pivotDate);
                    pivotDate = pivotDate.plusDays(1);
                }
            } else if(giveList.get(i).getDealEndDate().getMonthValue() == currentMonth) {
                // 거래 종료일은 해당 월이지만, 거래 시작일이 이번달이 아닌 경우
                LocalDate pivotDate = giveList.get(i).getDealEndDate();
                while(pivotDate.getMonthValue() == currentMonth){
                    giveDateSet.add(pivotDate);
                    pivotDate = pivotDate.minusDays(1);
                }
                // 마감날짜 추가
                giveEndDateSet.add(giveList.get(i).getDealEndDate());
            } else continue;
        }

        for(LocalDate date : giveDateSet) giveDateList.add(date);
        Collections.sort(giveDateList);
        monthScheduleResDto.set반납일정(giveDateList);

        for(LocalDate date : giveEndDateSet) giveEndDateList.add(date);
        Collections.sort(giveEndDateList);
        monthScheduleResDto.set반납날짜(giveEndDateList);

        return monthScheduleResDto;
    }

    public UserResponseDto.DayScheduleResDto getDaySchedule(String userDate) {
        LocalDate requestDate = LocalDate.parse(userDate);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        UserResponseDto.DayScheduleResDto dayScheduleResDto = new UserResponseDto.DayScheduleResDto();

        List<Deal> dealList = dealRepository.findByBuyer_UserIdOrSeller_UserId(user.getUserId(), user.getUserId());
        List<UserResponseDto.GiveResDto> giveList = new ArrayList<>();
        List<UserResponseDto.TakeResDto> takeList = new ArrayList<>();

        for (int i = 0; i < dealList.size(); i++) {
            // 요청받은 날짜가 자신이 연관된 거래의 시작일과 종료일 사이에 있는 경우
            if(requestDate.isAfter(dealList.get(i).getDealStartDate().minusDays(1)) && requestDate.isBefore(dealList.get(i).getDealEndDate().plusDays(1))) {
                if(dealList.get(i).getSeller().getUserId() == user.getUserId()) {
                    // 내가 판매중인 아이템 == take
                    UserResponseDto.TakeResDto tmpTake = new UserResponseDto.TakeResDto();
                    Item tmpItem = itemRepository.findItemByItemId(dealList.get(i).getItem().getItemId());
                    tmpTake.setItemId(tmpItem.getItemId());
                    tmpTake.setItemName(tmpItem.getItemName());
                    tmpTake.setItemBuyerNickname(userRepository.findByUserId(dealList.get(i).getBuyer().getUserId()).get().getUserNickname());
                    tmpTake.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(tmpItem.getItemId()));
                    tmpTake.setDealId(dealList.get(i).getDealId());
                    tmpTake.setDealStartDate(dealList.get(i).getDealStartDate());
                    tmpTake.setDealEndDate(dealList.get(i).getDealEndDate());
                    takeList.add(tmpTake);
                } else {
                    // 내가 대여하고 있는 아이템 == give
                    UserResponseDto.GiveResDto tmpGive = new UserResponseDto.GiveResDto();
                    Item tmpItem = itemRepository.findItemByItemId(dealList.get(i).getItem().getItemId());
                    tmpGive.setItemId(tmpItem.getItemId());
                    tmpGive.setItemName(tmpItem.getItemName());
                    tmpGive.setItemSellerNickname(userRepository.findByUserId(dealList.get(i).getSeller().getUserId()).get().getUserNickname());
                    tmpGive.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(tmpItem.getItemId()));
                    tmpGive.setDealStartDate(dealList.get(i).getDealStartDate());
                    tmpGive.setDealEndDate(dealList.get(i).getDealEndDate());
                    giveList.add(tmpGive);
                }

            } else continue;
        }

        dayScheduleResDto.set반납일정(giveList);
        dayScheduleResDto.set회수일정(takeList);

        return dayScheduleResDto;
    }

    public List<UserResponseDto.GetGiveItemResDto> getGiveItem() {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        List<UserResponseDto.GetGiveItemResDto> giveItemList = new ArrayList<>();
        List<Item> itemList = itemRepository.findAllBySeller_UserIdOrderByItemModifiedTime(user.getUserId());
        for (int i = 0; i < itemList.size(); i++) {
            UserResponseDto.GetGiveItemResDto tmp = modelMapper.map(itemList.get(i), UserResponseDto.GetGiveItemResDto.class);
            tmp.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(tmp.getItemId()));
            giveItemList.add(tmp);
        }

        return giveItemList;
    }

    public String switchItemActive(int itemId) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        Item item = itemRepository.findItemByItemId(itemId);
        String status = item.getItemIsActive();
        status = status.equals("Y") ? "N" : "Y";
        String result = status.equals("Y") ? "활성화" : "비활성화";
        item.setItemIsActive(status);
        itemRepository.save(item);

        return String.format("%d번 아이템이 %s 되었습니다.", itemId, result);
    }

    public List<UserResponseDto.GetTakeItemResDto> getTakeItem() {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        List<UserResponseDto.GetTakeItemResDto> takeItemList = new ArrayList<>();
        List<Deal> dealList = dealRepository.findByBuyer_UserIdOrderByDealStartDate(user.getUserId());
        for (int i = 0; i < dealList.size(); i++) {
            UserResponseDto.GetTakeItemResDto tmp = modelMapper.map(dealList.get(i), UserResponseDto.GetTakeItemResDto.class);
            tmp.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(dealList.get(i).getItem().getItemId()));
            tmp.setItemAddress(itemRepository.findItemByItemId(dealList.get(i).getItem().getItemId()).getItemAddress());
            tmp.setItemName(itemRepository.findItemByItemId(dealList.get(i).getItem().getItemId()).getItemName());
            takeItemList.add(tmp);
        }

        return takeItemList;
    }

    public List<UserResponseDto.GetItemHistoryResDto> getItemHistory(int itemid) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        List<UserResponseDto.GetItemHistoryResDto> historyList = new ArrayList<>();
        List<Deal> dealList = dealRepository.findAllByItem_ItemId(itemid);
        for (int i = 0; i < dealList.size(); i++) {
            UserResponseDto.GetItemHistoryResDto tmp = modelMapper.map(dealList.get(i), UserResponseDto.GetItemHistoryResDto.class);
            tmp.setItemBuyerImage(userRepository.findByUserId(dealList.get(i).getBuyer().getUserId()).get().getUserImageUrl());
            tmp.setItemBuyerNickname(userRepository.findByUserId(dealList.get(i).getBuyer().getUserId()).get().getUserNickname());
            historyList.add(tmp);
        }

        return historyList;
    }

    public UserResponseDto.Receipt getReceipt(int dealId) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        Deal deal = dealRepository.findByDealId(dealId).get();
        UserResponseDto.Receipt receipt = modelMapper.map(deal, UserResponseDto.Receipt.class);
        receipt.setItemName(deal.getItem().getItemName());
        receipt.setItemBuyerNickname(deal.getBuyer().getUserNickname());
        receipt.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(deal.getItem().getItemId()));
        receipt.setItemAddress(deal.getItem().getItemAddress());
        receipt.setItemPrice(deal.getItem().getItemPrice());

        return receipt;
    }

    public List<UserResponseDto.WishList> getWishList() {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        List<UserResponseDto.WishList> wishList = new ArrayList<>();
        List<Bookmark> bookmarkList = bookmarkRepository.findAllByBookmarkId_UserId(user.getUserId());
        for (int i = 0; i < bookmarkList.size(); i++) {
            Item item = itemRepository.findItemByItemId(bookmarkList.get(i).getBookmarkId().getItemId());
            UserResponseDto.WishList tmp = modelMapper.map(item, UserResponseDto.WishList.class);
            tmp.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(tmp.getItemId()));
            wishList.add(tmp);
        }

        return wishList;
    }

    public UserResponseDto.MeResDto getMe() {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        UserResponseDto.MeResDto meResDto = modelMapper.map(user, UserResponseDto.MeResDto.class);

        return meResDto;
    }

    public List<UserResponseDto.ChatInfoResDto> getChatInfo(List<UserRequestDto.ChatInfoReqDto> mapList) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException(("해당 유저가 없습니다.")));

        List<UserResponseDto.ChatInfoResDto> chatInfoResDtoList = new ArrayList<>();
        for (int i = 0; i < mapList.size(); i++) {
            System.out.println((i+1)+"번째 mapList : " + mapList.get(i).toString());
            UserResponseDto.ChatInfoResDto tmp = modelMapper.map(itemRepository.findItemByItemId(mapList.get(i).getItemId()), UserResponseDto.ChatInfoResDto.class);
            tmp.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(mapList.get(i).getItemId()));
            tmp.setItemSellerNickname(userRepository.findByUserId(tmp.getItemSellerId()).get().getUserNickname());
            tmp.setItemSellerImageUrl(userRepository.findByUserId(tmp.getItemSellerId()).get().getUserImageUrl());
            tmp.setUserId(mapList.get(i).getUserId());
            tmp.setUserNickname(userRepository.findByUserId(tmp.getUserId()).get().getUserNickname());
            tmp.setUserImageUrl(userRepository.findByUserId(tmp.getUserId()).get().getUserImageUrl());

            chatInfoResDtoList.add(tmp);
        }

        return chatInfoResDtoList;
    }
}
