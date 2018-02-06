package br.jus.treto.aplicacaomodelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.jus.treto.aplicacaomodelo.entity.Unidade;
import br.jus.treto.aplicacaomodelo.repository.UnidadeRepository;

@RestController
@RequestMapping("/unidades")
public class UnidadeController {

	@Autowired
	private UnidadeRepository unidadeRepository;
	
	@GetMapping
	Iterable<Unidade> listarTodas() {
		return unidadeRepository.findAll();
	}
	
	@PostMapping
	void inserir(@RequestBody Unidade unidade) {
		unidadeRepository.save(unidade);
	}
}
