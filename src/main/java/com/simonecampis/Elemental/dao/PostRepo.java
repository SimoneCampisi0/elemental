package com.simonecampis.Elemental.dao;

import com.simonecampis.Elemental.model.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional

public interface PostRepo extends CrudRepository<Post, Long> {

}