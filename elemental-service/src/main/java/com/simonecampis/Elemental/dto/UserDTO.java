package com.simonecampis.Elemental.dto;

import com.simonecampis.Elemental.model.Role;
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
