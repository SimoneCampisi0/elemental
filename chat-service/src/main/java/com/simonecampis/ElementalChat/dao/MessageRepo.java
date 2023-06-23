package com.simonecampis.ElementalChat.dao;

import com.simonecampis.ElementalChat.model.Message;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface MessageRepo extends CrudRepository<Message, Long> {
}
