package com.ssafy.yam.domain.item.repository;

import com.ssafy.yam.domain.item.entity.Item;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Item findItemByItemId(int itemId);
    List<Item> findAllBy(Pageable pageable);
    List<Item> findAllBySeller_UserIdOrderByItemModifiedTimeDesc(int userId);
    List<Item> findAllByItemAreaCode(int itemAreaCode);
    List<Item> findAllByItemCategoryAndItemName(String category, String name);
    List<Item> findAllByItemCategoryAndItemContent(String category, String content);
    List<Item> findAllByItemNameContains(String name);
    List<Item> findAllByItemContentContains(String content);
    List<Item> findAllByItemCategoryAndItemNameContains(String category, String name);
    List<Item> findAllByItemCategoryAndItemContentContains(String category, String content);
}
