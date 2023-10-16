package com.simonecampis.ElementalChat.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

//@Entity
@Document(collection = "chat")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Chat {
    @Id
    private String idChat;

    private String nomeChat;
}
