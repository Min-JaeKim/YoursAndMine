package com.ssafy.yam.domain.item.controller;

import com.ssafy.yam.domain.item.dto.response.ItemDetailResponse;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDetailResponse> getItemByItemId(@PathVariable int itemId){
        ItemResponse item = itemService.getItemByItemId(itemId);
        ItemDetailResponse itemDetail = new ItemDetailResponse(item);

        return ResponseEntity.status(200).body(itemDetail);
    }

//    @GetMapping()
//    public ResponseEntity<?> getItemList(){
//        List<ItemResponse> items = itemService.findAllBy();
//        for(int i = 0; i < items.size(); i++){
//            System.out.println(items.get(i));
//        }
//        return null;
//    }
}
