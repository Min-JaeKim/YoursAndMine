package com.ssafy.yam.domain.user.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class UserResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {
        private String grantType;
        private String accessToken;
        private String refreshToken;
        private Long accessTokenExpiresIn;
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
    public static class ScheduleResDto {
        private List<LocalDate> 일정있는날짜 = new ArrayList<>();
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
}
