package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.IterazioneDTO;
import com.simonecampis.Elemental.service.IterazioneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/iterazione")
@CrossOrigin(origins = "http://localhost:4200")
public class IterazioneController extends AbstractController<IterazioneDTO> {
    @Autowired
    private IterazioneService service;
    @GetMapping(value = "/findByIdUser")
    public IterazioneDTO findByIdUser(@RequestParam Long id) {
        return service.findByIdUser(id);
    }

    @GetMapping(value = "/setLike")
    public IterazioneDTO setLike(@RequestParam Long id) { return service.setLike(id); }

    @GetMapping(value = "/unsetLike")
    public IterazioneDTO unsetLike(@RequestParam Long id) { return service.unsetLike(id); }
}
