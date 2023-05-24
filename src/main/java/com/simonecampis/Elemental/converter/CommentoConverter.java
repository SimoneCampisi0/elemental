package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.CommentoDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.model.Commento;
import com.simonecampis.Elemental.model.Post;
import org.springframework.stereotype.Component;

@Component
public class CommentoConverter extends AbstractConverter<Commento, CommentoDTO> {
    @Override
    public Commento toEntity(CommentoDTO dto) {
        Commento c = null;
        if (dto != null) {
            c = new Commento(dto.getIdCommento(), dto.getDataCommento(), dto.getContenuto(), dto.getLikes(), dto.getImgURL(), dto.getUser(), dto.getPost());
        }
        return c;
    }

    @Override
    public CommentoDTO toDTO(Commento c) {
        CommentoDTO dto = null;
        if (c != null) {
            dto = new CommentoDTO(c.getIdCommento(), c.getDataCommento(), c.getContenuto(), c.getLikes(), c.getImgURL(), c.getUser(), c.getPost());
        }
        return dto;
    }
}
