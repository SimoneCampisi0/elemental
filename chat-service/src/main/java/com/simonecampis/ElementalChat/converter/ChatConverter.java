package com.simonecampis.ElementalChat.converter;

import com.simonecampis.ElementalChat.dto.ChatDTO;
import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.Message;
import org.springframework.stereotype.Component;

@Component

public class ChatConverter extends AbstractConverter<Chat, ChatDTO> {

    @Override
    public Chat toEntity(ChatDTO dto) {
        Chat c = null;
        if(dto != null) {
            c = new Chat(dto.getIdChat(), dto.getNomeChat());
        }
        return c;
    }

    @Override
    public ChatDTO toDTO(Chat c) {
        ChatDTO dto = null;
        if(c != null) {
            dto = new ChatDTO(c.getIdChat(), c.getNomeChat());
        }
        return dto;
    }
}
