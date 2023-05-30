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
public class IterazioneDTO {

    private Long id;

    private Long likes;

    private Date dataCommento;

    private String contenuto;

    private String imgURL;

    private User user;

    private Post post;

}
