package com.simonecampis.ElementalChat.converter;

import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.model.Message;

public class MessageConverter extends AbstractConverter<Message, MessageDTO> {
    @Override
    public Message toEntity(MessageDTO dto) {
        Message m = null;
        if(dto != null) {
            m = new Message(dto.getId(),dto.getText(),dto.getDate(),dto.getType(), dto.getUser1(),dto.getUser2());
        }
        return m;
    }

    @Override
    public MessageDTO toDTO(Message m) {
        MessageDTO dto = null;
        if(m != null) {
            dto = new MessageDTO(m.getId(),m.getText(),m.getDate(),m.getType(), m.getUser1(),m.getUser2());
        }
        return dto;
    }
}
