package com.ssafy.yam.domain.item.entity;

import com.ssafy.yam.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    private String itemName;

    private String itemContent;
    private int itemPrice;
    private String itemCategory;
    private String itemAddress;
    private int itemAreaCode;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime itemCreatedTime;

    @LastModifiedDate
    private LocalDateTime itemModifiedTime;
    private String itemIsActive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sellerId")
    private User seller;

    @Override
    public String toString() {
        return "Item{" +
                "itemId=" + itemId +
                ", itemName='" + itemName + '\'' +
                ", itemContent='" + itemContent + '\'' +
                ", itemPrice=" + itemPrice +
                ", itemCategory='" + itemCategory + '\'' +
                ", itemAddress='" + itemAddress + '\'' +
                ", itemAreaCode=" + itemAreaCode +
                ", itemCreatedTime=" + itemCreatedTime +
                ", itemModifiedTime=" + itemModifiedTime +
                ", itemIsActive='" + itemIsActive + '\'' +
                ", seller=" + seller +
                '}';
    }
}
