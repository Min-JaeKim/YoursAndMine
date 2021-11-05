package com.ssafy.yam.exception;

public class UserUnmatchedException extends RuntimeException {
	public UserUnmatchedException(String need) {
		super("This Notice is for " + need);
	}
}
