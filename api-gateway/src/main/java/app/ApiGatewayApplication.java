package app;

import com.google.common.net.HttpHeaders;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

//@CrossOrigin(origins = "http://localhost:4200")
@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

//    @Bean
//    public GlobalFilter corsFilter() {
//        System.out.println("configuro il cors...");
//        return (exchange, chain) -> {
//            exchange.getResponse()
//                    .getHeaders()
//                    .add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:4200");
//            exchange.getResponse()
//                    .getHeaders()
//                    .add(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, DELETE, HEAD, OPTIONS");
//            exchange.getResponse()
//                    .getHeaders()
//                    .add(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "authorization, content-type, x-auth-token, access-control-allow-origin");
//            exchange.getResponse()
//                    .getHeaders()
//                    .add(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
//
//            return chain.filter(exchange);
//        };
//    }
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        //Non funziona. Forse va in conflitto con il CORS del SecurityConfiguration.
//        System.out.println("configurazione del cors...");
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token", "access-control-allow-origin"));
//        configuration.setAllowCredentials(true);
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}
