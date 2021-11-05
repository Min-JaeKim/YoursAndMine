package com.ssafy.yam.domain.item.dto.response;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemImageResponse {
    private int itemId;
    private List<String> itemImage;
}
