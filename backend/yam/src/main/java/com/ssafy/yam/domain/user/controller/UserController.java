package com.ssafy.yam.domain.user.controller;

import com.ssafy.yam.domain.user.dto.request.UserRequestDto;
import com.ssafy.yam.domain.user.service.UserService;
import com.ssafy.yam.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping(value = "/user")
@RestController
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserService userService;
    private final ResponseUtils response;

    @PostMapping()
    public ResponseEntity<?> signUp(@Validated @RequestBody UserRequestDto.SignUp signUp) {
        return userService.signUp(signUp);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@Validated @RequestBody UserRequestDto.Login login) {
//        return userService.login(login);
//    }
}
