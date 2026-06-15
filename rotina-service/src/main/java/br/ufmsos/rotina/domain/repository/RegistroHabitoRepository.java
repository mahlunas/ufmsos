package br.ufmsos.rotina.domain.repository;

import br.ufmsos.rotina.domain.model.RegistroHabito;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface RegistroHabitoRepository {
    RegistroHabito salvar(RegistroHabito registro);
    List<RegistroHabito> listarPorHabitoEData(UUID habitoId, LocalDate data);
}
