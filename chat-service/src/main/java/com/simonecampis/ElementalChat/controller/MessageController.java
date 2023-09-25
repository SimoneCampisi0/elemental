package com.simonecampis.ElementalChat.controller;

import com.simonecampis.ElementalChat.converter.ChatConverter;
import com.simonecampis.ElementalChat.converter.MessageConverter;
import com.simonecampis.ElementalChat.dao.ChatRepo;
import com.simonecampis.ElementalChat.dao.MessageRepo;
import com.simonecampis.ElementalChat.dto.ChatDTO;
import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.dto.UserDTO;
import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.Message;
import com.simonecampis.ElementalChat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController extends AbstractController<MessageDTO> {
    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepo chatRepo;

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private ChatConverter chatConverter;

    @Autowired
    private MessageConverter messageConverter;


    @GetMapping(value="findChatByNome")
    public ChatDTO findChatByNome(@RequestParam String nome) {

        return chatService.findChatByNome(nome);
    }

    @GetMapping(value="/getLogUsers")
    public ArrayList<UserDTO> getLogUsers() {
        return chatService.getUsersSession();
    }


    @MessageMapping("/chat/{to}") //to = nome canale
    public void sendMessage(@DestinationVariable String to , Message message) {
        chatService.sendMessage(to, message);
    }

    @PostMapping("/getAllMessagesByChat")
    public List<MessageDTO> getAllMessagesByChat(@RequestBody Chat chat) {
        return chatService.getAllMessagesByChat(chat);
    }

    @GetMapping(value="/checkChatExist")
    public ChatDTO checkChatExist(@RequestParam  String to) {
       return chatService.checkChatExist(to);
    }

    @GetMapping(value="findPagesByChat")
    public ResponseEntity<Map<String, Object>> findPagesByChat (@RequestParam Long idChat, @RequestParam(defaultValue = "0") Integer page) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(chatService.findPagesByChat(idChat,page));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="findNumberPages")
    public ResponseEntity<Integer> findNumberPages (@RequestParam Long idChat) {
        List<MessageDTO> messages = new ArrayList<MessageDTO>();
        try {
            Integer numPages = chatService.findNumberPages(idChat);
            return new ResponseEntity<>(numPages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}