package com.simonecampis.Elemental.dto;

import com.simonecampis.Elemental.model.Post;
import com.simonecampis.Elemental.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentoDTO {

    private Long id;

    private String nomeAutore;

    private String contenuto;

    private Date dataCommento;

    private User user;

    private Post post;

}
