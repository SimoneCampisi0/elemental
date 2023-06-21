package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;

@RestController
@RequestMapping("/log")
@CrossOrigin(origins = "http://localhost:4200")
public class LogController {
    @Autowired
    LogService service;
    @GetMapping(value = "/getLoggedUsers")
    public ArrayList<UserDTO> getLoggedUsers() {
        return service.getLoggedUsers();
    }

    @PostMapping(value="addLoggedUser")
    public void addLoggedUser(@RequestBody UserDTO dto) {
        service.addLoggedUser(dto);
    }

    @PostMapping(value="logout")
    public void logout(@RequestBody UserDTO dto) {
        service.logout(dto);
    }
}
