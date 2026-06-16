package br.ufmsos.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@SpringBootApplication
@EnableDiscoveryClient
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(false);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r.path("/auth/**", "/auth").uri("lb://AUTH-SERVICE"))
                .route("estudos-service", r -> r.path("/estudos/**", "/estudos").uri("lb://ESTUDOS-SERVICE"))
                .route("disciplinas-service", r -> r.path("/disciplinas/**", "/disciplinas").uri("lb://ESTUDOS-SERVICE"))
                .route("avaliacoes-service", r -> r.path("/avaliacoes/**", "/avaliacoes").uri("lb://ESTUDOS-SERVICE"))
                .route("revisoes-service", r -> r.path("/revisoes/**", "/revisoes").uri("lb://ESTUDOS-SERVICE"))
                .route("ia-service", r -> r.path("/ia/**", "/ia").uri("lb://IA-SERVICE"))
                .route("financeiro-service", r -> r.path("/financeiro/**", "/financeiro").uri("lb://FINANCEIRO-SERVICE"))
                .route("saude-service", r -> r.path("/saude/**", "/saude").uri("lb://SAUDE-SERVICE"))
                .route("rotina-service", r -> r.path("/rotina/**", "/rotina").uri("lb://ROTINA-SERVICE"))
                .build();
    }
}
