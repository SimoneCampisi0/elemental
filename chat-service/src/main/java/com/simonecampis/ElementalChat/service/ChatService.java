package com.simonecampis.ElementalChat.service;

import com.simonecampis.ElementalChat.dto.UserDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;

@Service
@Transactional
public class ChatService {
    @Autowired
    private WebClient webClient;
    private ArrayList<UserDTO> loggedUsers;
    public ArrayList<UserDTO> getUsersSession() {
        return loggedUsers =  webClient.get()
                .uri("http://localhost:8081/log/getLoggedUsers")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<ArrayList<UserDTO>>() {})
                .block();
    }
}
