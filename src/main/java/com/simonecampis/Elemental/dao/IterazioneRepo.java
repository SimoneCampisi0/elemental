package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.model.Iterazione;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface IterazioneRepo extends CrudRepository<Iterazione, Long> {

    @Query("SELECT i FROM Iterazione i WHERE i.user.id = :id")
    Iterazione findByIdUser(Long id);
}
