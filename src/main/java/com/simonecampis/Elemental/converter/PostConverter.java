package com.simonecampis.Elemental.converter;

import com.simonecampis.Elemental.dto.AmiciziaDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.model.Amicizia;
import com.simonecampis.Elemental.model.Post;
import org.springframework.stereotype.Component;

@Component
public class PostConverter extends AbstractConverter<Post, PostDTO> {

    @Override
    public Post toEntity(PostDTO dto) {
        Post p = null;
        if (dto != null) {
            p = new Post(dto.getIdPost(), dto.getDataPost(), dto.getContenuto(), dto.getLikes(), dto.getImgURL(), dto.getUser());
        }
        return p;
    }

    @Override
    public PostDTO toDTO(Post p) {
        PostDTO dto = null;
        if (p != null) {
            dto = new PostDTO(p.getIdPost(), p.getDataPost(), p.getContenuto(), p.getLikes(), p.getImgURL(), p.getUser());
        }
        return dto;
    }
}
