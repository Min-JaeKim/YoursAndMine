package com.ssafy.yam.domain.item.dto.response;


import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemResponse {
    private int itemId;
    private String itemCategory;
    private String itemName;
    private String itemContent;
    private int itemPrice;
    private String itemAddress;
    private Owner owner;

    private int itemAreaCode;
    private LocalDateTime itemModifiedTime;
    private int bookmarkCount;
    private String bookmark;

//    private int bookmarkCount;

//    public ItemResponse(Item item) {
//        this.itemId = item.getItemId();
//        this.itemCategory = item.getItemCategory();
//        this.itemName = item.getItemName();
//        this.itemPrice = item.getItemPrice();
//        this.itemAddress = item.getItemAddress();
//        this.itemAreaCode = item.getItemAreaCode();
//        this.itemModifiedTime = item.getItemModifiedTime();
////        this.sellerId = item.getSellerId();
//    }
    @Data
    @Builder
    public static class Owner{
        private int ownerId;
        private String ownerNickName;
        private String ownerAddress;
        private String ownerImageUrl;
    }
}
