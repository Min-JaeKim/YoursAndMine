package com.ssafy.yam.domain.search.service;

import com.ssafy.yam.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.yam.domain.deal.repository.DealRepository;
import com.ssafy.yam.domain.image.entity.Image;
import com.ssafy.yam.domain.image.repository.ImageRepository;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.repository.ItemRepository;
import com.ssafy.yam.domain.search.dto.response.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

    private final ItemRepository itemRepository;
    private final BookmarkRepository bookmarkRepository;
    private final ImageRepository imageRepository;
    private final DealRepository dealRepository;

    public List<SearchResponse> searchItem(String category, String keyword, int sort){
        // sort : 1 = 최신순, 2 : 북마크순, 3 : 대여순
        List<SearchResponse> response = new ArrayList<>();

        if(category.equals("undefined") || category.equals("")){
//            System.out.println("카테고리 없음");
            List<Item> nameList = itemRepository.findAllByItemNameContains(keyword);
            List<Item> contentList = itemRepository.findAllByItemContentContains(keyword);

            for(Item nItem : nameList){
                if(checkContain(response, nItem))
                    addList(response, nItem);
            }
            for(Item contItem : contentList){
                if(checkContain(response, contItem))
                    addList(response, contItem);
            }

            if(sort == 1) {
                Collections.sort(response, new Comparator<SearchResponse>() {
                    @Override
                    public int compare(SearchResponse o1, SearchResponse o2) {
                        return -(o1.getItemModifiedTime().compareTo(o2.getItemModifiedTime()));
                    }
                });
            }else if(sort == 2){
                Collections.sort(response, new Comparator<SearchResponse>() {
                    @Override
                    public int compare(SearchResponse o1, SearchResponse o2) {
                        return -(o1.getBookmarkCount() - o2.getBookmarkCount());
                    }
                });
            }else{
                Collections.sort(response, new Comparator<SearchResponse>() {
                    @Override
                    public int compare(SearchResponse o1, SearchResponse o2) {
                        return -(o1.getDealCount() - o2.getDealCount());
                    }
                });
            }
        }else{
//            System.out.println("카테고리 있음" + category);
            List<Item> nameList = itemRepository.findAllByItemCategoryAndItemNameContains(category, keyword);
            List<Item> contentList = itemRepository.findAllByItemCategoryAndItemContentContains(category, keyword);

//            System.out.println("이름 리스트");
            for(Item nItem : nameList){
//                System.out.println(nItem.toString());
                if(checkContain(response, nItem))
                    addList(response, nItem);
            }
//            System.out.println("내용 리스트");
            for(Item cItem : contentList){
//                System.out.println(cItem.toString());
                if(checkContain(response, cItem))
                    addList(response, cItem);
            }
            if(sort == 1) {
                Collections.sort(response, new Comparator<SearchResponse>() {
                    @Override
                    public int compare(SearchResponse o1, SearchResponse o2) {
                        return o1.getItemModifiedTime().compareTo(o2.getItemModifiedTime());
                    }
                });
            }else if(sort == 2){
                Collections.sort(response, new Comparator<SearchResponse>() {
                    @Override
                    public int compare(SearchResponse o1, SearchResponse o2) {
                        return -(o1.getBookmarkCount() - o2.getBookmarkCount());
                    }
                });
            }else{
                Collections.sort(response, new Comparator<SearchResponse>() {
                    @Override
                    public int compare(SearchResponse o1, SearchResponse o2) {
                        return -(o1.getDealCount() - o2.getDealCount());
                    }
                });
            }
        }

        return response;
    }

    private boolean checkContain(List<SearchResponse> response, Item cItem) {
        for(SearchResponse r : response){
            if(r.getItemId() == cItem.getItemId()){
                return false;
            }
        }

        return true;
    }

    private void addList(List<SearchResponse> response, Item item) {
        int bookmarkCount = bookmarkRepository.countByItemId(item.getItemId());
        Image img = imageRepository.findAllByItem_ItemIdLimit1(item.getItemId());
        int dealCount = dealRepository.countByItemId(item.getItemId());

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
        searchResponse.setDealCount(dealCount);

        response.add(searchResponse);
    }
}
