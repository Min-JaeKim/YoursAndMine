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

    private static final String chatInfoApiUrl8080 = "https://k5a102.p.ssafy.io:8080/api/user/chat-info";
    private static final String chatInfoApiUrl8090 = "https://k5a102.p.ssafy.io:8090/api/user/chat-info";

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
        List<Map<String, String>> fetchUserlist = null;

        // 무중단 배포시 포트번호가 바뀌기 때문에 8080이 실패하면 8090으로 보내는 로직 추가
        try {
            fetchUserlist = restTemplate
                    .exchange(chatInfoApiUrl8080, HttpMethod.POST, httpEntity, List.class)
                    .getBody();
        } catch (Exception e) {
            fetchUserlist = restTemplate
                    .exchange(chatInfoApiUrl8090, HttpMethod.POST, httpEntity, List.class)
                    .getBody();
        }
        Map<String, Object> fetchResult = new HashMap<>();
        fetchResult.put("conversation", res);
        fetchResult.put("chatRoomInfo", fetchUserlist);

        return fetchResult;
    }
}
