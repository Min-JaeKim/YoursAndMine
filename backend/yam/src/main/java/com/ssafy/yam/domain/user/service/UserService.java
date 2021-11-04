package com.ssafy.yam.domain.user.service;

//import com.ssafy.yam.auth.Provider.JwtTokenProvider;
import com.ssafy.yam.auth.Provider.RandomSaltProvider;
import com.ssafy.yam.domain.deal.entity.Deal;
import com.ssafy.yam.domain.deal.repository.DealRepository;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.user.dto.request.UserRequestDto;
import com.ssafy.yam.domain.user.dto.response.UserResponseDto;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.enums.Role;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.ResponseUtils;
import com.ssafy.yam.utils.S3UploadUtils;
import com.ssafy.yam.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import static com.ssafy.yam.utils.ConstantsUtils.FROM_EMAIL_ADDRESS;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final DealRepository dealRepository;
    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;
    private final ResponseUtils response;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ModelMapper modelMapper;
    private RandomSaltProvider randomSaltProvider;
//    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Transactional
    public ResponseEntity<?> signUp(UserRequestDto.SignUp signUp) {
        if(userRepository.existsByUserEmail(signUp.getUserEmail())) {
            return response.fail("이미 회원가입된 email 입니다.", HttpStatus.BAD_REQUEST);
        }

        String salt = randomSaltProvider.getNextSalt().toString();

        User user = User.builder()
                .userNickname(signUp.getUserNickname())
                .userEmail(signUp.getUserEmail())
                .userPassword(passwordEncoder.encode(signUp.getUserPassword() + salt))
//                .userPassword(passwordEncoder.encode(signUp.getUserPassword()))
                .userSalt(salt)
                .userImageUrl("https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png")
                .userAuthLevel(1)
                .build();
        userRepository.save(user);

        return response.success("회원가입에 성공했습니다.");
    }

//    public ResponseEntity<?> login(UserRequestDto.Login login) {
//        if(!userRepository.existsByUserEmail(login.getUserEmail())) {
//            return response.fail("해당하는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
//        }
//
//        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
//        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
//        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();
//
//        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
//        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//
//        // 3. 인증 정보를 기반으로 JWT 토큰 생성
//        UserResponseDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
//
//        // TODO:: RefreshToken Redis 저장
//
//        return response.success(tokenInfo, "로그인에 성공했습니다.", HttpStatus.OK);
//    }

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
    public UserResponseDto.ModifyProfileResDto modifyProfile(String token, MultipartFile userImage, String userNickname) {
        UserResponseDto.ModifyProfileResDto modifyProfileResDto = new UserResponseDto.ModifyProfileResDto(false, false);
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
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

    public UserResponseDto.ShowProfileResDto showProfile(String token) {
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        UserResponseDto.ShowProfileResDto showProfileResDto = modelMapper.map(user, UserResponseDto.ShowProfileResDto.class);

        return showProfileResDto;
    }

    @Transactional
    public boolean modifyAddress(String token, UserRequestDto.ModifyAddress modifyAddress) {
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        user.setUserAddress(modifyAddress.getUserAddress());
        user.setUserAreaCode(modifyAddress.getUserAreaCode());
        userRepository.save(user);

        // token 에 주소정보를 담을 경우 토큰 갱신 반환해야 한다.
        return true;
    }

    public UserResponseDto.ScheduleResDto getSchedule(String token, String userDate) {
        LocalDate requestDate = LocalDate.parse(userDate);
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        UserResponseDto.ScheduleResDto scheduleResDto = new UserResponseDto.ScheduleResDto();
        int currentMonth = requestDate.getMonthValue();

        List<Deal> dealList = dealRepository.findByBuyer_UserIdOrSeller_UserId(user.getUserId(), user.getUserId());
        List<UserResponseDto.GiveResDto> giveList = new ArrayList<>();
        List<UserResponseDto.TakeResDto> takeList = new ArrayList<>();

        scheduleResDto.set일정있는날짜(getScheduledDate(dealList, currentMonth));

        for (int i = 0; i < dealList.size(); i++) {
            // 요청받은 날짜와 같은 달에 거래가 시작/종료되는 경우
            if(dealList.get(i).getDealEndDate().getMonthValue() == currentMonth || dealList.get(i).getDealStartDate().getMonthValue() == currentMonth) {
                if(dealList.get(i).getSeller().getUserId() == user.getUserId()) {
                    // 내가 판매중인 아이템 == take
                    UserResponseDto.TakeResDto tmpTake = new UserResponseDto.TakeResDto();
                    Item tmpItem = itemRepository.findItemByItemId(dealList.get(i).getItem().getItemId());
                    tmpTake.setItemId(tmpItem.getItemId());
                    tmpTake.setItemName(tmpItem.getItemName());
                    tmpTake.setItemBuyerNickname(userRepository.findByUserId(dealList.get(i).getBuyer().getUserId()).get().getUserNickname());
                    tmpTake.setItemImage(imageRepository.findAllImageUrlByItem_ItemId(tmpItem.getItemId()));
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

            } else dealList.remove(i);
        }

        scheduleResDto.set반납일정(giveList);
        scheduleResDto.set회수일정(takeList);

        return scheduleResDto;
    }

    public List<LocalDate> getScheduledDate(List<Deal> dealList, int currentMonth) {
        // 나의 거래 리스트와 현재 월이 주어지면, 해당 월에 일정이 있는 날짜를 모두 리턴
        List<LocalDate> dateList = new ArrayList<>();
        HashSet<LocalDate> dateSet = new HashSet<>();
        for (int i = 0; i < dealList.size(); i++) {
            if(dealList.get(i).getDealStartDate().getMonthValue() == currentMonth && dealList.get(i).getDealEndDate().getMonthValue() ==currentMonth) {
                // 거래 시작일과 종료일이 같은 월 안에 포함된 경우
                LocalDate pivotDate = dealList.get(i).getDealStartDate();
                while(pivotDate.isBefore(dealList.get(i).getDealEndDate().plusDays(1))) {
                    dateSet.add(pivotDate);
                    pivotDate = pivotDate.plusDays(1);
                }
            } else if(dealList.get(i).getDealStartDate().getMonthValue() == currentMonth) {
                // 거래 시작일은 해당 월이지만, 거래 종료일이 이번달이 아닌 경우
                LocalDate pivotDate = dealList.get(i).getDealStartDate();
                while(pivotDate.getMonthValue() == currentMonth) {
                    dateSet.add(pivotDate);
                    pivotDate = pivotDate.plusDays(1);
                }
            } else if(dealList.get(i).getDealEndDate().getMonthValue() == currentMonth) {
                // 거래 종료일은 해당 월이지만, 거래 시작일이 이번달이 아닌 경우
                LocalDate pivotDate = dealList.get(i).getDealEndDate();
                while(pivotDate.getMonthValue() == currentMonth){
                    dateSet.add(pivotDate);
                    pivotDate = pivotDate.minusDays(1);
                }
            } else continue;
        }

        for(LocalDate date : dateSet) {
            dateList.add(date);
        }
        Collections.sort(dateList);
        return dateList;
    }

    public List<UserResponseDto.GetGiveItemResDto> getGiveItem(String token) {
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
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

    public List<UserResponseDto.GetTakeItemResDto> getTakeItem(String token) {
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
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

    public List<UserResponseDto.GetItemHistoryResDto> getItemHistory(String token, int itemid) {
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
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

    public UserResponseDto.Receipt getReceipt(String token, int dealId) {
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
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
}
