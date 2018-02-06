package br.jus.treto.aplicacaomodelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.jus.treto.aplicacaomodelo.entity.Unidade;
import br.jus.treto.aplicacaomodelo.repository.UnidadeRepository;

@RestController
public class UnidadeController {

	@Autowired
	private UnidadeRepository unidadeRepository;
	
	@GetMapping("/unidades")
	Iterable<Unidade> listarTodas() {
		return unidadeRepository.findAll();
	}
	
	@PostMapping("/unidades")
	void inserir(@RequestBody Unidade unidade) {
		unidadeRepository.save(unidade);
	}
}
