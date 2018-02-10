package br.jus.treto.aplicacaomodelo.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.jus.treto.aplicacaomodelo.entity.Unidade;

public interface UnidadeRepository extends PagingAndSortingRepository<Unidade, Long> {
	
	Iterable<Unidade> findBySigla(String sigla);
	
}
