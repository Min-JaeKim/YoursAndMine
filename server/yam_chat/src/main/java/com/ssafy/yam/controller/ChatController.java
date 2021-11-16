package com.ssafy.yam.controller;

import com.ssafy.yam.model.ChatInfoDto;
import com.ssafy.yam.model.Conversation;
import com.ssafy.yam.model.MessageModel;
import com.ssafy.yam.model.UserInfoRequest;
import com.ssafy.yam.service.ChatService;
//import jdk.nashorn.internal.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Controller
@RequestMapping("/chat-api")
public class ChatController {

    @Autowired
    private RestTemplate restTemplate;


    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private RedisTemplate<String, Conversation> conversationTemplate;

    @MessageMapping("/send")
    public void SendToMessage(MessageModel msg){
        logger.info("{}", msg);
        HashOperations<String, String, Conversation> ho = conversationTemplate.opsForHash();
        if(ho.hasKey(msg.getAuthor(), msg.getTo())){ // 상대방과 대화 데이터가 있을때
            Conversation con = ho.get(msg.getAuthor(), msg.getTo());
            con.getMessageList().add(msg);
            ho.put(msg.getAuthor(),msg.getTo(),con);
        } else { // 상대방 데이터가 없을때
            Conversation newCon = new Conversation(msg.getTo(), msg.getItemPk(), new ArrayList<>());
            newCon.getMessageList().add(msg);
            ho.put(msg.getAuthor(),msg.getTo(),newCon);
        }
        if(ho.hasKey(msg.getTo(), msg.getAuthor())){ // 상대방에게 대화 데이터가 있을때
            Conversation con = ho.get(msg.getTo(), msg.getAuthor());
            con.getMessageList().add(msg);
            ho.put(msg.getTo(), msg.getAuthor(),con);
        } else { // 상대방에게 대화 데이터가 없을때
            Conversation newCon = new Conversation(msg.getAuthor(), msg.getItemPk(), new ArrayList<>());
            newCon.getMessageList().add(msg);
            ho.put(msg.getTo(), msg.getAuthor(),newCon);
        }
        simpMessagingTemplate.convertAndSend("/topic/"+msg.getTo() , msg);
    }

    @PostMapping("/fetchAllChats")
    public ResponseEntity<?> fetchAll(@RequestBody UserInfoRequest userInfoRequest){
        logger.info("user info : " + userInfoRequest.getToken());
        String userPk = userInfoRequest.getUserPk();
        String token = userInfoRequest.getToken();

        HashOperations<String, String, Conversation> hashOperations = conversationTemplate.opsForHash();
        Map<String, Conversation> mapper = hashOperations.entries(userPk);
        Collection<Conversation> res = mapper.values();
        Map<String, Object> chatInfo = chatService.getChatInfo(res, token);

        return new ResponseEntity<>(chatInfo, HttpStatus.OK);
    }
}
