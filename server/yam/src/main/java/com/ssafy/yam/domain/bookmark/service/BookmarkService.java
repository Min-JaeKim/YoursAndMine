package com.ssafy.yam.domain.bookmark.service;

import com.ssafy.yam.domain.bookmark.dto.request.BookmarkRequest;
import com.ssafy.yam.domain.bookmark.entity.Bookmark;
import com.ssafy.yam.domain.bookmark.entity.BookmarkId;
import com.ssafy.yam.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final UserRepository userRepository;

    public void addBookmark(int itemId) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        System.out.println("북마크 서비스 : " + tokenEmail);
        User user = userRepository.findByUserEmail(tokenEmail).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        int userId = user.getUserId();
        System.out.println("북마크 서비스 : " + userId);

        //int itemId = bookmarkRequest.getItemId();
        BookmarkId bookmarkId = new BookmarkId(userId, itemId);
        Bookmark bookmark = new Bookmark(bookmarkId);
        bookmarkRepository.save(bookmark);
    }

    public void deleteBookmark(int itemId) {
        String tokenEmail = SecurityUtils.getCurrentUsername().get();
        User user = userRepository.findByUserEmail(tokenEmail).orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
        int userId = user.getUserId();

        Bookmark bookmark = bookmarkRepository.findBookmarkByBookmarkId_UserIdAndBookmarkId_ItemId(userId, itemId);
        bookmarkRepository.deleteById(bookmark.getBookmarkId());
    }
}
