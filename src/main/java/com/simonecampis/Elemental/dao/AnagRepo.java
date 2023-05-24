package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.model.Anagrafica;
import com.simonecampis.Elemental.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface AnagRepo extends CrudRepository<Anagrafica, Long> {

}
