package com.ssafy.yam.domain.bookmark.repository;

import com.ssafy.yam.domain.bookmark.entity.Bookmark;
import com.ssafy.yam.domain.bookmark.entity.BookmarkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, BookmarkId> {

    @Query(value = "select count(*) from bookmark where item_id = :itemId", nativeQuery = true)
    int countByItemId(@Param("itemId") int itemId);

    List<Bookmark> findAllByBookmarkId_UserId(int userId);
    Bookmark findBookmarkByBookmarkId_UserIdAndBookmarkId_ItemId(int userId, int itemId);
}
