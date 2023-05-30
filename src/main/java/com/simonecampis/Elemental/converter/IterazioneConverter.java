package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.IterazioneDTO;
import com.simonecampis.Elemental.model.Iterazione;
import org.springframework.stereotype.Component;

@Component
public class IterazioneConverter extends AbstractConverter<Iterazione, IterazioneDTO> {
    @Override
    public Iterazione toEntity(IterazioneDTO dto) {
        Iterazione c = null;
        if (dto != null) {
            c = new Iterazione(dto.getId(), dto.getLikes(), dto.getDataCommento(), dto.getContenuto(), dto.getImgURL(), dto.getUser(), dto.getPost());
        }
        return c;
    }

    @Override
    public IterazioneDTO toDTO(Iterazione c) {
        IterazioneDTO dto = null;
        if (c != null) {
            dto = new IterazioneDTO(c.getId(), c.getLikes(), c.getDataCommento(), c.getContenuto(), c.getImgURL(), c.getUser(), c.getPost());
        }
        return dto;
    }
}
