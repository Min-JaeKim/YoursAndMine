package com.ssafy.yam.domain.item.service;

import com.ssafy.yam.domain.image.entity.Image;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.dto.request.ItemCreateRequest;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.utils.S3UploadUtils;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemCRUDService {
    @Autowired
    private S3UploadUtils s3UploadUtils;
    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public void saveItem(List<MultipartFile> itemImages, ItemCreateRequest itemCreateRequest) {
        Item item = modelMapper.map(itemCreateRequest, Item.class);

        // jwt 수정할 부분
        User tmp = new User();
        tmp.setUserId(1);
        item.setSeller(tmp);
        item.setItemAreaCode(11100);
        item.setItemAddress("서울시 관악구 신림동");
        item.setItemCreatedTime(LocalDateTime.now());
        item.setItemModifiedTime(LocalDateTime.now());
        item.setItemIsActive("Y");

//        item.setUser(userService.getUser(itemCreateRequest.getUid()));
        itemRepository.save(item);

        if (itemImages.size() != 0) {
            for (MultipartFile itemImage : itemImages) {
                String imageUrl = null;
                String userSet = itemImage.getOriginalFilename() + "(" + LocalDate.now().toString() + ")";
                try {
                    imageUrl = s3UploadUtils.upload(itemImage, "item", userSet);
                    System.out.println(itemImage.getOriginalFilename() + " : profile image upload s3 success");
                } catch (IOException e) {
                    System.out.println(itemImage.getOriginalFilename() + " : profile image upload s3 fail");
                    e.printStackTrace();
                }
                Image image = new Image();
                image.setImageUrl(imageUrl);
                image.setItem(item);
                imageRepository.save(image);
            }
        }
    }
}
