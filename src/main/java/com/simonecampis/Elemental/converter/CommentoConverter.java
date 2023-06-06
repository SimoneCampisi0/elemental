package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.CommentoDTO;
import com.simonecampis.Elemental.dto.InterazioneDTO;
import com.simonecampis.Elemental.model.Commento;
import com.simonecampis.Elemental.model.Interazione;
import org.springframework.stereotype.Component;

@Component
public class CommentoConverter extends AbstractConverter<Commento, CommentoDTO> {

    @Override
    public Commento toEntity(CommentoDTO dto) {
        Commento c = null;
        if(dto != null) {
            c = new Commento(
                    dto.getId(),
                    dto.getContenuto(),
                    dto.getDataCommento(),
                    dto.getUser(),
                    dto.getPost()
            );
        }
        return c;
    }

    @Override
    public CommentoDTO toDTO(Commento c) {
        CommentoDTO dto = null;
        if(c != null) {
            dto = new CommentoDTO(
                    c.getId(),
                    c.getContenuto(),
                    c.getDataCommento(),
                    c.getUser(),
                    c.getPost()
            );
        }
        return dto;
    }
}
