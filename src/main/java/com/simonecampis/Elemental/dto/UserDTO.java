package com.simonecampis.Elemental.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long idUser;

    private String username;

    private String email;

    private String password;
}
