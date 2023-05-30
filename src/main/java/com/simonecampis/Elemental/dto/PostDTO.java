package com.simonecampis.Elemental.dto;

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
public class PostDTO {
    private Long idPost;

    private Date dataPost;

    private String contenuto;

    private String imgURL;

    private User user;
}
