package com.simonecampis.Elemental.dto;

import com.simonecampis.Elemental.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnagraficaDTO {
    private Long id;

    private String nome;

    private String cognome;

    private Date dataNascita;

    private String cittaResidenza;

    private User user;

}
