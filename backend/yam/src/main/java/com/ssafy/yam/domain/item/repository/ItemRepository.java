package com.ssafy.yam.domain.item.repository;

import com.ssafy.yam.domain.item.dto.response.ItemResponse;
import com.ssafy.yam.domain.item.entity.Item;
import com.ssafy.yam.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findItemByItemId(int itemId);

//    List<ItemResponse> findAllBy();
}
