package com.ssafy.yam.domain.user.service;

import com.ssafy.yam.domain.user.entity.MyUserDetails;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		return userRepository.findByUserEmail(username)
//				.map(this::createUserDetails)
//				.orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
		return userRepository.findByUserEmail(username)
				.map(u -> new MyUserDetails(u, Collections.singleton(new SimpleGrantedAuthority(u.getUserNickname())))).orElseThrow(() -> new UserNotFoundException(username));
	}

	// 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
	private UserDetails createUserDetails(MyUserDetails user) {
		return new User(user.getUsername(), user.getPassword(), user.getAuthorities());
	}
}
