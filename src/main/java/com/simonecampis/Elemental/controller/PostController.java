package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.AmiciziaDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController extends AbstractController<PostDTO> {
    @Autowired
    private PostService service;

//    @GetMapping(value = "setLike")
//    public PostDTO setLike(@RequestParam Long idPost) {
//        return service.setLike(idPost);
//    }
}
