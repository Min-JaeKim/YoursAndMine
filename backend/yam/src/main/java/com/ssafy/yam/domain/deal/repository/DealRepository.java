package com.ssafy.yam.domain.deal.repository;

import com.ssafy.yam.domain.deal.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DealRepository extends JpaRepository<Deal, Long> {
    Optional<Deal> findByDealId(int dealId);
    List<Deal> findAllByItem_ItemId(int itemId);
    List<Deal> findByBuyer_UserIdOrSeller_UserId(int buyerId, int sellerId);
    List<Deal> findByBuyer_UserIdOrderByDealStartDate(int userId);
}
