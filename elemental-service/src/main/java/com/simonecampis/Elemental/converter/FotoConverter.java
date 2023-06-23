package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.FotoDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.model.Foto;
import com.simonecampis.Elemental.model.Post;
import org.springframework.stereotype.Component;

@Component
public class FotoConverter extends AbstractConverter<Foto, FotoDTO> {

    @Override
    public Foto toEntity(FotoDTO dto) {
        Foto f = null;
        if(dto != null) {
            f = new Foto(
                    dto.getIdFoto(),
                    dto.getUrl(),
                    dto.getUser()
            );
        }
        return f;
    }

    @Override
    public FotoDTO toDTO(Foto f) {
        FotoDTO dto = null;
        if(f != null) {
            dto = new FotoDTO(
                    f.getIdFoto(),
                    f.getUrl(),
                    f.getUser()
            );
        }
        return dto;
    }
}
