package com.simonecampis.ElementalChat.service;

import com.simonecampis.ElementalChat.dto.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.HttpHeaders;

import java.util.ArrayList;

@Service
@Transactional
public class ChatService {
    private static final String LOGGED_USERS_ENDPOINT = "http://elemental-app/log/getLoggedUsers";

    @Autowired
    private WebClient.Builder webClientBuilder;
    private ArrayList<UserDTO> loggedUsers;
    public ArrayList<UserDTO> getUsersSession() {
        return loggedUsers =  webClientBuilder.build().get()
                .uri("http://elemental-app/log/getLoggedUsers")
                .header("x-service-name", "elemental-chat")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ArrayList<UserDTO>>() {})
                .block();
    }
}
