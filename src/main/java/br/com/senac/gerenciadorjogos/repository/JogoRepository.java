package br.com.senac.gerenciadorjogos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.senac.gerenciadorjogos.model.Jogo;

// repository: conversa com o banco H2
public interface JogoRepository extends JpaRepository<Jogo, Long> {

}
