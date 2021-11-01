package com.ssafy.yam.domain.item.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDetailResponse {
    private ItemResponse item;


    public ItemDetailResponse(ItemResponse item) {
        this.item = item;
    }
}
