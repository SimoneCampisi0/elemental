package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.IterazioneDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/iterazione")
@CrossOrigin(origins = "http://localhost:4200")
public class IterazioneController extends AbstractController<IterazioneDTO> {

}
