package com.ssafy.yam.domain.item.service;

import com.ssafy.yam.domain.deal.service.DealService;
import com.ssafy.yam.domain.image.entity.Image;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.dto.request.ItemCreateRequest;
import com.ssafy.yam.domain.item.dto.request.ItemUpdateRequest;
import com.ssafy.yam.domain.item.dto.response.ItemDetailResponse;
import com.ssafy.yam.domain.item.dto.response.ItemImageResponse;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.S3UploadUtils;
import com.ssafy.yam.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
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
    private final UserRepository userRepository;
    private final DealService dealService;
    private final ItemService itemService;

    public void saveItem(List<MultipartFile> itemImages, ItemCreateRequest itemCreateRequest) {
        Item item = modelMapper.map(itemCreateRequest, Item.class);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        item.setSeller(user);
        item.setItemAreaCode(user.getUserAreaCode());
        item.setItemAddress(user.getUserAddress());
        item.setItemCreatedTime(LocalDateTime.now());
        item.setItemModifiedTime(LocalDateTime.now());
        item.setItemIsActive("Y");

        itemRepository.save(item);

        uploadImage(itemImages, item);
    }

    private Item getItem(int itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 제품이 존재하지 않습니다."));
    }

    public void deleteItem(int itemId){
        Item item = getItem(itemId);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        if (!item.getSeller().getUserEmail().equals(tokenEmail)) {
            throw new IllegalArgumentException("물품을 삭제할 권한이 없습니다.");
        }
        itemRepository.deleteById(itemId);
    }

    public ItemDetailResponse updateItem(ItemUpdateRequest itemUpdateRequest){
        Item item = getItem(itemUpdateRequest.getItemId());
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        if (!item.getSeller().getUserEmail().equals(tokenEmail)) {
            throw new IllegalArgumentException("물품을 수정할 권한이 없습니다.");
        }

        item.setItemName(itemUpdateRequest.getItemName());
        item.setItemContent(itemUpdateRequest.getItemContent());
        item.setItemCategory(itemUpdateRequest.getItemCategory());
        item.setItemPrice(itemUpdateRequest.getItemPrice());
        item.setItemModifiedTime(LocalDateTime.now());
        itemRepository.save(item);

        return itemService.getItemByItemId(item.getItemId());
    }

    public ItemImageResponse addItemImage(int itemId, List<MultipartFile> itemImages){
        Item item = getItem(itemId);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        if (!item.getSeller().getUserEmail().equals(tokenEmail)) {
            throw new IllegalArgumentException("물품을 수정할 권한이 없습니다.");
        }

        uploadImage(itemImages, item);

        List<String> itemImageList = imageRepository.findAllImageUrlByItem_ItemId(item.getItemId());
        ItemImageResponse response = new ItemImageResponse(item.getItemId(), itemImageList);

        return response;
    }

    public ItemImageResponse deleteItemImage(int itemId, List<String> itemImages) {
        Item item = getItem(itemId);
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        if (!item.getSeller().getUserEmail().equals(tokenEmail)) {
            throw new IllegalArgumentException("물품을 수정할 권한이 없습니다.");
        }

        for (String itemImage : itemImages) {
            if (!itemImage.isEmpty()) {
                imageRepository.deleteByImageUrl(itemImage);
            }
        }

        List<String> itemImageList = imageRepository.findAllImageUrlByItem_ItemId(item.getItemId());
        ItemImageResponse response = new ItemImageResponse(item.getItemId(), itemImageList);

        return response;
    }

    private void uploadImage(List<MultipartFile> itemImages, Item item) {
        for (MultipartFile itemImage : itemImages) {
            if(!itemImage.isEmpty()) {
                String imageUrl = null;
                String userSet = itemImage.getOriginalFilename() + "(" + LocalDate.now().toString() + ")";
                try {
                    imageUrl = s3UploadUtils.upload(itemImage, "item", userSet);
                } catch (IOException e) {
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
