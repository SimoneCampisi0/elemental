package com.simonecampis.ElementalChat.controller;

import com.netflix.discovery.converters.Auto;
import com.simonecampis.ElementalChat.converter.ChatConverter;
import com.simonecampis.ElementalChat.dao.ChatRepo;
import com.simonecampis.ElementalChat.dao.MessageRepo;
import com.simonecampis.ElementalChat.dto.ChatDTO;
import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.dto.UserDTO;
import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.Message;
import com.simonecampis.ElementalChat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
//@RequestMapping("/message")
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
    private SimpMessagingTemplate simpMessagingTemplate;

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
        Date date = new Date();
        System.out.println("handling send message: " + message + " to: " + to);

        message.setChat(checkChatExist(to));
        message.setDate(date);
        message = messageRepo.save(message);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
//        convertAndSend(to, message);
    }

//    public Message convertAndSend(String to, Message message) {
//        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
//
//    }
    //returns an empty list if the chat doesn't exist
    @PostMapping("/getAllMessagesByChat")
    public List<MessageDTO> getAllMessagesByChat(@RequestBody Chat chat) {
        return chatService.getAllMessagesByChat(chat);
    }

    public Chat checkChatExist(String to) {
        Chat c = chatRepo.findByNomeChat(to);
        if(c == null) {
            Chat chat = new Chat(0L, to);
            return chatRepo.save(chat);
        }
        return c;
    }
}