package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.UserDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController extends AbstractController<UserDTO> {

    @RequestMapping(value = "/login")
    public UserDTO login () //realizzare LoginDTO
}
