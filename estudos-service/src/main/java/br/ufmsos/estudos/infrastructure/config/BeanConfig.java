package br.ufmsos.estudos.infrastructure.config;

import br.ufmsos.estudos.application.usecase.*;
import br.ufmsos.estudos.domain.repository.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public CadastrarCursoUseCase cadastrarCursoUseCase(final CursoRepository cursoRepository) {
        return new CadastrarCursoUseCase(cursoRepository);
    }

    @Bean
    public CadastrarDisciplinaUseCase cadastrarDisciplinaUseCase(final DisciplinaRepository repository) {
        return new CadastrarDisciplinaUseCase(repository);
    }

    @Bean
    public RegistrarAvaliacaoUseCase registrarAvaliacaoUseCase(final AvaliacaoRepository repository) {
        return new RegistrarAvaliacaoUseCase(repository);
    }

    @Bean
    public LancarNotaUseCase lancarNotaUseCase(final AvaliacaoRepository repository) {
        return new LancarNotaUseCase(repository);
    }

    @Bean
    public AgendarRevisaoUseCase agendarRevisaoUseCase(final RevisaoRepository repository) {
        return new AgendarRevisaoUseCase(repository);
    }

    @Bean
    public ListarCursosUseCase listarCursosUseCase(final CursoRepository repository) {
        return new ListarCursosUseCase(repository);
    }

    @Bean
    public ListarDisciplinasUseCase listarDisciplinasUseCase(final DisciplinaRepository repository) {
        return new ListarDisciplinasUseCase(repository);
    }

    @Bean
    public ListarAvaliacoesUseCase listarAvaliacoesUseCase(final AvaliacaoRepository repository) {
        return new ListarAvaliacoesUseCase(repository);
    }
}
