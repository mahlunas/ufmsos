package br.ufmsos.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public org.springframework.web.cors.reactive.CorsWebFilter corsFilter() {
        org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
        config.setAllowCredentials(false);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new org.springframework.web.cors.reactive.CorsWebFilter(source);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-route", r -> r.path("/auth/**").uri("lb://AUTH-SERVICE"))
                .route("estudos-route", r -> r.path("/estudos/**").uri("lb://ESTUDOS-SERVICE"))
                .route("ia-route", r -> r.path("/ia/**").uri("lb://IA-SERVICE"))
                .route("financeiro-route", r -> r.path("/financeiro/**").uri("lb://FINANCEIRO-SERVICE"))
                .route("saude-route", r -> r.path("/saude/**").uri("lb://SAUDE-SERVICE"))
                .build();
    }
}
