package br.jus.treto.aplicacaomodelo.repository;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.jus.treto.aplicacaomodelo.entity.Funcionario;
import br.jus.treto.aplicacaomodelo.entity.Unidade;

public interface FuncionarioRepository extends PagingAndSortingRepository<Funcionario, Long> {
	
	List<Funcionario> findByLotacao(Unidade unidade);
}
