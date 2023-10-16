package com.simonecampis.ElementalChat.dao;

import com.simonecampis.ElementalChat.model.Chat;
import com.simonecampis.ElementalChat.model.Message;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface MessageRepo extends MongoRepository<Message, String> {
    List<Message> findAllByNomeChat(String nomeChat);

//    @Query("SELECT m FROM Message m WHERE m.chat.idChat = :idChat ORDER BY m.date DESC")
//    Page<Message> findByChatOrderByData(Long IdChat, Pageable pageable);

//    Page<Message> findByChat_IdChatOrderByDateAsc(Long IdChat, Pageable pageable);

    Page<Message> findByNomeChatOrderByDateAsc(String nomeChat, Pageable pageable);
}
