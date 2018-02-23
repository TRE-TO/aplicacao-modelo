package br.jus.treto.aplicacaomodelo.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import br.jus.treto.aplicacaomodelo.entity.Funcionario;
import br.jus.treto.aplicacaomodelo.entity.Unidade;

public interface FuncionarioRepository extends PagingAndSortingRepository<Funcionario, Long> {
	
	List<Funcionario> findByLotacao(Unidade unidade);

	Iterable<Funcionario> findByLotacaoSigla(String nomeUnidade);

	List<Funcionario> findByNomeContaining(String trechoNome, Pageable pageable);
	
	@Query("select f from Funcionario f where f.nome like %?1%")
	List<Funcionario> buscarPorNomeContendo(String trechoNome);
	
}
