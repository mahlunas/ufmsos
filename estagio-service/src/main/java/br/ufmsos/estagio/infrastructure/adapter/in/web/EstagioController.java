package br.ufmsos.estagio.infrastructure.adapter.in.web;

import br.ufmsos.estagio.application.usecase.ProjetarRecessoUseCase;
import br.ufmsos.estagio.application.usecase.RegistrarContratoEstagioUseCase;
import br.ufmsos.estagio.application.usecase.VerificarProtecaoAvaliacaoUseCase;
import br.ufmsos.estagio.domain.model.ContratoEstagio;
import br.ufmsos.estagio.domain.model.ProjecaoRecesso;
import br.ufmsos.estagio.domain.repository.ContratoEstagioRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/estagios")
public class EstagioController {

    private final RegistrarContratoEstagioUseCase registrarUseCase;
    private final ProjetarRecessoUseCase recessoUseCase;
    private final VerificarProtecaoAvaliacaoUseCase protecaoUseCase;
    private final ContratoEstagioRepository repository;

    public EstagioController(
            RegistrarContratoEstagioUseCase registrarUseCase,
            ProjetarRecessoUseCase recessoUseCase,
            VerificarProtecaoAvaliacaoUseCase protecaoUseCase,
            ContratoEstagioRepository repository) {
        this.registrarUseCase = registrarUseCase;
        this.recessoUseCase = recessoUseCase;
        this.protecaoUseCase = protecaoUseCase;
        this.repository = repository;
    }

    @PostMapping("/contratos")
    public ResponseEntity<ContratoEstagio> registrar(@RequestBody @Valid ContratoEstagio contrato) {
        return ResponseEntity.status(HttpStatus.CREATED).body(registrarUseCase.executar(contrato));
    }

    @GetMapping("/contratos/{id}/recesso")
    public ResponseEntity<ProjecaoRecesso> projetarRecesso(@PathVariable UUID id) {
        return repository.buscarPorId(id)
                .map(contrato -> ResponseEntity.ok(recessoUseCase.executar(contrato)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/contratos/{id}/protecao")
    public ResponseEntity<Integer> verificarCargaHoraria(@PathVariable UUID id, @RequestParam boolean isSemanaDeProvas) {
        return repository.buscarPorId(id)
                .map(contrato -> {
                    if (protecaoUseCase.deveReduzirCarga(isSemanaDeProvas)) {
                        return ResponseEntity.ok(protecaoUseCase.calcularCargaReduzida(contrato));
                    }
                    return ResponseEntity.ok(contrato.cargaHorariaSemanal());
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
