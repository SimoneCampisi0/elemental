package com.simonecampis.Elemental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commento {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idCommento;

    private Date dataCommento;

    private String contenuto;

    private Long likes;

    private String imgURL;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;


}
