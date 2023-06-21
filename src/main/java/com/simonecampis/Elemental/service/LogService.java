package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;

@Service
public class LogService {
    private ArrayList<UserDTO> loggedUsers = new ArrayList<>();
    public ArrayList<UserDTO> getLoggedUsers() {
        return loggedUsers;
    }

    public void addLoggedUser(UserDTO dto) {
        loggedUsers.add(dto);
    }

    public void logout(UserDTO dto) {
        loggedUsers.remove(dto);
    }
}
