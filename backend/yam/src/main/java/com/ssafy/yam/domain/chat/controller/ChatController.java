package com.ssafy.yam.domain.chat.controller;

import com.ssafy.yam.domain.chat.dto.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate template;

    @MessageMapping("/chat/enter")
    public void enter(ChatMessageDTO messageDTO){
        messageDTO.setMessage(messageDTO.getWriter() + "님이 채팅방에 입장하였습니다.");
        template.convertAndSend("/topic/chat/room/" + messageDTO.getRoomdId(), messageDTO);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO messageDTO) {
        template.convertAndSend("/topic/chat/room/" + messageDTO.getRoomdId(), messageDTO);
    }
}
