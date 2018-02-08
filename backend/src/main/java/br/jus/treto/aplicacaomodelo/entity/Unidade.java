package br.jus.treto.aplicacaomodelo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Unidade {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@NotNull
//	@Column(nullable=false)
	private String nome;
	
	@NotNull
	private String sigla;

}
