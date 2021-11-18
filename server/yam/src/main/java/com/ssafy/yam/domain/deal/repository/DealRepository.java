package com.ssafy.yam.domain.deal.repository;

import com.ssafy.yam.domain.deal.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DealRepository extends JpaRepository<Deal, Integer> {
    Optional<Deal> findByDealId(int dealId);
    List<Deal> findAllByItem_ItemId(int itemId);
    List<Deal> findAllByItem_ItemIdOrderByDealStartDateDesc(int itemId);
    List<Deal> findByBuyer_UserIdOrSeller_UserId(int buyerId, int sellerId);
    List<Deal> findByBuyer_UserIdOrderByDealStartDateDesc(int userId);
    List<Deal> findByBuyer_UserId(int userId);
    List<Deal> findBySeller_UserId(int userId);
    void deleteAllByItem_ItemId(int itemId);

    @Query(value = "select count(*) from deal where item_id = :itemId", nativeQuery = true)
    int countByItemId(@Param("itemId") int itemId);
}
