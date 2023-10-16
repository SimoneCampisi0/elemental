package com.simonecampis.ElementalChat.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

//@Entity
@Document(collection = "message")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    private String id;

    private String text;

    private Date date;

    //sender
    private Long idUser1;

    //receiver
    private Long idUser2;

    private String nomeChat;

}
