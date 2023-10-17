package com.simonecampis.Elemental.utils;

import com.simonecampis.Elemental.config.JwtService;
import com.simonecampis.Elemental.converter.UserConverter;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.HashMap;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Data
public class LogManager {
    @Autowired
    private UserService userService;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private JwtService jwtService;

    private final Map<String, String> loggedUsers = new HashMap<>(); //email, jwtToken

    public void addLoggedUser(String email, String token) {
        loggedUsers.put(email, token);
    }

    public List<UserDTO> getListLoggedUsers() {
        return loggedUsers.keySet().stream()
                .map(email -> userService.findUserByEmail(email))
                .collect(Collectors.toList());
    }

    @Scheduled(cron = "0 */40 * * * ?") //ogni 40 minuti
    public void checkJWT() {
        System.out.println("metodo checkJWT");


        loggedUsers.entrySet()
                .iterator()
                .forEachRemaining(o -> {
                    if (jwtService.isTokenExpired(o.getValue())) {
                        logout(userService.findUserByEmail(o.getKey()));
                    }
                });
    }

    public void logout(UserDTO userDTO) {
        loggedUsers.remove(userDTO.getEmail());
    }
}
