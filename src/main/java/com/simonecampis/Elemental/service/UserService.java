package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.UserConverter;
import com.simonecampis.Elemental.dao.UserRepo;
import com.simonecampis.Elemental.dto.LoginDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractService<User, UserDTO> {
    @Autowired
    UserConverter converter;

    @Autowired
    UserRepo repo;
    public UserDTO login(LoginDTO loginDTO) {
        return converter.toDTO(repo.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword()));
    }


}
