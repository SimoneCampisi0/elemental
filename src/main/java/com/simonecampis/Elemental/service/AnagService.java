package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.dao.AnagRepo;
import com.simonecampis.Elemental.dto.AnagraficaDTO;
import com.simonecampis.Elemental.model.Anagrafica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnagService extends AbstractService<Anagrafica, AnagraficaDTO> {
    @Autowired
    AnagRepo repo;
    public AnagraficaDTO findAnagByEmail(String email) {
        return converter.toDTO(repo.findAnagByEmail(email));
    }

}
