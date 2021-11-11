package com.ssafy.yam.domain.item.controller;

import com.ssafy.yam.domain.bookmark.service.BookmarkService;
import com.ssafy.yam.domain.deal.service.DealService;
import com.ssafy.yam.domain.item.dto.request.ItemCreateRequest;
import com.ssafy.yam.domain.item.dto.request.ItemUpdateRequest;
import com.ssafy.yam.domain.item.dto.response.ItemDetailResponse;
import com.ssafy.yam.domain.item.dto.response.ItemImageResponse;
import com.ssafy.yam.domain.item.dto.response.ItemListResponse;
import com.ssafy.yam.domain.item.dto.response.ItemResponse;
import com.ssafy.yam.domain.item.service.ItemCRUDService;
import com.ssafy.yam.domain.item.service.ItemService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.yam.utils.ConstantsUtils.AUTH_HEADER;

@RestController
@RequestMapping("/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;
    private final BookmarkService bookmarkService;
    private final ItemCRUDService itemCRUDService;

    @GetMapping("/{itemId}")
    public ResponseEntity<ItemDetailResponse> getItemByItemId(@PathVariable int itemId){
        return ResponseEntity.status(200).body(itemService.getItemByItemId(itemId));
    }

    @GetMapping()
    public ResponseEntity<List<ItemListResponse>> getItemList(@RequestHeader(AUTH_HEADER) String token, Pageable pageable){
        return ResponseEntity.status(200).body(itemService.getItemList(token, pageable));
    }

    @PostMapping()
    public ResponseEntity<?> createItem(@RequestPart(value = "itemImage", required = false) List<MultipartFile> itemImage,
                                        @RequestPart(value = "itemData") ItemCreateRequest itemCreateRequest, @RequestHeader(AUTH_HEADER) String token){
        try{
            itemCRUDService.saveItem(itemImage, itemCreateRequest, token);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@RequestHeader(AUTH_HEADER) String token, @PathVariable int itemId){
        try{
            itemCRUDService.deleteItem(token, itemId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping()
    public ResponseEntity<ItemDetailResponse> updateItem(@RequestHeader(AUTH_HEADER) String token, @RequestBody ItemUpdateRequest itemUpdateRequest){
        return ResponseEntity.status(200).body(itemCRUDService.updateItem(token, itemUpdateRequest));
    }

    @PostMapping("/image")
    public ResponseEntity<ItemImageResponse> addItemImage(@RequestHeader(AUTH_HEADER) String token,
                                                          @RequestPart(value = "itemId") int itemId,
                                                          @RequestPart(value = "itemImage", required = false) List<MultipartFile> itemImage){
        return ResponseEntity.status(200).body(itemCRUDService.addItemImage(token, itemId, itemImage));
    }

    @DeleteMapping("/image")
    public ResponseEntity<ItemImageResponse> deleteItemImage(@RequestHeader(AUTH_HEADER) String token,
                                                          @RequestPart(value = "itemId") int itemId,
                                                          @RequestPart(value = "itemImage", required = false) List<String> itemImage){
        return ResponseEntity.status(200).body(itemCRUDService.deleteItemImage(token, itemId, itemImage));
    }

    @PostMapping("/bookmark/{itemId}")
    public ResponseEntity<?> addBookmark(@RequestHeader(AUTH_HEADER) String token, @PathVariable int itemId){
        bookmarkService.addBookmark(token, itemId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/bookmark/{itemId}")
    public ResponseEntity<?> deleteBookmark(@RequestHeader(AUTH_HEADER) String token, @PathVariable int itemId){
        bookmarkService.deleteBookmark(token, itemId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
