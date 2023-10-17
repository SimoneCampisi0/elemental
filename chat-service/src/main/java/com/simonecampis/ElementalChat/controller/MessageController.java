package com.simonecampis.ElementalChat.controller;

import com.simonecampis.ElementalChat.dto.ChatDTO;
import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.dto.UserDTO;
import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.Message;
import com.simonecampis.ElementalChat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
//@CrossOrigin(origins = "http://localhost:4200")
public class MessageController extends AbstractController<MessageDTO> {
    @Autowired
    private ChatService chatService;


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
    public ResponseEntity<Map<String, Object>> findPagesByChat (@RequestParam String nomeChat, @RequestParam(defaultValue = "0") Integer page) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(chatService.findPagesByChat(nomeChat,page));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="findNumberPages")
    public ResponseEntity<Integer> findNumberPages (@RequestParam String nomeChat) {
        try {
            Integer numPages = chatService.findNumberPages(nomeChat);
            return new ResponseEntity<>(numPages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}