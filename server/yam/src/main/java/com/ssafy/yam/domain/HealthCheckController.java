package com.ssafy.yam.domain;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/healthCheck")
public class HealthCheckController {
    @GetMapping("")
    public ResponseEntity<?> check(){
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }
}
