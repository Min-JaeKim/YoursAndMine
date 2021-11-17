package com.ssafy.yam.domain.search.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {
    private int itemId;
    private String itemName;
    private int itemPrice;
    private String itemAddress;
    private String itemImage;
    private int itemAreaCode;
    private LocalDateTime itemModifiedTime;
    private int bookmarkCount;
    private int dealCount;
}
