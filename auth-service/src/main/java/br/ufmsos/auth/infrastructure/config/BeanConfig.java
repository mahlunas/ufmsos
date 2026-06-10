package br.ufmsos.auth.infrastructure.config;

import br.ufmsos.auth.application.usecase.CadastrarUsuarioUseCase;
import br.ufmsos.auth.domain.repository.UsuarioRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class BeanConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CadastrarUsuarioUseCase cadastrarUsuarioUseCase(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        return new CadastrarUsuarioUseCase(repository, passwordEncoder);
    }

    @Bean
    public AutenticarUsuarioUseCase autenticarUsuarioUseCase(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        return new AutenticarUsuarioUseCase(repository, passwordEncoder);
    }
}
