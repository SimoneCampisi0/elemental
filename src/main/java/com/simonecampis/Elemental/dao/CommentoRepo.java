package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.model.Commento;
import com.simonecampis.Elemental.model.Interazione;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional

public interface CommentoRepo extends CrudRepository<Commento, Long> {

    List<Commento> getAllByPostIdPost (Long idPost);

}
