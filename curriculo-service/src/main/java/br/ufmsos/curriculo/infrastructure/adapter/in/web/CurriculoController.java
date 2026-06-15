package br.ufmsos.curriculo.infrastructure.adapter.in.web;

import br.ufmsos.curriculo.domain.model.Curriculo;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/curriculo")
public class CurriculoController {
    @PostMapping
    public Curriculo gerar(@RequestBody Curriculo curriculo) {
        return curriculo;
    }
}
