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
import static com.ssafy.yam.utils.ConstantsUtils.USER;

@RequiredArgsConstructor
@RequestMapping(value = USER)
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

    @GetMapping("/mypage")
    public ResponseEntity<?> showProfile(@RequestHeader(AUTH_HEADER) String token) {
        return ResponseEntity.ok().body(userService.showProfile(token));
    }

    @PutMapping("/address")
    public ResponseEntity<?> modifyAddress(@RequestHeader(AUTH_HEADER) String token, @RequestBody UserRequestDto.ModifyAddress modifyAddress) {
        return ResponseEntity.ok().body(userService.modifyAddress(token, modifyAddress));
    }

    @GetMapping("/schedule/{userDate}")
    public ResponseEntity<?> getSchedule(@RequestHeader(AUTH_HEADER) String token, @PathVariable String userDate) {
        return ResponseEntity.ok().body(userService.getSchedule(token, userDate));
    }

    @GetMapping("/item/give")
    public ResponseEntity<?> getGiveItem(@RequestHeader(AUTH_HEADER) String token) {
        return ResponseEntity.ok().body(userService.getGiveItem(token));
    }

    @GetMapping("/item/take")
    public ResponseEntity<?> getTakeItem(@RequestHeader(AUTH_HEADER) String token) {
        return ResponseEntity.ok().body(userService.getTakeItem(token));
    }

    @GetMapping("/item/history/{itemId}")
    public ResponseEntity<?> getItemHistory(@RequestHeader(AUTH_HEADER) String token, @PathVariable int itemId) {
        return ResponseEntity.ok().body(userService.getItemHistory(token, itemId));
    }

    @GetMapping("/item/receipt/{dealId}")
    public ResponseEntity<?> getReceipt(@RequestHeader(AUTH_HEADER) String token, @PathVariable int dealId) {
        return ResponseEntity.ok().body(userService.getReceipt(token, dealId));
    }

    @GetMapping("/wishlist")
    public ResponseEntity<?> getWishList(@RequestHeader(AUTH_HEADER) String token) {
        return ResponseEntity.ok().body(userService.getWishList(token));
    }
}
