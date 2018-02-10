package br.jus.treto.aplicacaomodelo;

import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.jus.treto.aplicacaomodelo.entity.Funcionario;
import br.jus.treto.aplicacaomodelo.entity.Unidade;
import br.jus.treto.aplicacaomodelo.repository.FuncionarioRepository;
import br.jus.treto.aplicacaomodelo.repository.UnidadeRepository;

@SpringBootApplication
public class ModeloApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModeloApplication.class, args);
	}
	
	@Bean
	ApplicationRunner run(UnidadeRepository unidadeRepo, FuncionarioRepository funcionarioRepo) {
		Unidade sesaw = new Unidade(null, "Seção de Sistemas Web", "SESAW");
		Unidade sedsa = new Unidade(null, "Seção de Sistemas Administrativos", "SEDSA");
		Unidade cds = new Unidade(null, "Coordenação de Sistemas", "CDS");
		
		Stream<Unidade> unidades = Stream.of(
				sesaw,
				sedsa,
				cds);
		
		Stream<Funcionario> funcionarios = Stream.of(
				new Funcionario(null, "Michael", "michael@tre-to.jus.br", sesaw),
				new Funcionario(null, "Alexandre", "alexandre.oliveira@tre-to.jus.br", sesaw),
				new Funcionario(null, "Felipe", "felipe.oliveira@tre-to.jus.br", sesaw),
				new Funcionario(null, "Mariana", "mariana.soares@tre-to.jus.br", sesaw),
				new Funcionario(null, "Franck", "franck.costa@tre-to.jus.br", sesaw),
				new Funcionario(null, "Kayque", "kayque@tre-to.jus.br", sesaw),
				new Funcionario(null, "Josué", "jpires@tre-to.jus.br", sedsa),
				new Funcionario(null, "Francisco", "fmourafe@tre-to.jus.br", sedsa),
				new Funcionario(null, "Vilnei", "vilnei@tre-to.jus.br", sedsa),
				new Funcionario(null, "Jhonathan", "jhonathan@tre-to.jus.br", sedsa),
				new Funcionario(null, "Robson", "robson@tre-to.jus.br", sedsa),
				new Funcionario(null, "Alysson", "abruno@tre-to.jus.br", cds),
				new Funcionario(null, "Robson Aristóteles", "robson.aristoteles@tre-to.jus.br", cds));
		
		return args -> {
				unidades.forEach(unidade -> unidadeRepo.save(unidade));
				funcionarios.forEach(funcionarioRepo::save);
		};
	}
}
