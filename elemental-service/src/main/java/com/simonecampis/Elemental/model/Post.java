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
public class Post {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idPost;

    private Long likes;

    private Date dataPost;

    private String contenuto;

    private String imgURL;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
