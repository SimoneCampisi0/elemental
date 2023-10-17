package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.utils.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/log")
//@CrossOrigin(origins = "http://localhost:4200")
public class LogController {
    @Autowired
    LogManager manager;
    @GetMapping(value = "/getLoggedUsers")
    public List<UserDTO> getLoggedUsers() {
        return manager.getListLoggedUsers();
    }
    @PostMapping(value="logout")
    public void logout(@RequestBody UserDTO dto) {
        manager.logout(dto);
    }
}
