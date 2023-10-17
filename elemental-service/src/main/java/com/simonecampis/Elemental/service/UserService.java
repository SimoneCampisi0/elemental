package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.UserConverter;
import com.simonecampis.Elemental.dao.UserRepo;
import com.simonecampis.Elemental.dto.LoginDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractService<User, UserDTO> {
    @Autowired
    UserConverter converter;

    @Autowired
    UserRepo repo;

    @Autowired
    PasswordEncoder passwordEncoder;

    public UserDTO login(LoginDTO loginDTO) {
        UserDTO dto = converter.toDTO(repo.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword()));
        return dto;
    }

    public UserDTO findUserByEmail (String email) {
        return converter.toDTO(repo.findByEmail(email));
    }

    public UserDTO recuperaPassword (UserDTO user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return converter.toDTO(repo.save(converter.toEntity(user)));
    }
}
