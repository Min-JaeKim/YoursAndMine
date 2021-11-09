package com.ssafy.yam.domain.deal.service;

import com.ssafy.yam.domain.deal.dto.request.DealCreateRequest;
import com.ssafy.yam.domain.deal.dto.request.DealRequest;
import com.ssafy.yam.domain.deal.entity.Deal;
import com.ssafy.yam.domain.deal.repository.DealRepository;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional()
public class DealCRUDService {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final DealService dealService;
    private final DealRepository dealRepository;

    public int createDeal(DealCreateRequest dealRequest){
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        Item item = itemRepository.findItemByItemId(dealRequest.getItemId());
        if(item == null)
            return 3;
        User seller = item.getSeller();

        if(item.getSeller() == user)
            return 4;

        // 아이템이 대여가능 상태인지 검사사
        if(item.getItemIsActive().equals("N")){
            return 1;
        }

        List<Deal> dealList = dealRepository.findAllByItem_ItemId(item.getItemId());
        for(Deal deal : dealList){
            if(deal.getDealStatus().equals("대여중"))
                return 1;
        }

        // 대여가능한 날짜인지 검사
        LocalDate start = dealRequest.getDealStartDate();
        LocalDate end = dealRequest.getDealEndDate();
        List<LocalDate> unAvail = dealService.getUnavailableDate(item.getItemId());
        boolean isAvail = true;
        for(LocalDate checkDate = start; checkDate.isBefore(end); checkDate = checkDate.plusDays(1)){
            if(unAvail.contains(checkDate)){
                isAvail = false;
                break;
            }
        }

        if(unAvail.contains(end))
            isAvail = false;

        if(!isAvail)
            return 2;

        int period = calcDate(dealRequest.getDealStartDate(), dealRequest.getDealEndDate());
        int totalPrice = item.getItemPrice() * period;
        Deal deal = new Deal();
        deal.setDealStartDate(dealRequest.getDealStartDate());
        deal.setDealEndDate(dealRequest.getDealEndDate());
        deal.setDealTotalPrice(totalPrice);
        deal.setDealStatus("예약완료");
        deal.setBuyer(user);
        deal.setSeller(seller);
        deal.setItem(item);

        dealRepository.save(deal);

        // 아이템 테이블에서 대여 불가능으로 바꾸기
//        item.setItemIsActive("N");
//        itemRepository.save(item);

        return 0;
    }

    public int calcDate(LocalDate start, LocalDate end){
        int startMonth = start.getMonthValue();
        int startDate = start.getDayOfMonth();
        int endMonth = end.getMonthValue();
        int endDate = end.getDayOfMonth();

        int monthDiff = endMonth - startMonth;
        int dateDiff = 0;

        if(monthDiff == 0){
            dateDiff = endDate - startDate + 1;
        }else{
            dateDiff = (int) ChronoUnit.DAYS.between(start, end);
        }

        return dateDiff;
    }

    public void deleteDeal(int dealId) {
        Deal deal = getDeal(dealId);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        if (!deal.getBuyer().getUserEmail().equals(tokenEmail)) {
            throw new IllegalArgumentException("예약을 취소할 권한이 없습니다.");
        }
        dealRepository.delete(deal);
    }

    private Deal getDeal(int dealId) {
        return dealRepository.findById(dealId)
                .orElseThrow(() -> new IllegalArgumentException("해당 예약이 존재하지 않습니다."));
    }

    public void returnDeal(String token, int dealId){
        Deal deal = getDeal(dealId);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        if (!deal.getBuyer().getUserEmail().equals(tokenEmail)) {
            throw new IllegalArgumentException("반납을 완료할 권한이 없습니다.");
        }

        deal.setDealStatus("반납완료");
        dealRepository.save(deal);
    }

    public void borrowDeal(String token, int dealId){
        Deal deal = getDeal(dealId);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        if (!deal.getBuyer().getUserEmail().equals(tokenEmail)) {
            throw new IllegalArgumentException("대여를 수정할 권한이 없습니다.");
        }

        deal.setDealStatus("대여중");
        dealRepository.save(deal);
    }

    public void updateDealStatus(){
        List<Deal> dealList = dealRepository.findAll();
        for(Deal deal : dealList){
            if(deal.getDealStartDate().equals(LocalDate.now())) {
                deal.setDealStatus("대여중");
                dealRepository.save(deal);
            }
        }
    }
}
