package com.simonecampis.ElementalChat.converter;

import com.simonecampis.ElementalChat.dto.MessageDTO;
import com.simonecampis.ElementalChat.model.Message;
import jakarta.persistence.Converter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MessageConverter extends AbstractConverter<Message, MessageDTO> {
    @Override
    public Message toEntity(MessageDTO dto) {
        Message m = null;
        if(dto != null) {
            m = new Message(dto.getId(),dto.getText(),dto.getDate(), dto.getUser1(),dto.getUser2(), dto.getChat());
        }
        return m;
    }

    @Override
    public MessageDTO toDTO(Message m) {
        MessageDTO dto = null;
        if(m != null) {
            dto = new MessageDTO(m.getId(),m.getText(),m.getDate(),m.getUser1(),m.getUser2(), m.getChat());
        }
        return dto;
    }

    public Page<MessageDTO> toDTOPages (Page<Message> messages) {
        List<MessageDTO> messageDTOS = null;
        if(messages != null) {
           messageDTOS = messages.stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList());
        }
       return new PageImpl<>(messageDTOS, messages.getPageable(), messages.getTotalElements());

    }
}
