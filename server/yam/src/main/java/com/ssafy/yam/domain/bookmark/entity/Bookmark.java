package com.ssafy.yam.domain.bookmark.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bookmark {
   @EmbeddedId
    private BookmarkId bookmarkId;
}
