package com.ssafy.yam.domain.item.service;

import com.ssafy.yam.domain.image.entity.Image;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.dto.request.ItemCreateRequest;
import com.ssafy.yam.domain.item.dto.request.ItemUpdateRequest;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.S3UploadUtils;
import com.ssafy.yam.utils.TokenUtils;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ItemCRUDService {
    @Autowired
    private S3UploadUtils s3UploadUtils;
    private final ItemRepository itemRepository;
    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper = new ModelMapper();
    private final UserRepository userRepository;

    public void saveItem(List<MultipartFile> itemImages, ItemCreateRequest itemCreateRequest, String token) {
        Item item = modelMapper.map(itemCreateRequest, Item.class);
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
        User user = userRepository.findByUserEmail(tokenEmail).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        item.setSeller(user);
        item.setItemAreaCode(user.getUserAreaCode());
        item.setItemAddress(user.getUserAddress());
        item.setItemCreatedTime(LocalDateTime.now());
        item.setItemModifiedTime(LocalDateTime.now());
        item.setItemIsActive("Y");

//        item.setUser(userService.getUser(itemCreateRequest.getUid()));
        itemRepository.save(item);

        //if (itemImages.size() != 0) {
            for (MultipartFile itemImage : itemImages) {
                if(!itemImage.isEmpty()) {
                    String imageUrl = null;
                    String userSet = itemImage.getOriginalFilename() + "(" + LocalDate.now().toString() + ")";
                    try {
                        imageUrl = s3UploadUtils.upload(itemImage, "item", userSet);
//                    System.out.println(itemImage.getOriginalFilename() + " : profile image upload s3 success");
                    } catch (IOException e) {
//                    System.out.println(itemImage.getOriginalFilename() + " : profile image upload s3 fail");
                        e.printStackTrace();
                    }
                    Image image = new Image();
                    image.setImageUrl(imageUrl);
                    image.setItem(item);
                    imageRepository.save(image);
                }
            }
        //}
    }

    private Item getItem(int itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 제품이 존재하지 않습니다."));
    }

    public void deleteItem(int itemId){
//        Item item = getItem(itemId);
//        if (!item.getItem.getUid().equals(uid)) {
//            throw new IllegalArgumentException("물품을 삭제할 권한이 없습니다.");
//        }
        itemRepository.deleteById(itemId);
    }

    public void updateItem(ItemUpdateRequest itemUpdateRequest){
        Item item = modelMapper.map(itemUpdateRequest, Item.class);
//        item.updateItem(itemUpdateRequest);

        Optional<Item> updateItem = itemRepository.findById(item.getItemId());
        updateItem.ifPresent(selectItem ->{
            selectItem.setItemName(item.getItemName());
            selectItem.setItemContent(item.getItemContent());
            selectItem.setItemCategory(item.getItemCategory());
            selectItem.setItemPrice(item.getItemPrice());
            selectItem.setItemModifiedTime(LocalDateTime.now());
            itemRepository.save(selectItem);
        });
    }
}
