package com.ssafy.yam.service;

import com.ssafy.yam.model.Conversation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Slf4j
@Service
public class ChatService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String chatInfoApiUrl = "https://k5a102.p.ssafy.io:8080/api/user/chat-info";

    public Map<String, Object> getChatInfo(Collection<Conversation> res, String token) {
        log.info("res : ", res);
        Map<String, String> chatInfo;
        List<Map<String, String>> chatInfoList = new ArrayList<>();
        for (Conversation r : res) {
            chatInfo = new HashMap<>();
            chatInfo.put("userId", r.getPartnerPk());
            chatInfo.put("itemId", r.getItemPk());
            chatInfoList.add(chatInfo);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer "+token);

        HttpEntity<List<Map<String, String>>> httpEntity = new HttpEntity<>(chatInfoList, headers);

        List<Map<String, String>> fetchUserlist = restTemplate
                .exchange(chatInfoApiUrl, HttpMethod.POST, httpEntity, List.class)
                .getBody();

        Map<String, Object> fetchResult = new HashMap<>();
        fetchResult.put("conversation", res);
        fetchResult.put("chatRoomInfo", fetchUserlist);

        return fetchResult;
    }
}
