package br.jus.treto.aplicacaomodelo.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.stereotype.Component;

@Configuration
@EnableWebSecurity
public class Seguranca extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private BootifulAuthenticationSuccessHandler authenticationSuccessHandler;
	
	@Bean
	public BootifulAuthenticationSuccessHandler mySuccessHandler() {
		return new BootifulAuthenticationSuccessHandler();
	}
	
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
//		.csrf().disable()
		.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
		.and()
		.cors()
		.and()
		.exceptionHandling()
		.authenticationEntryPoint(restAuthenticationEntryPoint)
		.and()
        .authorizeRequests()
        		.antMatchers(HttpMethod.OPTIONS).permitAll()
            .antMatchers("/preauth").permitAll()
            .antMatchers("/funcionarios/**").hasRole("ADMIN")
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .loginProcessingUrl("/authenticate")
            .successHandler(authenticationSuccessHandler)
            .failureHandler(new SimpleUrlAuthenticationFailureHandler())
            .and()
        .logout()
        		.logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));
	}
	
	@Bean
	public AuthenticationProvider springAuthenticationProvider() {
		return new AuthenticationProvider() {

			@Override
			public Authentication authenticate(Authentication authentication) throws AuthenticationException {
				String nome = authentication.getName();
				String senha = authentication.getCredentials().toString();
				
				if (nome.equals("michael") && senha.equals("pw")) {
					List<GrantedAuthority> authorities = new ArrayList<>();
					authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
					
					User user = new User();
					user.setName("Michael Schuenck dos Santos");
					
					return new UsernamePasswordAuthenticationToken(user, senha, authorities);
				}
				
				return null;
			}

			@Override
			public boolean supports(Class<?> authentication) {
				return authentication.equals(UsernamePasswordAuthenticationToken.class);
			}
			
		};
	}
	
}

@Component("restAuthenticationEntryPoint")
class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, 
			AuthenticationException authException) throws IOException {
		
		response.sendError( HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized" );
	}
}