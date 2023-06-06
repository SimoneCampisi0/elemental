package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.dto.FotoDTO;
import com.simonecampis.Elemental.dto.FotoRequestDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.service.FotoService;
import com.simonecampis.Elemental.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/foto")
@CrossOrigin(origins = "http://localhost:4200")
public class FotoController extends AbstractController<FotoDTO> {
    @Autowired
    private FotoService service;

    @PostMapping(value="insertFoto")
    public FotoDTO insertFoto(@RequestBody FotoRequestDTO dto) throws IOException {
        return service.insertFoto(dto.getImage64(), dto.getUser());
    }

    @GetMapping(value="readFoto")
    public String readFoto(@RequestParam Long id) {
        return service.readFoto(id);
    }
}
