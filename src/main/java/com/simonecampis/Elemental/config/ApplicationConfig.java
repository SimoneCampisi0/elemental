package com.simonecampis.Elemental.config;

import com.simonecampis.Elemental.dao.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    @Autowired
    private final UserRepo repo;
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repo.findByEmail(username);
//                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato"));
    }
}
