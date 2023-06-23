package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.AmiciziaDTO;
import com.simonecampis.Elemental.dto.AnagraficaDTO;
import com.simonecampis.Elemental.model.Amicizia;
import com.simonecampis.Elemental.model.Anagrafica;
import org.springframework.stereotype.Component;

@Component
public class AmiciziaConverter extends AbstractConverter<Amicizia, AmiciziaDTO> {
    @Override
    public Amicizia toEntity(AmiciziaDTO dto) {
        Amicizia a = null;
        if (dto != null) {
            a = new Amicizia(dto.getIdAmicizia(), dto.getDataAmicizia(), dto.getUser1(), dto.getUser2());
        }
        return a;
    }

    @Override
    public AmiciziaDTO toDTO(Amicizia a) {
        AmiciziaDTO dto = null;
        if (a != null) {
            dto = new AmiciziaDTO(a.getIdAmicizia(), a.getDataAmicizia(), a.getUser1(), a.getUser2());
        }
        return dto;
    }
}
