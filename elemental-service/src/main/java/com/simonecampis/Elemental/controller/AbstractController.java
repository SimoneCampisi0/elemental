package com.simonecampis.Elemental.controller;

import com.simonecampis.Elemental.service.ServiceDTO;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public abstract class AbstractController <DTO>{

    @Autowired
    private ServiceDTO<DTO> service;

    @GetMapping("/getAll")
    public Iterable<DTO> getAll(){
        return service.getAll();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        service.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("status: true");
    }

    @PutMapping("/update")
    public ResponseEntity<DTO> update(@RequestBody DTO dto){
        return ResponseEntity.status(HttpStatus.OK).body(service.update(dto));
    }

    @PostMapping("/insert")
    public ResponseEntity<DTO> insert (@RequestBody DTO dto) {
        return ResponseEntity.status(HttpStatus.OK).body(service.insert(dto));
    }

    @GetMapping("/read")
    public ResponseEntity<DTO> read(long id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.read(id));
    }
}