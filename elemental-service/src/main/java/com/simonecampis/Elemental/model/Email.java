package com.simonecampis.Elemental.model;

import lombok.Data;

import java.util.Map;
import java.util.Objects;

@Data
public class Email {
    String to;

    String from;

    String subject;

    String text;

    String template;

    Map<String, Object> properties;
}
