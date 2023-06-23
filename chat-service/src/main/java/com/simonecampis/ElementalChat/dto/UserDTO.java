package com.simonecampis.ElementalChat.dto;

import com.simonecampis.ElementalChat.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    private String username;

    private String email;

    private String password;

    private Role role;
}
