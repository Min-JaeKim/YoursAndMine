package com.ssafy.yam.domain.item.repository;

import com.ssafy.yam.domain.item.entity.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findItemByItemId(int itemId);
    List<Item> findAllBy(Pageable pageable);
    List<Item> findAllBySeller_UserIdOrderByItemModifiedTime(int userId);
    List<Item> findAllByItemAreaCode(@Param("areaCode") String areaCode, Pageable pageable);
    List<Item> findAllByItemCategory(String category);
    List<Item> findAllByItemNameContains(String name);
    List<Item> findAllByItemContentContains(String content);
}
