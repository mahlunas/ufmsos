package br.ufmsos.auth.application.usecase;

import br.ufmsos.auth.domain.model.Usuario;
import br.ufmsos.auth.domain.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

public class CadastrarUsuarioUseCase {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public CadastrarUsuarioUseCase(final UsuarioRepository repository, final PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario executar(final String nome, final String email, final String senha) {
        if (repository.existePorEmail(email)) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        final var senhaHash = passwordEncoder.encode(senha);
        final var novoUsuario = new Usuario(null, nome, email, senhaHash);
        return repository.salvar(novoUsuario);
    }
}
