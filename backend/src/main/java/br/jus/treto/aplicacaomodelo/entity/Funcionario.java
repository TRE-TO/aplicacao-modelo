package br.jus.treto.aplicacaomodelo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Funcionario {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@NotNull
	private String nome;
	
	@NotNull
	private String email;
	
	@JsonIgnoreProperties("funcionarios")
	@ManyToOne
	@JoinColumn(name="id_unidade")
	private Unidade lotacao;

}
