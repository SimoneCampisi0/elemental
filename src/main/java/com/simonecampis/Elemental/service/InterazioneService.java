package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.InterazioneConverter;
import com.simonecampis.Elemental.dao.InterazioneRepo;
import com.simonecampis.Elemental.dto.InterazioneDTO;
import com.simonecampis.Elemental.model.Interazione;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class InterazioneService extends AbstractService<Interazione, InterazioneDTO>  {
    @Autowired
    private InterazioneConverter converter;

    @Autowired
    private InterazioneRepo repo;
    public InterazioneDTO findByUserIdAndPostIdPost(Long id, Long idPost) {
        return converter.toDTO(repo.findByUserIdAndPostIdPost(id, idPost));
    }

    public InterazioneDTO setLike(Long id, Long idPost) {
        InterazioneDTO dto = converter.toDTO(repo.findByUserIdAndPostIdPost(id, idPost));
        dto.setLikes(1L);

        return converter.toDTO(repo.save(converter.toEntity(dto)));
    }

    public InterazioneDTO unsetLike(Long id, Long idPost) {
        InterazioneDTO dto = converter.toDTO(repo.findByUserIdAndPostIdPost(id, idPost));
        dto.setLikes(0L);

        return converter.toDTO(repo.save(converter.toEntity(dto)));
    }


}






