package com.ssafy.yam.exception;

public class UserNotFoundException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserNotFoundException(String email) {
		super(email + "NotFoundException");
	}
}
