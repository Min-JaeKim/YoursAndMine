package com.ssafy.yam.domain.item.controller;

import com.ssafy.yam.domain.deal.dto.response.DealResponse;
import com.ssafy.yam.domain.deal.dto.response.DealUnavailableResponse;
import com.ssafy.yam.domain.deal.service.DealService;
import com.ssafy.yam.domain.item.dto.request.ItemCreateRequest;
import com.ssafy.yam.domain.item.dto.response.ItemDetailResponse;
import com.ssafy.yam.domain.item.dto.response.ItemListResponse;
import com.ssafy.yam.domain.item.dto.response.ItemResponse;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.item.service.ItemCRUDService;
import com.ssafy.yam.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    private final ItemCRUDService itemCRUDService;

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDetailResponse> getItemByItemId(@PathVariable int itemId){
        ItemResponse item = itemService.getItemByItemId(itemId);
        List<LocalDate> deal = dealService.getUnavailableDate(itemId);

        ItemDetailResponse itemDetail = new ItemDetailResponse(item, deal);

        return ResponseEntity.status(200).body(itemDetail);
    }

    @GetMapping()
    public ResponseEntity<List<ItemListResponse>> getItemList(Pageable pageable){
        List<ItemListResponse> itemList = itemService.getItemList(pageable);
        return ResponseEntity.status(200).body(itemList);
    }

    @PostMapping()
    public ResponseEntity<?> createItem(@RequestPart(value = "itemImage", required = false) List<MultipartFile> itemImages,
                                        @RequestPart(value = "itemData") ItemCreateRequest itemCreateRequest){
        itemCRUDService.saveItem(itemImages, itemCreateRequest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
