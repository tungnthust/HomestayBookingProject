package com.group4T.homestaybooking.HomestayBooking.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group4T.homestaybooking.HomestayBooking.dto.AuthenticationResponse;
import com.group4T.homestaybooking.HomestayBooking.dto.LoginRequest;
import com.group4T.homestaybooking.HomestayBooking.dto.RefreshTokenRequest;
import com.group4T.homestaybooking.HomestayBooking.dto.RegisterRequest;
import com.group4T.homestaybooking.HomestayBooking.model.NotificationEmail;
import com.group4T.homestaybooking.HomestayBooking.model.User;
import com.group4T.homestaybooking.HomestayBooking.model.VerificationToken;
import com.group4T.homestaybooking.HomestayBooking.repository.UserRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.VerificationTokenRepository;
import com.group4T.homestaybooking.HomestayBooking.security.JwtProvider;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository repo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private VerificationTokenRepository verificationTokenRepo;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private MailService mailService;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private RefreshTokenService refreshTokenService;
	
	@Transactional
	public void signup(RegisterRequest registerRequest) {
		User user = new User();
		user.setUsername(registerRequest.getUsername());
		user.setEmail(registerRequest.getEmail());
		user.setPhone(registerRequest.getPhone());
		user.setFirst_name(registerRequest.getFirst_name());
		user.setLast_name(registerRequest.getLast_name());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		user.setEnabled(true);
		repo.save(user);
		
		String token = generateVerificationToken(user);
		mailService.sendMail(new NotificationEmail("Please Activate your Account",
                user.getEmail(), "Thank you for signing up to Homestay Booking, " +
                "please click on the below url to activate your account : " +
                "http://localhost:8080/api/auth/accountVerification/" + token));
	}

	private String generateVerificationToken(User user) {
		String token = UUID.randomUUID().toString();
		VerificationToken verificationToken = new VerificationToken();
		verificationToken.setToken(token);
		verificationToken.setUser(user);
		verificationTokenRepo.save(verificationToken);
        return token;
	}

	public void verifyAccount(String token) {
		Optional<VerificationToken> verificationToken = verificationTokenRepo.findByToken(token);
		fetchUserAndEnable(verificationToken.orElseThrow(() -> new RuntimeException("Invalid Token")));
	}

	private void fetchUserAndEnable(VerificationToken verificationToken) {
		String email = verificationToken.getUser().getEmail();
		User user = repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User with email " + email + "not found"));
		user.setEnabled(true);
		repo.save(user);
	}

	public AuthenticationResponse login(LoginRequest loginRequest) {
		Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequest.getUsername(), loginRequest.getPassword()));
		System.out.println(SecurityContextHolder.getContext());
		SecurityContextHolder.getContext().setAuthentication(authenticate);
		System.out.println(SecurityContextHolder.getContext());
		String token = jwtProvider.generateToken(authenticate);
		return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(loginRequest.getUsername())
                .build();
	}
	
	public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtProvider.generateTokenWithUserName(refreshTokenRequest.getUsername());
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .refreshToken(refreshTokenRequest.getRefreshToken())
                .expiresAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()))
                .username(refreshTokenRequest.getUsername())
                .build();
    }
	
}
