package com.ssafy.yam.domain.user.controller;

import com.ssafy.yam.domain.user.dto.request.UserRequestDto;
import com.ssafy.yam.domain.user.service.UserService;
import com.ssafy.yam.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.yam.utils.ConstantsUtils.AUTH_HEADER;

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

    @GetMapping("/email/{userEmail}")
    public ResponseEntity<?> emailCheck(@PathVariable String userEmail) {
        return ResponseEntity.ok().body(userService.emailCheck(userEmail));
    }

    @PostMapping("/email")
    public ResponseEntity<?> sendEmail(@RequestBody UserRequestDto.SendEmail sendEmailReqDto) {
        return ResponseEntity.ok().body(userService.sendEmail(sendEmailReqDto.getUserEmail()));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> modifyProfile(@RequestHeader(AUTH_HEADER) String token, @RequestParam(required = false, value = "userImage") MultipartFile userImage, @RequestParam(required = false, value = "userNickname") String userNickname) {
        return ResponseEntity.ok().body(userService.modifyProfile(token, userImage, userNickname));
    }
}
