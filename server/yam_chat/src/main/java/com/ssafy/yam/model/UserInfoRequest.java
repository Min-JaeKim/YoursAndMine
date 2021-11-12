package com.ssafy.yam.model;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserInfoRequest {
    private String userPk;
    private String token;
}
