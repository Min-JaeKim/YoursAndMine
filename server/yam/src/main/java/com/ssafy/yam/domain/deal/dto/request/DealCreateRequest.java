package com.ssafy.yam.domain.deal.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DealCreateRequest {

    private int itemId;
    private LocalDate dealStartDate;
    private LocalDate dealEndDate;

}
