package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.AnagraficaDTO;

import com.simonecampis.Elemental.service.AnagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/anag")
//@CrossOrigin(origins = "http://localhost:4200")
public class AnagController extends AbstractController<AnagraficaDTO> {
    @Autowired
    AnagService service;

    @GetMapping(value = "findAnagByEmail")
    public AnagraficaDTO findAnagByEmail (@RequestParam String email) {
        return service.findAnagByEmail(email);
    }
}
