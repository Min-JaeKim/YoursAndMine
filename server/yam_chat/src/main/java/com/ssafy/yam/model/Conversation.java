package com.ssafy.yam.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Conversation {
    String partnerPk;
    String itemPk;
    List<MessageModel> messageList;
}
