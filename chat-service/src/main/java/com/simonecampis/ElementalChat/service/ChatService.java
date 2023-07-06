package com.simonecampis.ElementalChat.service;

import com.simonecampis.ElementalChat.controller.ElementalServiceA;
import com.simonecampis.ElementalChat.converter.ChatConverter;
import com.simonecampis.ElementalChat.converter.MessageConverter;
import com.simonecampis.ElementalChat.dao.ChatRepo;
import com.simonecampis.ElementalChat.dao.MessageRepo;
import com.simonecampis.ElementalChat.dto.ChatDTO;
import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.dto.UserDTO;
import com.simonecampis.ElementalChat.model.Chat;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.HttpHeaders;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ChatService {
    @Autowired
    private ChatConverter chatConverter;

    @Autowired
    private MessageConverter converter;

    @Autowired
    private MessageRepo repo;

    @Autowired
    private ChatRepo chatRepo;

    private static final String LOGGED_USERS_ENDPOINT = "http://elemental-app/log/getLoggedUsers";

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private ElementalServiceA elementalServiceA;
    private ArrayList<UserDTO> loggedUsers;
//    public ArrayList<UserDTO> getUsersSession() {
//        return loggedUsers =  webClientBuilder.build().get()
//                .uri("http://elemental-app/log/getLoggedUsers")
//                .header("x-service-name", "elemental-chat")
//                .retrieve()
//                .bodyToMono(new ParameterizedTypeReference<ArrayList<UserDTO>>() {})
//                .block();
//    }

    public ArrayList<UserDTO> getUsersSession() {
        System.out.println("loggedUsers: "+ elementalServiceA.getLoggedUsers());
        return loggedUsers = elementalServiceA.getLoggedUsers();
    }
    public List<MessageDTO> getAllMessagesByChat(Chat chat) {
        return converter.toDTOList(repo.findByChat(chat));
    }

    public ChatDTO findChatByNome(String nome) {
        return chatConverter.toDTO(chatRepo.findByNomeChat(nome));
    }
}
