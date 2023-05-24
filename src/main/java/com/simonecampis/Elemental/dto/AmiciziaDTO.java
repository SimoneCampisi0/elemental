package com.simonecampis.Elemental.dto;

import com.simonecampis.Elemental.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmiciziaDTO {
    private Long idAmicizia;

    private Date dataAmicizia;


    private User user1;

    private User user2;
}
