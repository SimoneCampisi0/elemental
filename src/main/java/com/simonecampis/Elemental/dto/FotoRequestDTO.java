package com.simonecampis.Elemental.dto;

import com.simonecampis.Elemental.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FotoRequestDTO {
    private String image64;

    private UserDTO user;
}
