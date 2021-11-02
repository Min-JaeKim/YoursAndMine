package com.ssafy.yam.domain.user.service;

//import com.ssafy.yam.auth.Provider.JwtTokenProvider;
import com.ssafy.yam.auth.Provider.RandomSaltProvider;
import com.ssafy.yam.domain.user.dto.request.UserRequestDto;
import com.ssafy.yam.domain.user.dto.response.UserResponseDto;
import com.ssafy.yam.domain.user.entity.User;
import com.ssafy.yam.domain.user.enums.Role;
import com.ssafy.yam.domain.user.repository.UserRepository;
import com.ssafy.yam.utils.ResponseUtils;
import com.ssafy.yam.utils.S3UploadUtils;
import com.ssafy.yam.utils.TokenUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;

import static com.ssafy.yam.utils.ConstantsUtils.FROM_EMAIL_ADDRESS;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final ResponseUtils response;
    private final BCryptPasswordEncoder passwordEncoder;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private RandomSaltProvider randomSaltProvider;
    //    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public ResponseEntity<?> signUp(UserRequestDto.SignUp signUp) {
        if(userRepository.existsByUserEmail(signUp.getUserEmail())) {
            return response.fail("이미 회원가입된 email 입니다.", HttpStatus.BAD_REQUEST);
        }

        String salt = randomSaltProvider.getNextSalt().toString();
        System.out.println("salt : " + salt);

        User user = User.builder()
                .userNickname(signUp.getUserNickname())
                .userEmail(signUp.getUserEmail())
                .userPassword(passwordEncoder.encode(signUp.getUserPassword() + salt))
//                .userPassword(passwordEncoder.encode(signUp.getUserPassword()))
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

    public boolean emailCheck(String userEmail) {
        return userRepository.existsByUserEmail(userEmail);
    }

    public UserResponseDto.sendEmailResDto sendEmail(String userEmail) {
        UserResponseDto.sendEmailResDto sendEmailResDto = new UserResponseDto.sendEmailResDto();

        // 인증번호 생성
        String key = certificationNumberGenerator();
        System.out.println(key);
        // 메일 생성
        UserResponseDto.EmailResDto mail = createEmail(userEmail, key);
        // 메일 전송
        mailSend(mail);
        sendEmailResDto.setCertificationNumber(key);

        return sendEmailResDto;
    }

    @Autowired
    private JavaMailSender mailSender;
    public void mailSend(UserResponseDto.EmailResDto emailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailDto.getEmail());
        message.setFrom(FROM_EMAIL_ADDRESS);
        message.setSubject(emailDto.getTitle());
        message.setText(emailDto.getMessage());
        mailSender.send(message);

    }

    public UserResponseDto.EmailResDto createEmail(String userEmail, String certificationNumber) {
        UserResponseDto.EmailResDto emailResDto = new UserResponseDto.EmailResDto();
        emailResDto.setEmail(userEmail);
        emailResDto.setTitle("YAM 인증번호 안내 관련 메일 입니다.");
        emailResDto.setMessage("안녕하세요. YAM 인증번호 안내 관련 메일 입니다." + "\n" + "고객님의 인증번호는 " + certificationNumber + "입니다.");

        return emailResDto;
    }

    public String certificationNumberGenerator(){

        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        StringBuilder sb = new StringBuilder();
        int idx = 0;

        for (int i = 0; i < 6; i++) {
            idx = (int) (charSet.length * Math.random());
            sb.append(charSet[idx]);
        }
        return sb.toString();
    }

    @Autowired
    private S3UploadUtils s3UploadUtils;

    @Transactional
    public UserResponseDto.modifyProfileResDto modifyProfile(String token, MultipartFile userImage, String userNickname) {
        UserResponseDto.modifyProfileResDto modifyProfileResDto = new UserResponseDto.modifyProfileResDto(false, false);
        String tokenEmail = TokenUtils.getUserEmailFromToken(token);
        String userSet = tokenEmail + "(" + LocalDate.now().toString() + ")";
        String imageUrl = null;

        User user = userRepository.findByUserEmail(tokenEmail)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

        if(userImage != null) {
            try {
                imageUrl = s3UploadUtils.upload(userImage, "profile", userSet);
                logger.info(tokenEmail + " : profile image upload s3 success");
            } catch (IOException e){
                logger.info(tokenEmail + " : profile image upload s3 fail");
                e.printStackTrace();
            }
        }

        if(imageUrl != null){
            user.setUserImageUrl(imageUrl);
            modifyProfileResDto.setModifiedImage(true);
        }
        if(userNickname != null){
            user.setUserNickname(userNickname);
            modifyProfileResDto.setModifiedNickname(true);
        }

        userRepository.save(user);

        return modifyProfileResDto;
    }
}
