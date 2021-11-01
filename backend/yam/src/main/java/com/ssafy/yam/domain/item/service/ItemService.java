package com.ssafy.yam.domain.item.service;

import com.ssafy.yam.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.yam.domain.image.entity.Image;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.dto.response.ItemResponse;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;

import com.ssafy.yam.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {

    private final ItemRepository itemRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ImageRepository imageRepository;

    public ItemResponse getItemByItemId(int itemId){
        Item item = itemRepository.findItemByItemId(itemId);
        User owner = item.getSeller();
        ItemResponse response = ItemResponse.builder()
                .itemId(itemId)
                .itemCategory(item.getItemCategory())
                .itemName(item.getItemName())
                .itemContent(item.getItemContent())
                .itemPrice(item.getItemPrice())
                .itemAddress(item.getItemAddress())
                .itemAreaCode(item.getItemAreaCode())
                .itemModifiedTime(item.getItemModifiedTime())
                .build();

        response.setOwner(
                ItemResponse.Owner.builder()
                        .ownerId(owner.getUserId())
                        .ownerNickName(owner.getUserNickname())
                        .ownerAddress(owner.getUserAddress())
                        .ownerImageUrl(owner.getUserImageUrl())
                        .build()
        );

        int bookmarkCnt = bookmarkRepository.countByItemId(itemId);
        if(bookmarkCnt == 0)
            response.setBookmark("N");
        else
            response.setBookmark("Y");
        response.setBookmarkCount(bookmarkCnt);

        List<Image> images = imageRepository.findAllByItem_ItemId(itemId);

        response.setItemImage(images.stream()
                .map(Image::getImageUrl)
                .collect(Collectors.toList()));
        return response;
    }

//    public List<ItemResponse> findAllBy(){
//        return itemRepository.findAllBy();
//    }
}
