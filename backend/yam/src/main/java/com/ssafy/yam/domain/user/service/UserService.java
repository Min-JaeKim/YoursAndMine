package com.ssafy.yam.domain.user.service;

//import com.ssafy.yam.auth.Provider.JwtTokenProvider;
import com.ssafy.yam.auth.Provider.RandomSaltProvider;
import com.ssafy.yam.domain.user.dto.request.UserRequestDto;
import com.ssafy.yam.domain.user.dto.response.UserResponseDto;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ResponseUtils response;
    private final BCryptPasswordEncoder passwordEncoder;
    private RandomSaltProvider randomSaltProvider;
//    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public ResponseEntity<?> signUp(UserRequestDto.SignUp signUp) {
        if(userRepository.existsByUserEmail(signUp.getUserEmail())) {
            return response.fail("이미 회원가입된 email 입니다.", HttpStatus.BAD_REQUEST);
        }

        String salt = randomSaltProvider.getNextSalt().toString();

        User user = User.builder()
                .userNickname(signUp.getUserNickname())
                .userEmail(signUp.getUserEmail())
                .userPassword(passwordEncoder.encode(signUp.getUserPassword() + salt))
                .userSalt(salt)
                .userImageUrl("https://yam-s3.s3.ap-northeast-2.amazonaws.com/profile/defaultImage.png")
                .userAuthLevel(1)
                .build();
        userRepository.save(user);

        return response.success("회원가입에 성공했습니다.");
    }

//    public ResponseEntity<?> login(UserRequestDto.Login login) {
//        if(!userRepository.existsByUserEmail(login.getUserEmail())) {
//            return response.fail("해당하는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
//        }
//
//        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
//        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
//        UsernamePasswordAuthenticationToken authenticationToken = login.toAuthentication();
//
//        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
//        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
//        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//
//        // 3. 인증 정보를 기반으로 JWT 토큰 생성
//        UserResponseDto.TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);
//
//        // TODO:: RefreshToken Redis 저장
//
//        return response.success(tokenInfo, "로그인에 성공했습니다.", HttpStatus.OK);
//    }
}
