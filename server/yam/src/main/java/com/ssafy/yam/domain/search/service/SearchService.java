package com.ssafy.yam.domain.search.service;

import com.ssafy.yam.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.yam.domain.image.entity.Image;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.search.dto.response.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

    private final ItemRepository itemRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ImageRepository imageRepository;

    public List<SearchResponse> searchItem(String category, String keyword){
        List<SearchResponse> response = new ArrayList<>();

        List<Item> categoryList = itemRepository.findAllByItemCategory(category);
        List<Item> nameList = itemRepository.findAllByItemNameContains(keyword);
        List<Item> contentList = itemRepository.findAllByItemContentContains(keyword);

        for(Item cItem : categoryList){
            addList(response, cItem);
        }
        for(Item nItem : nameList){
            addList(response, nItem);
        }
        for(Item contItem : contentList){
            addList(response, contItem);
        }
        return response;
    }

    private void addList(List<SearchResponse> response, Item item) {
        int bookmarkCount = bookmarkRepository.countByItemId(item.getItemId());
        Image img = imageRepository.findAllByItem_ItemIdLimit1(item.getItemId());

        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setItemId(item.getItemId());
        searchResponse.setItemName(item.getItemName());
        searchResponse.setItemPrice(item.getItemPrice());
        searchResponse.setItemAddress(item.getItemAddress());
        searchResponse.setItemAreaCode(item.getItemAreaCode());
        searchResponse.setItemModifiedTime(item.getItemModifiedTime());

        if(img == null)
            searchResponse.setItemImage("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg");
        else
            searchResponse.setItemImage(img.getImageUrl());
        searchResponse.setBookmarkCount(bookmarkCount);

        response.add(searchResponse);
    }
}
