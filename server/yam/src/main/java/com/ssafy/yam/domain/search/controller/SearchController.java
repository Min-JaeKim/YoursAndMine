package com.ssafy.yam.domain.search.controller;

import com.ssafy.yam.domain.search.dto.response.SearchResponse;
import com.ssafy.yam.domain.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.yam.utils.ConstantsUtils.SEARCH;

@RestController
@RequestMapping(SEARCH)
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping()
    public ResponseEntity<List<SearchResponse>> searchItem(@RequestParam String category, @RequestParam String keyword, @RequestParam int sort){
//        System.out.println(category + " " + keyword + " " + sort);
        return ResponseEntity.status(200).body(searchService.searchItem(category, keyword, sort));
    }
}
