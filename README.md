# Gerenciador de Jogos de Videogame

Projeto desenvolvido para a atividade final da disciplina **Desenvolvimento de Sistemas Web**, do curso de Análise e Desenvolvimento de Sistemas (TADS), turma 3B Noturno — 2026.

O sistema permite cadastrar, consultar, alterar e excluir jogos de videogame. Também é possível visualizar informações como título, ano de lançamento, plataforma, disponibilidade e observações.

## Tecnologias utilizadas

- Java 21
- Spring Boot 4.0.0
- Spring Web MVC / API REST
- Spring Data JPA
- Bean Validation
- Banco de dados H2
- HTML, CSS e JavaScript
- Fetch API
- Maven

## Como executar o projeto

1. Instale o JDK 21 ou superior.
2. Instale o Maven.
3. Abra a pasta principal do projeto na IDE.
4. Localize a classe `GerenciadorJogosApplication`.
5. Execute o método `main` da classe.
6. Acesse pelo navegador: http://localhost:8080.

Também é possível iniciar pelo terminal, dentro da pasta que contém o `pom.xml`, utilizando:

```bash
mvn spring-boot:run
```

Na primeira execução, o Maven poderá baixar as dependências necessárias. Por isso, é importante ter conexão com a internet.

O Spring Boot cria o banco H2 e a tabela de jogos automaticamente. A listagem começa vazia, conforme o roteiro de validação do professor. Após os cadastros, os dados ficam armazenados em um arquivo local dentro da pasta `data`.

## Endereços para acessar o sistema

Depois de iniciar o projeto, os seguintes endereços ficam disponíveis:

| Endereço | Para que serve |
|---|---|
| `http://localhost:8080` | Abre a tela principal do Gerenciador de Jogos. |
| `http://localhost:8080/api/jogos` | Exibe a lista de jogos cadastrados em formato JSON. |
| `http://localhost:8080/h2-console` | Abre o console do banco de dados H2. |
| `http://localhost:8080/prompt` | Exibe o conteúdo do arquivo PROMPT.md. |

**Observação:** o endereço principal apresenta a interface do sistema. As operações de cadastro, alteração e exclusão são realizadas pela própria tela, que se comunica com o backend através da Fetch API.

## Banco de dados H2

O console do banco pode ser acessado pelo endereço:

http://localhost:8080/h2-console

Informações para conexão:

- **JDBC URL:** `jdbc:h2:file:./data/gerenciador-jogos`
- **Usuário:** `sa`
- **Senha:** deixar em branco

O console permite consultar os registros e acompanhar as alterações realizadas no sistema.

No Spring Boot 4, o console H2 utiliza uma dependência separada, configurada no `pom.xml`.

## Endpoints da API

O backend disponibiliza os seguintes endpoints:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/jogos` | Lista todos os jogos |
| GET | `/api/jogos/{id}` | Consulta um jogo pelo ID |
| POST | `/api/jogos` | Cadastra um novo jogo |
| PUT | `/api/jogos/{id}` | Altera um jogo cadastrado |
| DELETE | `/api/jogos/{id}` | Exclui um jogo |
| GET | `/prompt` | Exibe o conteúdo do arquivo PROMPT.md |

## Exemplo de cadastro

As informações são enviadas do frontend para o backend no formato JSON.

```json
{
  "titulo": "Forza Horizon 6",
  "anoLancamento": 2026,
  "plataforma": "Xbox",
  "disponivel": true,
  "observacoes": ""
}
```

## Regras e validações

Durante o desenvolvimento, foram implementadas as seguintes regras:

- O título e a plataforma são obrigatórios e não podem conter apenas espaços.
- O ano de lançamento é obrigatório e deve ser igual ou maior que 1950.
- A disponibilidade também é obrigatória.
- As observações são opcionais.
- Espaços duplicados no título e na plataforma são tratados no `JogoService`, utilizando `do while`.
- Algumas plataformas, como PS5, PS4, Xbox, PC e Switch, são padronizadas utilizando `switch case`.
- As validações são realizadas no backend, evitando o cadastro de informações inválidas.
- A exclusão de um jogo solicita confirmação antes de continuar.
- As datas de criação e atualização são registradas automaticamente.
- Os dados cadastrados são armazenados no banco H2.

## Organização do projeto

O projeto foi dividido em pastas para facilitar a organização e a manutenção do código.

- **model:** contém a entidade `Jogo`, que representa os dados dos jogos.
- **dto:** recebe e organiza as informações utilizadas no cadastro e na alteração.
- **repository:** realiza o acesso ao banco de dados H2.
- **service:** concentra as regras de negócio e o tratamento dos dados.
- **controller:** recebe as requisições e disponibiliza os endpoints da API REST.
- **exception:** contém o tratamento dos erros da aplicação.
- **static:** reúne os arquivos do frontend, como HTML, CSS e JavaScript.

Essa divisão permite separar as responsabilidades de cada parte do sistema e facilita a compreensão do funcionamento do projeto.

## Uso de ferramentas de Inteligência Artificial

Durante o desenvolvimento, foram utilizadas as ferramentas **ChatGPT e Claude** como apoio ao processo, com participação estimada entre 30% e 40% do desenvolvimento.

As ferramentas auxiliaram principalmente na organização da estrutura inicial do projeto, na consulta de conceitos e referências para os estudos, na análise de possíveis melhorias e na revisão de alguns trechos de código.

Também foram utilizadas como apoio na organização e padronização dos títulos, seções e partes repetitivas do código e da documentação.

As sugestões foram analisadas e adaptadas de acordo com as necessidades do projeto, servindo como suporte para o desenvolvimento e o aprendizado das tecnologias utilizadas.

## Considerações finais

Antes da entrega, é importante executar o projeto e conferir as funcionalidades solicitadas pelo professor, seguindo o roteiro de validação.

Também é importante compreender a função de cada classe e como o frontend, o backend e o banco de dados trabalham juntos, pois o código poderá ser questionado individualmente durante a apresentação.
