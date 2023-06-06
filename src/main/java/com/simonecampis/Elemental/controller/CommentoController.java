package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.CommentoDTO;
import com.simonecampis.Elemental.dto.InterazioneDTO;
import com.simonecampis.Elemental.service.CommentoService;
import com.simonecampis.Elemental.service.InterazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commento")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentoController extends AbstractController<CommentoDTO> {
    @Autowired
    private CommentoService service;

    @GetMapping(value="getAllByPostIdPost")
    List<CommentoDTO> getAllByPostIdPost (@RequestParam Long idPost) {
        return service.getAllByPostIdPost(idPost);
    }

}
