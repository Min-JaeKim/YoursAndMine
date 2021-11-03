package com.ssafy.yam.domain.item.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class ItemCreateRequest {
    private String itemName;
    private String itemContent;
    private String itemCategory;
    private int itemPrice;
//    private MultipartFile itemImages;

    @Override
    public String toString() {
        return "ItemCreateRequest{" +
                "itemName='" + itemName + '\'' +
                ", itemContent='" + itemContent + '\'' +
                ", itemCategory='" + itemCategory + '\'' +
                ", itemPrice=" + itemPrice +

                '}';
    }
}
