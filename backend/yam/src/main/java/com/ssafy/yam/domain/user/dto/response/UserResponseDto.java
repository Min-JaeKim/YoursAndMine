package com.ssafy.yam.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
    public static class sendEmailResDto {
        private String certificationNumber;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class modifyProfileResDto {
        private boolean modifiedImage;
        private boolean modifiedNickname;
    }
}
