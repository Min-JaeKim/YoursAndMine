package com.ssafy.yam.auth.Provider;

import com.ssafy.yam.domain.user.entity.MyUserDetails;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider{
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	private final UserDetailsService userDetailsService;
	
	private final BCryptPasswordEncoder passwordEncoder;
	
	@Override
	public Authentication authenticate(Authentication authentication) {
		final UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
		System.out.println("Provider");
		//AuthenticationFilter에서 생성된 토큰으로부터 아이디와 비밀번호를 조회
		final String userEmail = token.getName();
		final String userPassword = (String) token.getCredentials();

		//UserDetailsService를 통해 DB에서 아이디로 사용자 조회
		final MyUserDetails userDetails = (MyUserDetails) userDetailsService.loadUserByUsername(userEmail);

		if (!passwordEncoder.matches(userPassword + userDetails.getUserSalt(), userDetails.getPassword())) {
			throw new BadCredentialsException(userDetails.getUsername() + "Invalid password");
		}

		return new UsernamePasswordAuthenticationToken(userDetails, userPassword, userDetails.getAuthorities());
		
	}
	
	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
	
}
