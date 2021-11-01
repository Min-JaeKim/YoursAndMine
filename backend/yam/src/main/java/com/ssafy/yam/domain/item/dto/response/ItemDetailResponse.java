package com.ssafy.yam.domain.item.dto.response;

import com.ssafy.yam.domain.deal.dto.response.DealUnavailableResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ItemDetailResponse {
    private ItemResponse item;
    private List<LocalDate> unavailableDate;

    public ItemDetailResponse(ItemResponse item, List<LocalDate> unavailableResponse) {
        this.item = item;
        this.unavailableDate = unavailableResponse;
    }
}
