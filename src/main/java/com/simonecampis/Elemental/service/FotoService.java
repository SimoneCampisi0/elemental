package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.converter.FotoConverter;
import com.simonecampis.Elemental.converter.PostConverter;
import com.simonecampis.Elemental.dao.FotoRepo;
import com.simonecampis.Elemental.dao.PostRepo;
import com.simonecampis.Elemental.dto.FotoDTO;
import com.simonecampis.Elemental.dto.PostDTO;
import com.simonecampis.Elemental.dto.UserDTO;
import com.simonecampis.Elemental.model.Foto;
import com.simonecampis.Elemental.model.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class FotoService extends AbstractService<Foto, FotoDTO> {

    @Autowired
    private FotoConverter converter;

    @Autowired
    private FotoRepo repo;

    @Autowired Base64ImageService imageService;

    public FotoDTO insertFoto (String image64, UserDTO dto) throws IOException {
        try {
            String outputPath = "src/main/java/com/simonecampis/Elemental/assets/immagine.jpg";
            imageService.saveImageFromBase64(image64, outputPath);
        } catch (Exception e) {
            System.out.println("Exception: "+e);
        }
        return null;
    }
}
