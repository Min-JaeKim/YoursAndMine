package com.ssafy.yam.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDTO {
    private String roomdId;
    private String writer;
    private String message;
}
