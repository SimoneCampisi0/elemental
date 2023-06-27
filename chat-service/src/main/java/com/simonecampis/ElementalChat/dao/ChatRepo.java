package com.simonecampis.ElementalChat.dao;

import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface ChatRepo extends CrudRepository<Chat, Long> {
    Chat findByNomeChat (String nomeChat);

}
