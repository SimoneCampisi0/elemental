package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.LoginDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://localhost:4200")
public class UserController extends AbstractController<UserDTO> {
    @Autowired
    UserService service;
    @PostMapping(value = "/login")
    public UserDTO login (@RequestBody LoginDTO loginDTO) {
        return service.login(loginDTO);
    }

    @GetMapping(value = "/findUserByEmail")
    public UserDTO findUserByEmail(@RequestParam String email) {
        return service.findUserByEmail(email);
    }

    @PostMapping(value = "/recuperaPassword")
    public UserDTO recuperaPassword(@RequestBody UserDTO user) {
        return service.recuperaPassword(user);
    }
}