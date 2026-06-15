package br.ufmsos.rotina.infrastructure.adapter.in.web;

import br.ufmsos.rotina.domain.model.Habito;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/rotina")
public class RotinaController {
    @PostMapping
    public Habito criar(@RequestBody Habito habito) {
        return habito; // Placeholder para teste
    }
}
