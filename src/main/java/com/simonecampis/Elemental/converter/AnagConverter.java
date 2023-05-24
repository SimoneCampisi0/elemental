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
                    dto.getIdAnag(),
                    dto.getNome(),
                    dto.getCognome(),
                    dto.getEta(),
                    dto.getDataNascita(),
                    dto.getCittaResidenza(),
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
                    a.getIdAnag(),
                    a.getNome(),
                    a.getCognome(),
                    a.getEta(),
                    a.getDataNascita(),
                    a.getCittaResidenza(),
                    a.getUser()
            );
        }
        return dto;
    }
}
