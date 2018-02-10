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

import br.jus.treto.aplicacaomodelo.entity.Funcionario;
import br.jus.treto.aplicacaomodelo.entity.Unidade;
import br.jus.treto.aplicacaomodelo.repository.FuncionarioRepository;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

	private final FuncionarioRepository funcionarioRepository;
	
	@Autowired
	public FuncionarioController(FuncionarioRepository ur) {
		super();
		this.funcionarioRepository = ur;
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
	
	@GetMapping("/porUnidade/{unidade}")
	Iterable<Funcionario> listarPorUnidade(@PathVariable Unidade unidade) {
		return funcionarioRepository.findByLotacao(unidade);
	}
}
