package com.ssafy.yam.domain.bookmark.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookmarkId implements Serializable {
    @Column(name = "userId")
    private int userId;

    @Column(name = "itemId")
    private int itemId;
}
