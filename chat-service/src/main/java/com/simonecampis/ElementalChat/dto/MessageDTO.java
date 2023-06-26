package com.simonecampis.ElementalChat.dto;

import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Long id;

    private String text;

    private Date date;

    private User user1;

    private User user2;

    private Chat chat;
}
