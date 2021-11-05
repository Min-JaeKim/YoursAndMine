package com.ssafy.yam.auth.handler;

import com.ssafy.yam.utils.TokenUtils;
import com.ssafy.yam.domain.user.entity.MyUserDetails;
import com.ssafy.yam.domain.user.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.ssafy.yam.utils.ConstantsUtils.AUTH_HEADER;
import static com.ssafy.yam.utils.ConstantsUtils.TOKEN_TYPE;

public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Override
	public void onAuthenticationSuccess(final HttpServletRequest request, final HttpServletResponse response,
			final Authentication authentication) throws IOException {
	
		final User user = ((MyUserDetails) authentication.getPrincipal()).getUser();
		final String token = TokenUtils.generateJwtToken(user);
		response.addHeader(AUTH_HEADER, TOKEN_TYPE + " " + token);
//		getRedirectStrategy().sendRedirect(request, response, "/");
		
	}
}
