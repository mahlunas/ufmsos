package br.ufmsos.curriculo.infrastructure.adapter.in.web;

import br.ufmsos.curriculo.application.usecase.GerarCurriculoUseCase;
import br.ufmsos.curriculo.domain.model.Curriculo;
import br.ufmsos.curriculo.domain.repository.CurriculoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/curriculo")
public class CurriculoController {

    private final GerarCurriculoUseCase gerarCurriculoUseCase;
    private final CurriculoRepository repository;

    public CurriculoController(GerarCurriculoUseCase gerarCurriculoUseCase, CurriculoRepository repository) {
        this.gerarCurriculoUseCase = gerarCurriculoUseCase;
        this.repository = repository;
    }

    @PostMapping("/gerar")
    public ResponseEntity<String> solicitarGeracao(@RequestBody Curriculo curriculo) {
        gerarCurriculoUseCase.solicitarGeracao(curriculo);
        return ResponseEntity.accepted().body("Geração de currículo iniciada. Você receberá um alerta quando estiver pronto.");
    }

    @GetMapping("/{estudanteId}")
    public ResponseEntity<Curriculo> obterCurriculo(@PathVariable UUID estudanteId) {
        return repository.buscarPorEstudante(estudanteId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
