package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.InterazioneDTO;
import com.simonecampis.Elemental.service.InterazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interazione")
@CrossOrigin(origins = "http://localhost:4200")
public class InterazioneController extends AbstractController<InterazioneDTO> {
    @Autowired
    private InterazioneService service;
    @GetMapping(value = "/findByUserIdAndPostIdPost")
    public InterazioneDTO findByUserIdAndPostIdPost(@RequestParam Long id, @RequestParam Long idPost) {return service.findByUserIdAndPostIdPost(id, idPost);}

    @GetMapping(value = "/setLike")
    public InterazioneDTO setLike(@RequestParam Long id, @RequestParam Long idPost) { return service.setLike(id, idPost); }

    @GetMapping(value = "/unsetLike")
    public InterazioneDTO unsetLike(@RequestParam Long id, @RequestParam Long idPost) { return service.unsetLike(id, idPost); }
}
