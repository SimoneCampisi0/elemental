package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.IterazioneConverter;
import com.simonecampis.Elemental.dao.IterazioneRepo;
import com.simonecampis.Elemental.dto.IterazioneDTO;
import com.simonecampis.Elemental.model.Iterazione;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class IterazioneService extends AbstractService<Iterazione, IterazioneDTO>  {
    @Autowired
    private IterazioneConverter converter;

    @Autowired
    private IterazioneRepo repo;
    public IterazioneDTO findByIdUser(Long id) {
        return converter.toDTO(repo.findByIdUser(id));
    }

}






