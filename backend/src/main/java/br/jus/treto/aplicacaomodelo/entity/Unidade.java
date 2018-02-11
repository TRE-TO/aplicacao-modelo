package br.jus.treto.aplicacaomodelo.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="UNIDADES_TSE")
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
	
	@JsonIgnoreProperties("lotacao")
	@OneToMany(mappedBy="lotacao", fetch=FetchType.LAZY)
	private List<Funcionario> funcionarios;

	public Unidade(Long id, String nome, String sigla) {
		super();
		this.id = id;
		this.nome = nome;
		this.sigla = sigla;
	}
	
}
