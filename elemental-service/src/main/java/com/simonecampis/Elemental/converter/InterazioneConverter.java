package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.InterazioneDTO;
import com.simonecampis.Elemental.model.Interazione;
import org.springframework.stereotype.Component;

@Component
public class InterazioneConverter extends AbstractConverter<Interazione, InterazioneDTO> {
    @Override
    public Interazione toEntity(InterazioneDTO dto) {
        Interazione c = null;
        if (dto != null) {
            c = new Interazione(dto.getId(), dto.getLikes(), dto.getUser(), dto.getPost());
        }
        return c;
    }

    @Override
    public InterazioneDTO toDTO(Interazione c) {
        InterazioneDTO dto = null;
        if (c != null) {
            dto = new InterazioneDTO(c.getId(), c.getLikes(), c.getUser(), c.getPost());
        }
        return dto;
    }
}
