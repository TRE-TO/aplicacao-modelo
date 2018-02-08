package br.jus.treto.aplicacaomodelo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.jus.treto.aplicacaomodelo.entity.Unidade;
import br.jus.treto.aplicacaomodelo.repository.UnidadeRepository;

@RestController
@RequestMapping("/unidades")
public class UnidadeController {

	private final UnidadeRepository unidadeRepository;
	
	@Autowired
	public UnidadeController(UnidadeRepository ur) {
		super();
		this.unidadeRepository = ur;
	}
	
	@GetMapping
	Iterable<Unidade> listarTodas() {
		return unidadeRepository.findAll();
	}
	
	@PostMapping
	void inserir(@RequestBody Unidade unidade) {
		unidadeRepository.save(unidade);
	}

	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	void alterar(@RequestBody @Valid Unidade unidade) {
		unidadeRepository.save(unidade);
	}
	
	@DeleteMapping
	void excluir(Long id) {
		unidadeRepository.delete(id);
	}

	@GetMapping("/{id}")
	Unidade get(@PathVariable Long id) {
		return unidadeRepository.findOne(id);
	}
	
	@GetMapping("/ordenado/{campo}")
	Iterable<Unidade> listarOrdenado(@PathVariable String campo) {
		return unidadeRepository.findAll(new Sort(campo));
	}
}
