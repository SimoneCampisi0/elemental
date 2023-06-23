package com.simonecampis.ElementalChat.controller;

import com.simonecampis.ElementalChat.service.ServiceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

public abstract class AbstractController<DTO>{


    private ServiceDTO<DTO> service;

    @GetMapping("/getAll")
    public Iterable<DTO> getAll(){
        return service.getAll();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id") long id) {
        service.delete(id);
    }

    @PutMapping("/update")
    public DTO update(@RequestBody DTO dto){
        service.update(dto);
        return dto;
    }

    @PostMapping("/insert")
    public DTO insert (@RequestBody DTO dto) {
        service.insert(dto);
        return dto;
    }

    @GetMapping("/read")
    public DTO read(long id) {
        return service.read(id);
    }
}