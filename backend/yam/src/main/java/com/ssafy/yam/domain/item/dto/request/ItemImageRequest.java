package com.ssafy.yam.domain.item.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemImageRequest {
    private int itemId;
    private List<MultipartFile> itemImage;
}
