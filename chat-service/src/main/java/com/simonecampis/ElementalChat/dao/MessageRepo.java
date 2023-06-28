package com.simonecampis.ElementalChat.dao;

import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.Message;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface MessageRepo extends CrudRepository<Message, Long> {
    List<Message> findByChat(Chat chat);

    Page<Message> findByChat_IdChat(Long IdChat, Pageable pageable);

}
