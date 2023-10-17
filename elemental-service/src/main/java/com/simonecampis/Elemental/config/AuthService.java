package com.simonecampis.Elemental.config;

import com.simonecampis.Elemental.dao.UserRepo;
import com.simonecampis.Elemental.model.Role;
import com.simonecampis.Elemental.model.User;
import com.simonecampis.Elemental.utils.LogManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private UserRepo repo;

    private final LogManager logManager;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repo.save(user);
        var jwtToken = jwtService.generateToken(user);

        logManager.addLoggedUser(user.getEmail(), jwtToken); //TODO Controllare

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repo.findByEmail(request.getEmail());
        var jwtToken = jwtService.generateToken(user);

        logManager.addLoggedUser(user.getEmail(), jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
