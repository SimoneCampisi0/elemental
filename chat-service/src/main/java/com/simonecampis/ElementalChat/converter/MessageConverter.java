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
            m = Message.builder()
                    .id(dto.getId())
                    .nomeChat(dto.getNomeChat())
                    .date(dto.getDate())
                    .idUser1(dto.getIdUser1())
                    .idUser2(dto.getIdUser2())
                    .text(dto.getText())
                    .build();
        }
        return m;
    }

    @Override
    public MessageDTO toDTO(Message m) {
        MessageDTO dto = null;
        if(m != null) {
            dto = MessageDTO.builder()
                    .id(m.getId())
                    .nomeChat(m.getNomeChat())
                    .date(m.getDate())
                    .idUser1(m.getIdUser1())
                    .idUser2(m.getIdUser2())
                    .text(m.getText())
                    .build();
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
