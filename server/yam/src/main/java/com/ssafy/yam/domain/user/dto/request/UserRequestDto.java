package com.ssafy.yam.domain.user.dto.request;


import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

public class UserRequestDto {

    @Getter
    @Setter
    public static class SignUp {

        @NotEmpty(message = "이메일은 필수 입력값입니다.")
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
        private String userEmail;

        @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String userPassword;

        @NotEmpty(message = "닉네임은 필수 입력값입니다.")
        private String userNickname;

    }

    @Getter
    @Setter
    public static class Login {
        @NotEmpty(message = "이메일은 필수 입력값입니다.")
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
        private String userEmail;

        @NotEmpty(message = "비밀번호는 필수 입력값입니다.")
        private String userPassword;

        public UsernamePasswordAuthenticationToken toAuthentication() {
            return new UsernamePasswordAuthenticationToken(userEmail, userPassword);
        }
    }

    @Getter
    @Setter
    public static class SendEmail {
        @NotEmpty(message = "이메일은 필수 입력값입니다.")
        @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
        private String userEmail;
    }

    @Getter
    @Setter
    public static class ModifyAddress {
        private String userAddress;
        private String userAreaCode;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class ChatInfoReqDto {
        private int userId;
        private int itemId;
    }
}