package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.AmiciziaDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController extends AbstractController<PostDTO> {

}
