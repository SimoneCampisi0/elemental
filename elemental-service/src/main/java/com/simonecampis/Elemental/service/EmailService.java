package com.simonecampis.Elemental.service;

import com.simonecampis.Elemental.model.Email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine  templateEngine;

    public void sendCustomMail(String to, String subject) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        Context context = new Context();

        Email email = new Email();
        email.setTo(to);
        email.setFrom("simonecampisi2003@gmail.com");
        email.setSubject(subject);
        email.setTemplate("welcome-email.html");
        Map<String, Object> properties = new HashMap<>();
        properties.put("mail", to);
        email.setProperties(properties);


        context.setVariables(email.getProperties());
        helper.setFrom(email.getFrom());
        helper.setTo(email.getTo());
        helper.setSubject(email.getSubject());
        String html = templateEngine.process(email.getTemplate(), context);
        helper.setText(html, true);
        mailSender.send(message);
    }
    public void inviaMailRegistrazioneConferma(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
