package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;

@RestController
@RequestMapping("/log")
@CrossOrigin(origins = "http://localhost:4200")
public class LogController {
    @Autowired
    LogService service;
    @GetMapping(value = "/getLoggedUser")
    public LinkedList<UserDTO> getLoggedUser() {
        return service.getLoggedUser();
    }

    @PostMapping(value="addLoggedUser")
    public void addLoggedUser(UserDTO dto) {
        service.addLoggedUser(dto);
    }

    @PostMapping(value="removeLoggedUser")
    public void removeLoggedUser(UserDTO dto) {
        service.removeLoggedUser(dto);
    }
}
