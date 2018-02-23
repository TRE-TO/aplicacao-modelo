package br.jus.treto.aplicacaomodelo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import br.jus.treto.aplicacaomodelo.entity.Funcionario;
import br.jus.treto.aplicacaomodelo.entity.Unidade;
import br.jus.treto.aplicacaomodelo.repository.FuncionarioRepository;
import br.jus.treto.aplicacaomodelo.service.FuncionarioService;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

	private final FuncionarioRepository funcionarioRepository;

	@Autowired
	private FuncionarioService funcionarioService;
	
	@Autowired
	public FuncionarioController(FuncionarioRepository ur) {
		super();
		this.funcionarioRepository = ur;
	}
	
	@GetMapping("/ola")
	String ola() {
		return "Olá, pessoas...";
	}
	
	@GetMapping
	Iterable<Funcionario> listarTodas() {
		return funcionarioRepository.findAll();
	}
	
	@PostMapping
	void inserir(@RequestBody Funcionario funcionario) {
		funcionarioRepository.save(funcionario);
	}

	@PutMapping
	@ResponseStatus(HttpStatus.OK)
	void alterar(@RequestBody @Valid Funcionario funcionario) {
		funcionarioRepository.save(funcionario);
	}
	
	@DeleteMapping
	void excluir(Long id) {
		funcionarioRepository.delete(id);
	}

	@GetMapping("/{id}")
	Funcionario get(@PathVariable Long id) {
		return funcionarioRepository.findOne(id);
	}
	
	@GetMapping("/ordenado/{campo}")
	Iterable<Funcionario> listarOrdenado(@PathVariable String campo) {
		return funcionarioRepository.findAll(new Sort(campo));
	}
	
	@GetMapping("/paginado/{page}/{size}")
	Iterable<Funcionario> listarPaginado(@PathVariable Integer page, @PathVariable Integer size) {
		return funcionarioRepository.findAll(new PageRequest(page, size, new Sort("nome")));
	}
	
	@GetMapping("/porUnidade/{unidade}")
	Iterable<Funcionario> listarPorUnidade(@PathVariable Unidade unidade) {
		return funcionarioRepository.findByLotacao(unidade);
	}

	@GetMapping("/porSiglaUnidade/{siglaUnidade}")
	Iterable<Funcionario> listarPorNomeUnidade(@PathVariable String siglaUnidade) {
		return funcionarioRepository.findByLotacaoSigla(siglaUnidade);
	}
	
	@GetMapping("/porTrechoNome/{trechoNome}/{page}/{size}")
	Iterable<Funcionario> listarPorNome(@PathVariable String trechoNome, Pageable pageable) {
		return funcionarioRepository.findByNomeContaining(trechoNome, pageable);
	}
	
//	@GetMapping("/porTrechoNome/{trechoNome}")
//	Iterable<Funcionario> listarPorTrechoNome(@PathVariable String trechoNome) {
//		return funcionarioRepository.findByNomeContaining(trechoNome);
//	}

	@GetMapping("/porTrechoNomeHQL/{trechoNome}")
	Iterable<Funcionario> listarPorTrechoNomeHQL(@PathVariable String trechoNome) {
		return funcionarioRepository.buscarPorNomeContendo(trechoNome);
	}
	
	@GetMapping("/negocio")
	String getMetodoDeNegocio() {
		return funcionarioService.metodoDeNegocio();
	}
}
