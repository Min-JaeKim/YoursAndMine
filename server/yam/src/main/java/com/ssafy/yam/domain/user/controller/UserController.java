package com.ssafy.yam.domain.user.controller;

import com.ssafy.yam.domain.user.dto.request.UserRequestDto;
import com.ssafy.yam.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.ssafy.yam.utils.ConstantsUtils.USER;

@RequiredArgsConstructor
@RequestMapping(value = USER)
@RestController
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserService userService;

    @GetMapping("/email/{userEmail}")
    public ResponseEntity<?> emailCheck(@PathVariable String userEmail) {
        return ResponseEntity.ok().body(userService.emailCheck(userEmail));
    }

    @PostMapping("/email")
    public ResponseEntity<?> sendEmail(@RequestBody UserRequestDto.SendEmail sendEmailReqDto) {
        return ResponseEntity.ok().body(userService.sendEmail(sendEmailReqDto.getUserEmail()));
    }

    @PutMapping("/profile")
    public ResponseEntity<?> modifyProfile(@RequestParam(required = false, value = "userImage") MultipartFile userImage, @RequestParam(required = false, value = "userNickname") String userNickname) {
        return ResponseEntity.ok().body(userService.modifyProfile(userImage, userNickname));
    }

    @GetMapping("/mypage")
    public ResponseEntity<?> showProfile() {
        return ResponseEntity.ok().body(userService.showProfile());
    }

    @PutMapping("/address")
    public ResponseEntity<?> modifyAddress(@RequestBody UserRequestDto.ModifyAddress modifyAddress) {
        return ResponseEntity.ok().body(userService.modifyAddress(modifyAddress));
    }

    @GetMapping("/month-schedule/{userDate}")
    public ResponseEntity<?> getMonthlySchedule(@PathVariable String userDate) {
        return ResponseEntity.ok().body(userService.getMonthSchedule(userDate));
    }

    @GetMapping("/day-schedule/{userDate}")
    public ResponseEntity<?> getSchedule(@PathVariable String userDate) {
        return ResponseEntity.ok().body(userService.getDaySchedule(userDate));
    }

    @GetMapping("/item/give")
    public ResponseEntity<?> getGiveItem() {
        return ResponseEntity.ok().body(userService.getGiveItem());
    }

    @GetMapping("/item/take")
    public ResponseEntity<?> getTakeItem() {
        return ResponseEntity.ok().body(userService.getTakeItem());
    }

    @GetMapping("/item/history/{itemId}")
    public ResponseEntity<?> getItemHistory(@PathVariable int itemId) {
        return ResponseEntity.ok().body(userService.getItemHistory(itemId));
    }

    @GetMapping("/item/receipt/{dealId}")
    public ResponseEntity<?> getReceipt(@PathVariable int dealId) {
        return ResponseEntity.ok().body(userService.getReceipt(dealId));
    }

    @GetMapping("/wishlist")
    public ResponseEntity<?> getWishList() {
        return ResponseEntity.ok().body(userService.getWishList());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        return ResponseEntity.ok().body(userService.getMe());
    }

    @PostMapping("/chat-info")
    public ResponseEntity<?> getChatInfo(@RequestBody List<UserRequestDto.ChatInfoReqDto> requestList) {
        return ResponseEntity.ok().body(userService.getChatInfo(requestList));
    }
}
