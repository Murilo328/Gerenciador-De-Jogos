package br.com.senac.gerenciadorjogos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// classe principal, é ela que liga o sistema
@SpringBootApplication
@EnableJpaAuditing 
public class GerenciadorJogosApplication {

    public static void main(String[] args) {
        SpringApplication.run(GerenciadorJogosApplication.class, args);
    }
}
