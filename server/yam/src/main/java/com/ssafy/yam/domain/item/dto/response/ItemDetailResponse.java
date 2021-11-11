package com.ssafy.yam.domain.item.dto.response;

import com.ssafy.yam.domain.deal.dto.response.DealUnavailableResponse;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class ItemDetailResponse {
    private ItemResponse item;
    private List<LocalDate> unavailableDate;

    public ItemDetailResponse(ItemResponse item, List<LocalDate> unavailableResponse) {
        this.item = item;
        this.unavailableDate = unavailableResponse;
    }
}
