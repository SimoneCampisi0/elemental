package com.simonecampis.ElementalChat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ElementalChatApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElementalChatApplication.class, args);
	}

}
