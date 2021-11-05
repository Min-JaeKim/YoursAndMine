package com.ssafy.yam.controller;

import com.ssafy.yam.model.Conversation;
import com.ssafy.yam.model.MessageModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Controller
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

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
            Conversation newCon = new Conversation(msg.getTo(), new ArrayList<>());
            newCon.getMessageList().add(msg);
            ho.put(msg.getAuthor(),msg.getTo(),newCon);
        }
        if(ho.hasKey(msg.getTo(), msg.getAuthor())){ // 상대방에게 대화 데이터가 있을때
            Conversation con = ho.get(msg.getTo(), msg.getAuthor());
            con.getMessageList().add(msg);
            ho.put(msg.getTo(), msg.getAuthor(),con);
        } else { // 상대방에게 대화 데이터가 없을때
            Conversation newCon = new Conversation(msg.getAuthor(), new ArrayList<>());
            newCon.getMessageList().add(msg);
            ho.put(msg.getTo(), msg.getAuthor(),newCon);
        }
        simpMessagingTemplate.convertAndSend("/topic/"+msg.getTo() , msg);
    }

    @GetMapping("/fetchAllChats/{userName}")
    public ResponseEntity<Collection<Conversation>> fetchAll(@PathVariable String userName){
        HashOperations<String, String, Conversation> hashOperations = conversationTemplate.opsForHash();
        logger.info("user name: {}", userName);
        Map<String, Conversation> mapper = hashOperations.entries(userName);
        Collection<Conversation> res = mapper.values();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
