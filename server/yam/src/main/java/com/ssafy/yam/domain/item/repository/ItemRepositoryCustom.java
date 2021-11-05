package com.ssafy.yam.domain.item.repository;

import com.ssafy.yam.domain.item.dto.response.ItemResponse;

import java.util.List;

public interface ItemRepositoryCustom {
    List<ItemResponse> findAllItemResponseList();
}
