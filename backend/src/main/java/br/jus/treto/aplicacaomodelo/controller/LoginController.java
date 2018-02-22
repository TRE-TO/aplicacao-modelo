package br.jus.treto.aplicacaomodelo.controller;

import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	
	@RequestMapping("preauth")
	@ResponseStatus(code=HttpStatus.OK)
	public void preauth() {
	}
	
	@GetMapping("/usuario")
	public String getUsuario() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return auth.getName() 
				+ ", " + ((User) auth.getPrincipal()).getName()
				+ ", " + auth.getAuthorities().stream()
					.map(Object::toString)
					.collect(Collectors.joining(","));
	}
}