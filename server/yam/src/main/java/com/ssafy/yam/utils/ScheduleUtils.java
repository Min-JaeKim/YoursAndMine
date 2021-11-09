package com.ssafy.yam.utils;

import com.ssafy.yam.domain.deal.service.DealCRUDService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduleUtils {

//    @Scheduled(cron = "10 * * * * ?")
//    public void scheduleTest(){
//        System.out.println(DateTime.now());
//    }

    private final DealCRUDService dealCRUDService;

    public ScheduleUtils(DealCRUDService dealCRUDService) {
        this.dealCRUDService = dealCRUDService;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void checkDeal(){
        System.out.println("스케줄 실행");
        dealCRUDService.updateDealStatus();
    }
}
