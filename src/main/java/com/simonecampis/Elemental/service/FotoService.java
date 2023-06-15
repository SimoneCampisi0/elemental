package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.FotoConverter;
import com.simonecampis.Elemental.converter.PostConverter;
import com.simonecampis.Elemental.converter.UserConverter;
import com.simonecampis.Elemental.dao.FotoRepo;
import com.simonecampis.Elemental.dao.PostRepo;
import com.simonecampis.Elemental.dto.FotoDTO;
import com.simonecampis.Elemental.dto.FotoRequestDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.model.Foto;
import com.simonecampis.Elemental.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;

@Service
public class FotoService extends AbstractService<Foto, FotoDTO> {

    @Autowired
    private FotoConverter converter;

    @Autowired
    private UserConverter userConverter;


    @Autowired
    private FotoRepo repo;

    @Autowired Base64ImageService imageService;

    private FotoDTO fotoDTO;

    public FotoDTO insertFoto(String image64, UserDTO dto) throws IOException {
        try {
            String outputPath = "src/main/java/com/simonecampis/Elemental/assets/";
            int count = 1;
            String filename = count + ".jpg";
            File outputFile = new File(outputPath + filename);

            // Verifica l'esistenza di file con nomi incrementali
            while (outputFile.exists()) {
                count++;
                filename = count + ".jpg";
                outputFile = new File(outputPath + filename);
            }

            imageService.saveImageFromBase64(image64, outputPath + filename);

            fotoDTO = new FotoDTO(0L, outputFile.getPath(), userConverter.toEntity(dto));
            this.insert(fotoDTO);

        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }
        return fotoDTO;
    }

    public FotoDTO uploadFoto(FotoRequestDTO dto) throws IOException {
        UserDTO userDTO = dto.getUser();
        if (repo.findFotoByUserId(userDTO.getId()) != null) {
            this.delete(repo.findFotoByUserId(userDTO.getId()).getIdFoto());
            FotoDTO fotoDTO1 = insertFoto(dto.getImage64(), dto.getUser());
            return fotoDTO1;
        }
        return null;
    }

    public String readFoto (Long id) {
        FotoDTO dto = converter.toDTO(repo.findFotoByUserId(id));
        String base64Image;
        try {
            File imageFile = new File(dto.getUrl());
            byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
            base64Image = Base64.getEncoder().encodeToString(imageBytes);
            return base64Image;
        } catch (Exception e) {
            System.out.println("Exception: " + e);
            return null;
        }
    }
}
