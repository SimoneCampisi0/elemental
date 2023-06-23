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
public class Foto {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idFoto;

    private String url;

    @OneToOne
    @JoinColumn(name = "userId")
    private User user;
}
