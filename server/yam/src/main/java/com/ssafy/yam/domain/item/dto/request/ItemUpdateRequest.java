package com.ssafy.yam.domain.item.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ItemUpdateRequest {
    private int itemId;
    private String itemName;
    private String itemContent;
    private String itemCategory;
    private int itemPrice;
}
