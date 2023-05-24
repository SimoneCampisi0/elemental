package com.simonecampis.Elemental.dto;

import com.simonecampis.Elemental.model.Post;
import com.simonecampis.Elemental.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentoDTO {

    private Long idCommento;

    private Date dataCommento;

    private String contenuto;

    private Long likes;

    private String imgURL;

    private User user;

    private Post post;

}
