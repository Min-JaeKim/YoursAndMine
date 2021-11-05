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
    private String author;
    private String to;
    private Date timestamp;
}
