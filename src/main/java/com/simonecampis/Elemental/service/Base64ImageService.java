package com.simonecampis.Elemental.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.Base64;

@Service
public class Base64ImageService {
    public void saveImageFromBase64(String base64Image, String outputPath) throws IOException, IOException {
        // Rimuovi l'intestazione "data:image/png;base64," dall'input Base64
        String base64ImageWithoutHeader = base64Image.replaceFirst("data:image/[^;]+;base64,", "");

        // Decodifica la stringa Base64 in un array di byte
        byte[] imageBytes = Base64.getDecoder().decode(base64ImageWithoutHeader);

        // Salva l'array di byte come file immagine utilizzando Files.write
        Files.write(Path.of(outputPath), imageBytes, StandardOpenOption.CREATE);


    }
}
