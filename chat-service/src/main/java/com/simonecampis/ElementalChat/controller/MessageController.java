package com.simonecampis.ElementalChat.controller;

import com.netflix.discovery.converters.Auto;
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
import org.bouncycastle.cert.ocsp.Req;
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
    private MessageConverter messageConverter;

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

        message.setChat(chatConverter.toEntity(checkChatExist(to)));
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

    @GetMapping(value="/checkChatExist")
    public ChatDTO checkChatExist(@RequestParam  String to) {
        ChatDTO c = chatConverter.toDTO(chatRepo.findByNomeChat(to));
        if(c == null) {
            ChatDTO dto = new ChatDTO(0L, to);
            return chatConverter.toDTO(chatRepo.save(chatConverter.toEntity(dto)));
        }
        return c;
    }


//    @GetMapping(value="findPagesByChat")
//    public ResponseEntity<Map<String, Object>> findPagesByChat (@RequestParam Long idChat,
//                                                                @RequestParam(defaultValue = "0") Integer page) {
//        List<Message> messages = new ArrayList<Message>();
//        try {
//            Pageable pageable = PageRequest.of(page, 5);
//
//            Page<Message> messPages = messageRepo.findByChat_IdChat(idChat, pageable);
//
//            messages = messPages.getContent();
//            Map<String, Object> response = new HashMap<>();
//            response.put("messages", messages);
//            response.put("currentPage", messPages.getNumber());
//            response.put("totalPages", messPages.getTotalPages());
//            response.put("totalMessages", messPages.getTotalElements());
//
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping(value="findPagesByChat")
    public ResponseEntity<Map<String, Object>> findPagesByChat (@RequestParam Long idChat,
                                                                @RequestParam(defaultValue = "0") Integer page) {
        List<MessageDTO> messages = new ArrayList<MessageDTO>();
        try {
            Pageable pageable = PageRequest.of(page, 15); //primo valore è la pagina corrente, il secondo è quanti messaggi vedrà per pagina.

            Page<MessageDTO> messPages = messageConverter.toDTOPages(messageRepo.findByChat_IdChatOrderByDateAsc(idChat, pageable));

            messages = messPages.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("messages", messages);
            response.put("currentPage", messPages.getNumber());
            response.put("totalPages", messPages.getTotalPages());
            response.put("totalMessages", messPages.getTotalElements());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="findNumberPages")
    public ResponseEntity<Integer> findNumberPages (@RequestParam Long idChat) {
        List<MessageDTO> messages = new ArrayList<MessageDTO>();
        try {
            Pageable pageable = PageRequest.of(0, 15); //primo valore è la pagina corrente, il secondo è quanti messaggi vedrà per pagina.

            Page<MessageDTO> messPages = messageConverter.toDTOPages(messageRepo.findByChat_IdChatOrderByDateAsc(idChat, pageable));


            Integer numPages = messPages.getTotalPages();

            return new ResponseEntity<>(numPages, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}