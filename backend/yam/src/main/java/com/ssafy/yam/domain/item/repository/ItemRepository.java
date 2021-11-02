package com.ssafy.yam.domain.item.repository;

import com.ssafy.yam.domain.item.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findItemByItemId(int itemId);
    List<Item> findAllBy();
}
