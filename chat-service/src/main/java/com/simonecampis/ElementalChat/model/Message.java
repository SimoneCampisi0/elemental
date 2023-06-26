package com.simonecampis.ElementalChat.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private Date date;


    @ManyToOne
    @JoinColumn(name = "user1") //sender
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2") //receiver
    private User user2;

    @ManyToOne
    @JoinColumn(name = "chat") //receiver
    private Chat chat;

}
