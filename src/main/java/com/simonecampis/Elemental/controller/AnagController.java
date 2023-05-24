package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.AnagraficaDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/anag")
@CrossOrigin(origins = "http://localhost:4200")
public class AnagController extends AbstractController<AnagraficaDTO> {

}
