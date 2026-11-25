# Gerenciador de Jogos de Videogame

Projeto final da disciplina Desenvolvimento de Sistemas Web — TADS, turma 3B Noturno, 2026.

## Tecnologias

- Java 21
- Spring Boot 4.0.0
- Spring Web MVC / API REST
- Spring Data JPA
- Bean Validation
- Banco de dados H2
- HTML, CSS e JavaScript
- Fetch API
- Maven

## Como executar

1. Instale o JDK 21 ou superior.
2. Instale o Maven.
3. Abra a pasta do projeto na IDE.
4. Execute a classe `GerenciadorJogosApplication`.
5. Acesse `http://localhost:8080`.

O Maven fará o download das dependências na primeira execução. É necessário ter conexão com a internet nessa etapa.

Na primeira execução, o Spring Boot cria o banco H2 e a tabela de jogos automaticamente. A listagem começa vazia, conforme o roteiro de validação do professor. Depois dos cadastros, os dados ficam salvos no arquivo local dentro da pasta `data`.

## Console do H2

Acesse `http://localhost:8080/h2-console` e utilize:

- JDBC URL: `jdbc:h2:file:./data/gerenciador-jogos`
- User Name: `sa`
- Password: deixe em branco

Mantenha o console aberto durante a demonstração, conforme o roteiro do professor.

No Spring Boot 4 o console do H2 é um módulo separado. Por isso o `pom.xml` tem a dependência `spring-boot-h2console`.

## Endpoints

| Método | Endpoint | Ação |
|---|---|---|
| GET | `/api/jogos` | Lista todos os jogos |
| GET | `/api/jogos/{id}` | Consulta um jogo |
| POST | `/api/jogos` | Cadastra um jogo |
| PUT | `/api/jogos/{id}` | Altera um jogo |
| DELETE | `/api/jogos/{id}` | Exclui um jogo |
| GET | `/prompt` | Exibe o registro PROMPT.md |

## Exemplo de JSON

```json
{
  "titulo": "Forza Horizon 6",
  "anoLancamento": 2026,
  "plataforma": "Xbox",
  "disponivel": true,
  "observacoes": ""
}
```

## Regras implementadas

- Título e plataforma são obrigatórios e não podem conter apenas espaços.
- Ano de lançamento é obrigatório e deve ser igual ou maior que 1950.
- Disponibilidade é obrigatória.
- Observações são opcionais.
- Espaços duplicados no título e na plataforma são removidos (do while no `JogoService`).
- Plataformas comuns (PS5, PS4, Xbox, PC, Switch) são padronizadas (switch case no `JogoService`).
- Validações são executadas no backend.
- A exclusão solicita confirmação na interface.
- As datas de criação e atualização são registradas automaticamente.
- O banco H2 mantém os dados em arquivo local.

## Estrutura

- `model`: entidade JPA `Jogo`.
- `dto`: dados recebidos para cadastro e alteração.
- `repository`: acesso ao banco H2.
- `service`: regras de negócio.
- `controller`: endpoints REST.
- `exception`: tratamento centralizado de erros.
- `static`: frontend HTML, CSS e JavaScript.

## Antes da entrega

Execute o projeto e confira os itens do roteiro de validação do professor. O código pode ser questionado individualmente na avaliação, por isso é importante entender a função de cada classe.
