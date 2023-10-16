package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.stream.Collectors;

@Service
public class LogService {
    private String token;

    private final ArrayList<UserDTO> loggedUsers = new ArrayList<>();
    public ArrayList<UserDTO> getLoggedUsers() {
        return loggedUsers;
    }


    public void addLoggedUser(UserDTO dto) {
        loggedUsers.add(dto);
    }

    public void logout(UserDTO dto) {
        loggedUsers.remove(dto);
    }

    public void saveCurrentJWT(String token) {
        this.token = token;
        System.out.println("token: "+token);
    }

    public String getCurrentJWT() { //TODO Context o map<IdToken, token>
        return token;
    }
}
