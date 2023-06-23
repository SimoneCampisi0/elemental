package com.simonecampis.Elemental.dto;

import com.simonecampis.Elemental.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FotoDTO {

    private Long idFoto;

    private String url;

    private User user;
}
