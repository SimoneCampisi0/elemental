package com.simonecampis.ElementalChat.controller;

import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.dto.UserDTO;
import com.simonecampis.ElementalChat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
//@RequestMapping("/message")
@CrossOrigin(origins = "http://localhost:4200")
public class MessageController extends AbstractController<MessageDTO> {
    @Autowired
    private ChatService chatService;

    @GetMapping(value="/getLogUsers")
    public ArrayList<UserDTO> getLogUsers() {
        return chatService.getUsersSession();
    }

}