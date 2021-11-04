package com.ssafy.yam.domain.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {

    private String roomdId;
    private String writer;
    private String message;
}
