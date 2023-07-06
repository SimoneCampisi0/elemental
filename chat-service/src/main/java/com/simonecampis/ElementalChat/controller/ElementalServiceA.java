package com.simonecampis.ElementalChat.controller;

import com.simonecampis.ElementalChat.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;

@FeignClient(name = "elemental-app", url = "/elemental")
public interface ElementalServiceA {
    @GetMapping(value = "/log/getLoggedUsers")
    ArrayList<UserDTO> getLoggedUsers();
}
