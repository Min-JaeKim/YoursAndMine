package com.ssafy.yam.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String userNickname;

    private String userEmail;

    private String userPassword;

    @JsonIgnore
    private String userSalt;

    private String userAddress;

    private String userAreaCode;

    private String userImageUrl;

    private int userAuthLevel;
}
