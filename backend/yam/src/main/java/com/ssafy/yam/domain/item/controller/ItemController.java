package com.ssafy.yam.domain.item.controller;

import com.ssafy.yam.domain.deal.dto.response.DealResponse;
import com.ssafy.yam.domain.deal.dto.response.DealUnavailableResponse;
import com.ssafy.yam.domain.deal.service.DealService;
import com.ssafy.yam.domain.item.dto.response.ItemDetailResponse;
import com.ssafy.yam.domain.item.dto.response.ItemListResponse;
import com.ssafy.yam.domain.item.dto.response.ItemResponse;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    private final DealService dealService;

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDetailResponse> getItemByItemId(@PathVariable int itemId){
        ItemResponse item = itemService.getItemByItemId(itemId);
        List<LocalDate> deal = dealService.getUnavailableDate(itemId);

        ItemDetailResponse itemDetail = new ItemDetailResponse(item, deal);

        return ResponseEntity.status(200).body(itemDetail);
    }

    @GetMapping("/page={pageNum}")
    public ResponseEntity<List<ItemListResponse>> getItemList(@PathVariable int pageNum){
        List<ItemListResponse> itemList = itemService.getItemList();
        return ResponseEntity.status(200).body(itemList);
    }
}
