package com.ssafy.yam.utils;

import com.ssafy.yam.domain.deal.service.DealCRUDService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduleUtils {

    private final DealCRUDService dealCRUDService;

    public ScheduleUtils(DealCRUDService dealCRUDService) {
        this.dealCRUDService = dealCRUDService;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void checkDeal(){
        dealCRUDService.updateDealStatus();
    }
}
