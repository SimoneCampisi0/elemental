package com.simonecampis.ElementalChat.dao;

import com.simonecampis.ElementalChat.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface UserRepo extends MongoRepository<User, String> {

}
