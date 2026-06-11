package br.ufmsos.auth.infrastructure.adapter.in.web;

import br.ufmsos.auth.application.usecase.AutenticarUsuarioUseCase;
import br.ufmsos.auth.application.usecase.CadastrarUsuarioUseCase;
import br.ufmsos.auth.domain.model.Usuario;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private final CadastrarUsuarioUseCase cadastrarUseCase;
    private final AutenticarUsuarioUseCase autenticarUseCase;
    private final br.ufmsos.auth.infrastructure.security.JwtService jwtService;

    public AuthController(
            final CadastrarUsuarioUseCase cadastrarUseCase,
            final AutenticarUsuarioUseCase autenticarUseCase,
            final br.ufmsos.auth.infrastructure.security.JwtService jwtService) {
        this.cadastrarUseCase = cadastrarUseCase;
        this.autenticarUseCase = autenticarUseCase;
        this.jwtService = jwtService;
    }

    @PostMapping("/registro")
    public ResponseEntity<UsuarioResponse> registrar(@RequestBody @Valid RegistroRequest request) {
        final var usuario = cadastrarUseCase.executar(request.nome(), request.email(), request.senha());
        return ResponseEntity.status(HttpStatus.CREATED).body(new UsuarioResponse(usuario.id().toString(), usuario.nome(), usuario.email()));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        return autenticarUseCase.executar(request.email(), request.senha())
                .map(usuario -> {
                    String token = jwtService.gerarToken(usuario);
                    return ResponseEntity.ok(new LoginResponse(token));
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    public record RegistroRequest(
        @NotBlank String nome,
        @Email String email,
        @NotBlank String senha
    ) {}

    public record LoginRequest(
        @Email @NotBlank String email,
        @NotBlank String senha
    ) {}

    public record LoginResponse(String token) {}

    public record UsuarioResponse(String id, String nome, String email) {}
}
