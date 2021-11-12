package com.ssafy.yam.domain.item;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONArray;
import net.minidev.json.parser.JSONParser;
import org.hamcrest.Matchers;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ItemControllerTest {

    @Autowired(required = true)
    private MockMvc mvc;

    @Ignore
    @Test
    public void getItemListWithoutJWT() throws Exception {
        String expected = "[{\"itemId\":31,\"itemName\":\"33\",\"itemPrice\":500,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":\"https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/view_02.jpg%282021-11-04%29%20-%20view_02.jpg\",\"itemAreaCode\":\"11110\",\"itemModifiedTime\":\"2021-11-08T11:33:42\",\"bookmarkCount\":0},{\"itemId\":28,\"itemName\":\"동백 바디로션\",\"itemPrice\":500,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":\"https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/view_02.jpg%282021-11-04%29%20-%20view_02.jpg\",\"itemAreaCode\":\"11110\",\"itemModifiedTime\":\"2021-11-04T16:38:42\",\"bookmarkCount\":0},{\"itemId\":33,\"itemName\":\"선인장 클렌징폼\",\"itemPrice\":500,\"itemAddress\":\"서울특별시 강남구 역삼동 언주로 508\",\"itemImage\":\"https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/m6.jpg%282021-11-04%29%20-%20m6.jpg\",\"itemAreaCode\":\"11110\",\"itemModifiedTime\":\"2021-11-04T11:44:42\",\"bookmarkCount\":0},{\"itemId\":29,\"itemName\":\"테스7\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":null,\"itemAreaCode\":\"11110\",\"itemModifiedTime\":\"2021-11-03T11:38:08\",\"bookmarkCount\":0},{\"itemId\":27,\"itemName\":\"테스5\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":null,\"itemAreaCode\":\"11100\",\"itemModifiedTime\":\"2021-11-03T11:37:55\",\"bookmarkCount\":0},{\"itemId\":26,\"itemName\":\"테스4\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":null,\"itemAreaCode\":\"11100\",\"itemModifiedTime\":\"2021-11-03T11:37:50\",\"bookmarkCount\":0},{\"itemId\":25,\"itemName\":\"테스3\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":null,\"itemAreaCode\":\"11100\",\"itemModifiedTime\":\"2021-11-03T11:35:58\",\"bookmarkCount\":0},{\"itemId\":19,\"itemName\":\"테스2\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":null,\"itemAreaCode\":\"11100\",\"itemModifiedTime\":\"2021-11-03T11:30:41\",\"bookmarkCount\":0},{\"itemId\":18,\"itemName\":\"테스1\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":null,\"itemAreaCode\":\"11100\",\"itemModifiedTime\":\"2021-11-03T11:30:32\",\"bookmarkCount\":0},{\"itemId\":10,\"itemName\":\"다이슨 청소기\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":\"https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EB%8B%A4%EC%9D%B4%EC%8A%A8%20V11%20%EC%BB%B4%ED%94%8C%EB%A6%AC%ED%8A%B8.jpg%282021-11-03%29%20-%20%EB%8B%A4%EC%9D%B4%EC%8A%A8%20V11%20%EC%BB%B4%ED%94%8C%EB%A6%AC%ED%8A%B8.jpg\",\"itemAreaCode\":\"11100\",\"itemModifiedTime\":\"2021-11-03T11:21:55\",\"bookmarkCount\":0},{\"itemId\":9,\"itemName\":\"자전거\",\"itemPrice\":2000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":\"https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/%EC%9E%90%EC%A0%84%EA%B1%B0.jpg%282021-11-03%29%20-%20%EC%9E%90%EC%A0%84%EA%B1%B0.jpg\",\"itemAreaCode\":\"11100\",\"itemModifiedTime\":\"2021-11-03T11:17:48\",\"bookmarkCount\":0},{\"itemId\":8,\"itemName\":\"제이크\",\"itemPrice\":1000,\"itemAddress\":\"서울시 관악구 신림동\",\"itemImage\":\"https://yam-s3.s3.ap-northeast-2.amazonaws.com/item/gjqjtm_%2838%29.jpg%282021-11-02%29%20-%20gjqjtm_%2838%29.jpg\",\"itemAreaCode\":\"11101\",\"itemModifiedTime\":\"2021-11-02T17:23:11\",\"bookmarkCount\":0}]";
        mvc.perform(get("/api/item?size=12&page=0&sort=itemModifiedTime,DESC"))
                .andExpect(status().isOk())
                .andDo(print());
//        String data = new URL("/api/item?size=12&page=0&sort=itemModifiedTime,DESC").getContent().toString();
//        JSONAssert.assertEquals(expected, data, false);
    }


    @Test
    public void getItemListWithJWT() throws Exception {
//        String[] list = {"11100","11100","11100","11100","11100","11100","11100"};
        List<String> list = new ArrayList<>();
        for(int i = 0; i < 7; i++){
            list.add("11100");
        }
        JSONParser jsonParser = new JSONParser(JSONParser.DEFAULT_PERMISSIVE_MODE);
        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray listJson = (JSONArray) jsonParser.parse(objectMapper.writeValueAsString(list));
        String token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5dW5AbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTYzNjc2NzkyOH0.WhuQ2NrIygSi6x5TSnslBZlzGOREERYVgH9NKTQFxiYjYznqCxruTVe2ayZPbkGxGN0B5oW_bbyQF9OM4iwLGQ";
        mvc.perform(get("/api/item").header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].itemAreaCode")
                        .value(Matchers.containsInAnyOrder(listJson.toArray())))
                .andDo(print());
    }
}
