package com.simonecampis.Elemental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Amicizia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAmicizia;

    private Date dataAmicizia;

    @ManyToOne
    @JoinColumn(name="userId1", nullable = false)
    private User user1;

    @ManyToOne
    @JoinColumn(name="userId2", nullable = false)
    private User user2;
}
