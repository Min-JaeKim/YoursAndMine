package com.ssafy.yam.domain.user.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class UserResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoginResDto {
        private String accessToken;
        //        private String refreshToken;
        private String userAddress;
        private String userAreaCode;
    }

    @Getter
    @Setter
    public static class EmailResDto {
        private String email;
        private String title;
        private String message;
    }

    @Getter
    @Setter
    public static class SendEmailResDto {
        private String certificationNumber;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class ModifyProfileResDto {
        private boolean modifiedImage;
        private boolean modifiedNickname;
    }

    @Getter
    @Setter
    public static class ShowProfileResDto {
        private String userNickname;
        private String userImage;
        private String userAddress;
        private String userAreaCode;
        private int userAuthLevel;
    }

    @Getter
    @Setter
    public static class MonthScheduleResDto {
        private List<LocalDate> 반납일정 = new ArrayList<>();
        private List<LocalDate> 반납날짜 = new ArrayList<>();
        private List<LocalDate> 회수일정 = new ArrayList<>();
        private List<LocalDate> 회수날짜 = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class DayScheduleResDto {
        private List<GiveResDto> 반납일정 = new ArrayList<>();
        private List<TakeResDto> 회수일정 = new ArrayList<>();
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GiveResDto {
        private int itemId;
        private String itemName;
        private String itemSellerNickname;
        private List<String> itemImage = new ArrayList<>();
        private LocalDate dealStartDate;
        private LocalDate dealEndDate;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TakeResDto {
        private int itemId;
        private String itemName;
        private String itemBuyerNickname;
        private List<String> itemImage = new ArrayList<>();
        private int dealId;
        private LocalDate dealStartDate;
        private LocalDate dealEndDate;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GetGiveItemResDto {
        private int itemId;
        private String itemName;
        private List<String> itemImage = new ArrayList<>();
        private String itemAddress;
        private int itemPrice;
        private String itemActive;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GetTakeItemResDto {
        private int dealId;
        private int dealTotalPrice;
        private String dealStatus;
        private String itemName;
        private List<String> itemImage = new ArrayList<>();
        private String itemAddress;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GetItemHistoryResDto {
        private String itemBuyerNickname;
        private String itemBuyerImage;
        private LocalDate dealStartDate;
        private LocalDate dealEndDate;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Receipt {
        private int dealId;
        private LocalDate dealStartDate;
        private LocalDate dealEndDate;
        private int dealTotalPrice;
        private String itemName;
        private String itemBuyerNickname;
        private List<String> itemImage = new ArrayList<>();
        private String itemAddress;
        private int itemPrice;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WishList {
        private int itemId;
        private String itemName;
        private int itemPrice;
        private List<String> itemImage = new ArrayList<>();
        private String itemAddress;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MeResDto {
        private int userId;
        private String userEmail;
        private String userNickname;
        private String userAddress;
        private String userAreaCode;
        private String userImageUrl;
        private int userAuthLevel;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ChatInfoResDto {
        private int userId;
        private String userNickname;
        private String userImageUrl;
        private int itemId;
        private String itemName;
        private List<String> itemImage = new ArrayList<>();
        private int itemSellerId;
        private String itemSellerNickname;
        private String itemSellerImageUrl;
    }
}
