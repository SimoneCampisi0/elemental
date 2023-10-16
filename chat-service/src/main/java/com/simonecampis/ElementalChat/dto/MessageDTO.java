package com.simonecampis.ElementalChat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private String id;

    private String text;

    private Date date;

    private Long idUser1;

    private Long idUser2;

    private String nomeChat;
}
