package com.ssafy.yam.domain.item.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ItemCreateRequest {
    private String itemName;
    private String itemContent;
    private String itemCategory;
    private int itemPrice;

    @Override
    public String toString() {
        return "ItemCreateRequest{" +
                "itemName='" + itemName + '\'' +
                ", itemContent='" + itemContent + '\'' +
                ", itemCategory='" + itemCategory + '\'' +
                ", itemPrice=" + itemPrice +

                '}';
    }
}
