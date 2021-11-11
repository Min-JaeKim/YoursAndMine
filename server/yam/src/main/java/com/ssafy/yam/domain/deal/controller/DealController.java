package com.ssafy.yam.domain.deal.controller;

import com.ssafy.yam.domain.deal.dto.request.DealCreateRequest;
import com.ssafy.yam.domain.deal.dto.request.DealUpdateRequest;
import com.ssafy.yam.domain.deal.service.DealCRUDService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.yam.utils.ConstantsUtils.AUTH_HEADER;
import static com.ssafy.yam.utils.ConstantsUtils.DEAL;

@RestController
@RequestMapping(DEAL)
@RequiredArgsConstructor
public class DealController {

    private final DealCRUDService dealCRUDService;

    @PostMapping()
    public ResponseEntity<?> createDeal(@RequestHeader(AUTH_HEADER) String token, @RequestBody DealCreateRequest dealCreateRequest){
        int res = dealCRUDService.createDeal(dealCreateRequest);
        if(res == 0)
            return new ResponseEntity<>(HttpStatus.OK);
        else if(res == 1)
            return ResponseEntity.status(500).body("대여중이거나 대여 불가능한 상품입니다.");
        else if(res == 2)
            return ResponseEntity.status(500).body("예약 불가능한 날짜입니다.");
        else if(res == 3)
            return ResponseEntity.status(500).body("존재하지 않는 상품입니다.");
        else
            return ResponseEntity.status(500).body("본인의 상품을 대여할 수 없습니다.");
    }

    @DeleteMapping("/{dealId}")
    public ResponseEntity<?> deleteDeal(@RequestHeader(AUTH_HEADER) String token, @PathVariable int dealId){
        try{
            dealCRUDService.deleteDeal(dealId);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping()
    public ResponseEntity<?> returnDeal(@RequestHeader(AUTH_HEADER) String token, @RequestBody DealUpdateRequest dealUpdateRequest){
        dealCRUDService.returnDeal(token, dealUpdateRequest.getDealId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/borrow")
    public ResponseEntity<?> borrowDeal(@RequestHeader(AUTH_HEADER) String token, @RequestBody DealUpdateRequest dealUpdateRequest){
        dealCRUDService.borrowDeal(token, dealUpdateRequest.getDealId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
