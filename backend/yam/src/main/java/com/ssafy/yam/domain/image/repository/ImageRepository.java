package com.ssafy.yam.domain.image.repository;


import com.ssafy.yam.domain.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByItem_ItemId(int itemId);
}
