package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface UserRepo extends CrudRepository<User, Long> {

    User findByEmailAndPassword(String email, String password);

}
