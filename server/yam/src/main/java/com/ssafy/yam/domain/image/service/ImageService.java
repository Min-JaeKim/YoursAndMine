package com.ssafy.yam.domain.image.service;

import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.S3UploadUtils;
import com.ssafy.yam.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ImageService {

    private final UserRepository userRepository;
    private final S3UploadUtils s3UploadUtils;

    public String saveImage(MultipartFile image) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        String imageUrl = null;

        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        try {
            imageUrl = s3UploadUtils.upload(image, "chat", "");
        } catch (IOException e) {
            e.printStackTrace();
        }

        return imageUrl;
    }
}
