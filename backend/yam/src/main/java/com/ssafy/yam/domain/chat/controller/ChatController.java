package com.ssafy.yam.domain.chat.controller;

import com.ssafy.yam.domain.chat.dto.ChatRoomDTO;
import com.ssafy.yam.domain.chat.repository.ChatRoomRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/chat")
@Log4j2
public class ChatController {

    @Autowired
    private ChatRoomRepository repository;

    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomDTO>> rooms() {

        log.info("# All Chat Rooms");

        List<ChatRoomDTO> allRooms = repository.findAllRooms();

        return new ResponseEntity<List<ChatRoomDTO>>(allRooms, HttpStatus.OK);
    }
}
