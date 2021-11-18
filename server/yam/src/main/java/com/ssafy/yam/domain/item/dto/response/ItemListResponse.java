package com.ssafy.yam.domain.item.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemListResponse {
    private int itemId;
    private String itemName;
    private int itemPrice;
    private String itemAddress;
    private String itemImage;
    private int itemAreaCode;
    private LocalDateTime itemModifiedTime;
    private int bookmarkCount;
}
