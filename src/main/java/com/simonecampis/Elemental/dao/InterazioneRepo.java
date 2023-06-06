package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.model.Interazione;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface InterazioneRepo extends CrudRepository<Interazione, Long> {

//    @Query("SELECT i FROM Iterazione i WHERE i.user.id = :id")
    Interazione findByUserIdAndPostIdPost(Long id, Long idPost);
}
