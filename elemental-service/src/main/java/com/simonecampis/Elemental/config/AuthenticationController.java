package com.simonecampis.Elemental.config;

import com.simonecampis.Elemental.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthService service;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity <AuthenticationResponse> register (@RequestBody RegisterRequest request) throws MessagingException {
        String to = request.getEmail();
        String subject = "Conferma registrazione";
//        String text = "<h2>Grazie per esserti registrato!</h2>";
//        emailService.inviaMailRegistrazioneConferma(to,subject, text);
        emailService.sendCustomMail(to,subject);
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity <AuthenticationResponse> authenticate (@RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }
}
