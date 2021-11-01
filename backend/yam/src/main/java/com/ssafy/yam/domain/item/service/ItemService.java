package com.ssafy.yam.domain.item.service;

import com.ssafy.yam.domain.item.dto.response.ItemResponse;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;

import com.ssafy.yam.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemResponse getItemByItemId(int itemId){
        Item item = itemRepository.findItemByItemId(itemId);
//        User user = userRepository.findUserByUserId(item.getSellerId().getUserId());
        System.out.println(item.getSellerId().toString());
        System.out.println(item.getSellerId().getClass());
        User owner = item.getSellerId();
        ItemResponse response = ItemResponse.builder()
                .itemId(itemId)
                .itemCategory(item.getItemCategory())
                .itemName(item.getItemName())
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

//        ItemResponse newResponse = new ItemResponse(item);

        return response;
    }

//    public List<ItemResponse> findAllBy(){
//        return itemRepository.findAllBy();
//    }
}
