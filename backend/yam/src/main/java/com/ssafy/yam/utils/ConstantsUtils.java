package com.ssafy.yam.utils;

public class ConstantsUtils {

	public static final int LIMIT = 20;

	public static final String BOOKMARK = "/api/bookmark";
	public static final String CONTRACT = "/api/contract";
	public static final String ITEM = "/api/item";
	public static final String SEARCH = "/api/search";
	public static final String USER = "/api/user";

	// JWT String
	public static final String AUTH_HEADER = "Authentication";
	public static final String TOKEN_TYPE = "BEARER";
	public static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;              // 30분
	public static final long REFRESH_TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000L;    // 7일

	// MailSender
	public static final String FROM_ADDRESS = "billige2021@gmail.com";

	public static final String SUCCESS = "success";

	// Address, SiGunGu Code
	public static final String DEFAULT_ADDRESS = "서울특별시 강남구 역삼동 언주로 508";
	public static final String DEFAULT_CODE = "11110";
}
