package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.CommentoConverter;
import com.simonecampis.Elemental.converter.InterazioneConverter;
import com.simonecampis.Elemental.dao.CommentoRepo;
import com.simonecampis.Elemental.dao.InterazioneRepo;
import com.simonecampis.Elemental.dto.CommentoDTO;
import com.simonecampis.Elemental.dto.InterazioneDTO;
import com.simonecampis.Elemental.model.Commento;
import com.simonecampis.Elemental.model.Interazione;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentoService extends AbstractService<Commento, CommentoDTO>  {
    @Autowired
    private CommentoConverter converter;

    @Autowired
    private CommentoRepo repo;

    public List<CommentoDTO> getAllByPostIdPost (Long idPost) {
        return converter.toDTOList(repo.getAllByPostIdPost(idPost));
    }
}






