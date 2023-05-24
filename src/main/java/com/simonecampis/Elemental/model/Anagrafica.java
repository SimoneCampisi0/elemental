package com.simonecampis.Elemental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Anagrafica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAnag;

    private String nome;

    private String cognome;

    private Long eta;

    private Date dataNascita;

    private String cittaResidenza;

    @OneToOne
    @JoinColumn(name="userId", nullable = true)
    private User user;

}
