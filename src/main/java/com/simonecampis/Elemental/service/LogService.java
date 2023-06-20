package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.LinkedList;

@Service
public class LogService {
    private LinkedList<UserDTO> loggedUser;
    public LinkedList<UserDTO> getLoggedUser() {
        return loggedUser;
    }

    public void addLoggedUser(UserDTO dto) {
        loggedUser.add(dto);
    }

    public void removeLoggedUser(UserDTO dto) {
        loggedUser.remove(dto);
    }
}
