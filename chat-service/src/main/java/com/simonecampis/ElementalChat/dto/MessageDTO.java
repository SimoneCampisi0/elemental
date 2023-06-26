package com.simonecampis.ElementalChat.dto;

import com.simonecampis.ElementalChat.model.MessageType;
import com.simonecampis.ElementalChat.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Long id;

    private String text;

    private Date date;

    private MessageType type;


    private User user1;

    private User user2;
}
