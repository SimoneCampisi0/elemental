package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.model.Foto;
import com.simonecampis.Elemental.model.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface FotoRepo extends CrudRepository<Foto, Long> {
    Foto findFotoByUserId (Long id);
}