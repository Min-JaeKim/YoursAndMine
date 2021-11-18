package com.ssafy.yam.domain.image.controller;

import com.ssafy.yam.domain.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.yam.utils.ConstantsUtils.IMAGE;

@RequiredArgsConstructor
@RequestMapping(value = IMAGE)
@RestController
public class ImageController {

    private final ImageService imageService;

    @PostMapping("save")
    public ResponseEntity<?> saveImage(@RequestParam(required = true, value = "image") MultipartFile image) {
        return ResponseEntity.ok().body(imageService.saveImage(image));
    }
}
