package br.jus.treto.aplicacaomodelo;

import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.jus.treto.aplicacaomodelo.entity.Unidade;
import br.jus.treto.aplicacaomodelo.repository.UnidadeRepository;

@SpringBootApplication
public class ModeloApplication {

	public static void main(String[] args) {
		SpringApplication.run(ModeloApplication.class, args);
	}
	
	@Bean
	ApplicationRunner run(UnidadeRepository repo) {
		Stream<Unidade> unidades = Stream.of(
				new Unidade(null, "Seção de Sistemas Web", "SESAW"),
				new Unidade(null, "Seção de Sistemas Administrativos", "SEDSA"),
				new Unidade(null, "Coordenação de Sistemas", "CDS"));

		return args ->
				unidades
					.forEach(unidade -> repo.save(unidade));
	}
}
