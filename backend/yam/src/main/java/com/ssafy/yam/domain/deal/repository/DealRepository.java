package com.ssafy.yam.domain.deal.repository;

import com.ssafy.yam.domain.deal.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Long> {
    List<Deal> findAllByItem_ItemId(int itemId);
    List<Deal> findByBuyer_UserIdOrSeller_UserId(int buyerId, int sellerId);
}
