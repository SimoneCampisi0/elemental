package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserConverter extends AbstractConverter<User, UserDTO> {
    @Override
    public User toEntity(UserDTO dto) {
        User user = null;
        if(dto != null) {
            user = new User(
                    dto.getId(),
                    dto.getUsername(),
                    dto.getEmail(),
                    dto.getPassword()
            );
        }
        return user;
    }

    @Override
    public UserDTO toDTO(User user) {
        UserDTO dto = null;
        if(user != null) {
            dto = new UserDTO(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPassword()
            );
        }
        return dto;
    }
}
