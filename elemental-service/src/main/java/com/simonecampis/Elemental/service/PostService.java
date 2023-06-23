package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.PostConverter;
import com.simonecampis.Elemental.dao.PostRepo;
import com.simonecampis.Elemental.dto.AnagraficaDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.model.Anagrafica;
import com.simonecampis.Elemental.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Objects;

@Service
public class PostService extends AbstractService<Post, PostDTO> {

    @Autowired
    private PostConverter converter;

    @Autowired
    private PostRepo repo;
    public PostDTO addLike(Long idPost) {
        PostDTO post =  converter.toDTO(repo.findById(idPost).get());
        Long likes = post.getLikes() + 1;
        post.setLikes(likes);
        return converter.toDTO(repo.save(converter.toEntity(post)));
    }

    public PostDTO removeLike(Long idPost) {
        PostDTO post =  converter.toDTO(repo.findById(idPost).get());
        Long likes;
        if(post.getLikes()>=1) {
           likes = post.getLikes() - 1;
            post.setLikes(likes);
        }
        return converter.toDTO(repo.save(converter.toEntity(post)));
    }

    public Boolean checkPostInsertByCurrentUser(Long idPost, Long id) {
        PostDTO p = converter.toDTO(repo.checkPostInsertByCurrentUser(idPost, id));
        if(p != null) {
            return true;
        }
        else {
            return false;
        }
    }

    public Integer calcoloNumeroPostByUser(Long id) {
        List<PostDTO> postDTOList = converter.toDTOList(repo.findAll());
        return (int) postDTOList.stream()
                .filter(x -> Objects.equals(x.getUser().getId(), id))
                .count();
    }
}
