package com.ssafy.yam.domain.deal.service;

import com.ssafy.yam.domain.deal.dto.response.DealUnavailableResponse;
import com.ssafy.yam.domain.deal.entity.Deal;
import com.ssafy.yam.domain.deal.repository.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DealService {

    private final DealRepository dealRepository;

    @Transactional
    public List<LocalDate> getUnavailableDate(int itemId){
//        Long uid = userRepository.findByUserEmail(tokenEmail).get().getUid();
//
//        List<Item> itemList = itemRepository.findByUser_Uid(uid);
//        for (int i = 0; i < itemList.size(); i++) {
//            if(itemList.get(i).getItemId() == itemId){
//                throw new IllegalArgumentException("본인의 물건은 대여할 수 없습니다.");
//            }
//        }

        int currentMonth = LocalDate.now().getMonthValue();
        int afterMonth = currentMonth + 1;
//        DealUnavailableResponse result = new DealUnavailableResponse();
        List<LocalDate> dayList = new ArrayList<>();
        List<Deal> list = dealRepository.findAllByItem_ItemId(itemId);

        for (int i = 0; i < list.size(); i++) {
//            System.out.println(list.get(i).getDealStartDate() + " " + list.get(i).getDealEndDate());
            int month = list.get(i).getDealEndDate().getMonthValue();
            int day = list.get(i).getDealEndDate().getDayOfMonth();
            if(list.get(i).getDealEndDate().isAfter(LocalDate.now()) && month <= afterMonth && !list.get(i).getDealStatus().equals("반납완료")){ // 해당 아이템의 거래확정 내역 중 오늘 이후에 끝나면서 종료월이 다음날 이내라면
                // 그 시작부터 종료까지의 날짜를 담아라
                makeList(dayList, list, i);
            }else{
                makeList(dayList, list, i);
            }
        }
//        result.setUnavailableList(dayList);
		return dayList;
    }

    private void makeList(List<LocalDate> dayList, List<Deal> list, int i) {
        LocalDate startValue = list.get(i).getDealStartDate();
        LocalDate endValue = list.get(i).getDealEndDate();
        while(startValue.isBefore(endValue) || startValue.isEqual(endValue)){
            if(!dayList.contains(startValue))
                dayList.add(startValue);
            startValue = startValue.plusDays(1);
        }
    }

}
