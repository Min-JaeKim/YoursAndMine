package com.ssafy.yam.domain.item.controller;

import com.ssafy.yam.domain.bookmark.dto.request.BookmarkRequest;
import com.ssafy.yam.domain.bookmark.service.BookmarkService;
import com.ssafy.yam.domain.item.dto.request.ItemCreateRequest;
import com.ssafy.yam.domain.item.dto.request.ItemUpdateRequest;
import com.ssafy.yam.domain.item.dto.response.ItemDetailResponse;
import com.ssafy.yam.domain.item.dto.response.ItemListResponse;
import com.ssafy.yam.domain.item.dto.response.ItemImageResponse;
import com.ssafy.yam.domain.item.service.ItemCRUDService;
import com.ssafy.yam.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.ssafy.yam.utils.ConstantsUtils.ITEM;

@RestController
@RequestMapping(ITEM)
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
    public ResponseEntity<List<ItemListResponse>> getItemList(Pageable pageable){
        return ResponseEntity.status(200).body(itemService.getItemList(pageable));
    }

    @PostMapping()
    public ResponseEntity<?> createItem(@RequestPart(value = "itemImage", required = false) List<MultipartFile> itemImage,
                                        @RequestPart(value = "itemData") ItemCreateRequest itemCreateRequest){
        try{
            itemCRUDService.saveItem(itemImage, itemCreateRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable int itemId){
        try{
            itemCRUDService.deleteItem(itemId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping()
    public ResponseEntity<ItemDetailResponse> updateItem(@RequestBody ItemUpdateRequest itemUpdateRequest){
        return ResponseEntity.status(200).body(itemCRUDService.updateItem(itemUpdateRequest));
    }

    @PostMapping("/image")
    public ResponseEntity<ItemImageResponse> addItemImage(@RequestPart(value = "itemId") int itemId,
                                                          @RequestPart(value = "itemImage", required = false) List<MultipartFile> itemImage){
        return ResponseEntity.status(200).body(itemCRUDService.addItemImage(itemId, itemImage));
    }

    @DeleteMapping("/image")
    public ResponseEntity<ItemImageResponse> deleteItemImage(@RequestPart(value = "itemId") int itemId,
                                                             @RequestPart(value = "itemImage", required = false) List<String> itemImage){
        return ResponseEntity.status(200).body(itemCRUDService.deleteItemImage(itemId, itemImage));
    }

    @PostMapping("/bookmark")
    public ResponseEntity<?> addBookmark(BookmarkRequest bookmarkRequest){
        System.out.println("북마크 컨트롤러 post!!!!!!!!!!!");
        bookmarkService.addBookmark(bookmarkRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/bookmark/{itemId}")
    public ResponseEntity<?> deleteBookmark(@PathVariable int itemId){
        System.out.println("북마크 컨트롤러 delete!!!!!!!!!!!");
        bookmarkService.deleteBookmark(itemId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
