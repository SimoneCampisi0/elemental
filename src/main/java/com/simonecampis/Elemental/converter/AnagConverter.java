package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.AnagraficaDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.model.Anagrafica;
import com.simonecampis.Elemental.model.User;
import org.springframework.stereotype.Component;

@Component
public class AnagConverter extends AbstractConverter<Anagrafica, AnagraficaDTO> {

    @Override
    public Anagrafica toEntity(AnagraficaDTO dto) {
        Anagrafica a = null;
        if(dto != null) {
            a = new Anagrafica(
                    dto.getId(),
                    dto.getNome(),
                    dto.getCognome(),
                    dto.getDataNascita(),
                    dto.getCittaResidenza(),
                    dto.getDescrizione(),
                    dto.getUser()
            );
        }
        return a;
    }

    @Override
    public AnagraficaDTO toDTO(Anagrafica a) {
        AnagraficaDTO dto = null;
        if(a != null) {
            dto = new AnagraficaDTO(
                    a.getId(),
                    a.getNome(),
                    a.getCognome(),
                    a.getDataNascita(),
                    a.getCittaResidenza(),
                    a.getDescrizione(),
                    a.getUser()
            );
        }
        return dto;
    }
}
