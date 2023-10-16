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
import com.simonecampis.ElementalChat.model.Message;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.HttpHeaders;

import java.util.*;

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

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    private ArrayList<UserDTO> loggedUsers;


    /**
     * Prende in input due param, setta il message e lo inoltra all'URI che si occupa di inviarlo.
     * @param to Destinatario
     * @param message Messaggio
     */
    public void sendMessage (String to, Message message){
        Date date = new Date();
        System.out.println("handling send message: " + message + " to: " + to);

        message.setNomeChat(chatConverter.toEntity(checkChatExist(to)).getNomeChat());
        message.setDate(date);
        message = repo.save(message);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
    }

    public ChatDTO checkChatExist (String to) {
        ChatDTO c = chatConverter.toDTO(chatRepo.findByNomeChat(to));
        if(Objects.isNull(c)) {
            ChatDTO dto = new ChatDTO();
            dto.setNomeChat(to);
            return chatConverter.toDTO(chatRepo.save(chatConverter.toEntity(dto)));
        }
        return c;
    }

    public Map<String, Object> findPagesByChat (String nomeChat, Integer page) {
        List<MessageDTO> messages = new ArrayList<MessageDTO>();
        Pageable pageable = PageRequest.of(page, 15); //primo valore è la pagina corrente, il secondo è quanti messaggi vedrà per pagina.
        Page<MessageDTO> messPages = converter.toDTOPages(repo.findByNomeChatOrderByDateAsc(nomeChat, pageable));
        messages = messPages.getContent();
        Map<String, Object> response = new HashMap<>();
        response.put("messages", messages);
        response.put("currentPage", messPages.getNumber());
        response.put("totalPages", messPages.getTotalPages());
        response.put("totalMessages", messPages.getTotalElements());

        return response;
    }

    public Integer findNumberPages(String nomeChat) {
        Pageable pageable = PageRequest.of(0, 15); //primo valore è la pagina corrente, il secondo è quanti messaggi vedrà per pagina.
        Page<MessageDTO> messPages = converter.toDTOPages(repo.findByNomeChatOrderByDateAsc(nomeChat, pageable));
        Integer numPages = messPages.getTotalPages();

        return numPages;
    }

    public ArrayList<UserDTO> getUsersSession() {
        System.out.println("loggedUsers: "+ elementalServiceA.getLoggedUsers());
        return loggedUsers = elementalServiceA.getLoggedUsers();
    }
    public List<MessageDTO> getAllMessagesByChat(Chat chat) {
        return converter.toDTOList(repo.findAllByNomeChat(chat.getNomeChat()));
    }

    public ChatDTO findChatByNome(String nome) {
        return chatConverter.toDTO(chatRepo.findByNomeChat(nome));
    }
}
