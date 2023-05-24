package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.model.Amicizia;
import com.simonecampis.Elemental.model.Commento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface CommentoRepo extends CrudRepository<Commento, Long> {

}
