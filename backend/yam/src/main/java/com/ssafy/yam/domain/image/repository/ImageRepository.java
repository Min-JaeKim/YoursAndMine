package com.ssafy.yam.domain.image.repository;


import com.ssafy.yam.domain.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByItem_ItemId(int itemId);

    @Query(value = "SELECT image_url FROM image WHERE item_id = :itemId", nativeQuery = true)
    List<String> findAllImageUrlByItem_ItemId(@Param("itemId") int itemId);

    @Query(value = "select * from image where item_id = :itemId limit 1", nativeQuery = true)
    Image findAllByItem_ItemIdLimit1(@Param("itemId") int itemId);

}
