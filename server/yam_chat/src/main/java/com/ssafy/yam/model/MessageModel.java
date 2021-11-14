package com.ssafy.yam.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageModel {
    private String type;
    private String message;
    private String author;  //보내는사람 pk
    private String to;      //받는사람 pk
    private String itemPk;  //아이템 pk
    private Date timestamp;
}
