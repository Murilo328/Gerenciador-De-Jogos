# Registro de solicitações de desenvolvimento

## Solicitação 1

- Data da solicitação: 2026-11-18 09:43
- Usuário solicitante: Murilo Silva Dantas
- Prompt utilizado: "traga o zip desse jogo aqui"
- Origem dos requisitos:
  - Descrito pelo usuário nesta conversa: entregar o projeto em arquivo ZIP.
  - Extraído do PDF da atividade: aplicação web de gerenciamento de jogos com CRUD completo; Spring Boot como webservice REST; frontend HTML/CSS/JavaScript acessando endpoints por Fetch API; banco H2; validações no backend; tela de listagem; cadastro; alteração com dados preenchidos; exclusão com confirmação; indicação visual de indisponibilidade; rodapé com identificação e declaração de uso de IA.
  - Extraído do PDF da atividade, Anexo 2: manter este arquivo PROMPT.md com as solicitações e disponibilizar GET /prompt.

## Solicitação 2

- Data da solicitação: 2026-11-18 09:43
- Usuário solicitante: Murilo Silva Dantas
- Prompt utilizado: "esse sim Guardar a data de criação e a última atualização de cada jogo. e vai ser a sua decisção"
- Origem dos requisitos:
  - Descrito pelo usuário: incluir data de criação e data da última atualização de cada jogo; deixar o assistente decidir as demais melhorias.
  - Decisão de implementação: incluir auditoria automática de criação e atualização, tratamento centralizado de erros e teste de inicialização, mantendo o escopo simples e adequado ao 3º semestre.
  - Extraído do PDF: os campos e o fluxo obrigatório do CRUD, as validações no backend e a persistência no H2.

## Solicitação 3

- Data da solicitação: 2026-11-18 09:43
- Usuário solicitante: Murilo Silva Dantas
- Prompt utilizado: "traga o zip desse jogo aqui"
- Origem dos requisitos:
  - Descrito pelo usuário: gerar e entregar o ZIP da primeira versão do Gerenciador de Jogos de Videogame.
  - Extraído do PDF: requisitos técnicos das páginas 3 a 6 e 12, roteiro de validação do Anexo 1 e instruções para agentes de IA do Anexo 2.

## Solicitação 4

- Data da solicitação: 2026-11-23 14:38
- Usuário solicitante: Murilo Silva Dantas
- Prompt utilizado: "Sem criar nada, só te passando as informações. Como você bem sabe, a gente está desenvolvendo o banco de dados em H2, que é a biblioteca. Acho que já fui informado aqui para você, então você vai usar a memória do que tem aqui, o que está sendo desenvolvido em PI, tem o Upload, tem o H2, que é o Java, tem todas as estruturas. Eu vou te passar um zip que eu fiz, e nesse zip ele está dando um erro. Eu queria que você corrigisse o erro desse zip com base nas informações que você tem. E as cores, eu não quero nada muito simples, segundo semestre, entendeu? Então eu quero código um pouco mais simples, pode ser grande, mas eu sabendo explicar tá bom. Você montando um roteiro também com base no que está no PDF também já agradeço. Depois que eu te passar o zip, você vai analisar ele e com base em tudo que já foi dito, você atualize ele e traga em zip novamente atualizado. O nome do zip pode ser jogos.02."
- Origem dos requisitos:
  - Descrito pelo usuário: corrigir o erro do projeto enviado; manter o código simples e explicável, com visual cuidado; montar um roteiro de apresentação; devolver o projeto atualizado em zip com o nome jogos.02.
  - Extraído do PDF da atividade: Spring Boot 4.0.x ou superior; H2; validação no backend; identificação dos integrantes no pom.xml; rodapé com declaração de uso de IA; roteiro de validação do Anexo 1; instruções do Anexo 2 (PROMPT.md e PromptController).
  - Decisão de implementação (não pedida pelo usuário): adicionar a dependência spring-boot-h2console (no Spring Boot 4 o console do H2 é um módulo separado); respostas de erro sempre em JSON; mensagem de exclusão com o ID; declaração de IA no rodapé; PromptController restaurado para a versão original do commit, conforme o Anexo 2.

## Solicitação 5

- Data da solicitação: 2026-11-23 19:33
- Usuário solicitante: Murilo Silva Dantas
- Prompt utilizado: "Certo, mantendo as cores, que eu quero trazer umas cores mais natureza no mundo do Brasil. E eu quero as cores exatas a uma arara brasileira, aquela clássica vermelha, sabe? Eu não quero nenhuma referência a ela, somente as cores. Eu não quero nada muito grande e exagerado. Eu quero que você traga para mim ajustado o zip e logo abaixo um roteiro de apresentação para mim conseguir trabalhar com ele. Eu quero que nos códigos, se der para usar, eu quero que você esteja usando o H2 e o Crud Eu quero que se der para usar switch case, while, do while, você use também, porque são linguagens de programação que eu já aprendi. Se der para você usar um retro também, um public void, um public static, que eu sei que não é muito vantajoso, mas é uma coisa que a gente sabe usar, né? Não importa o tamanho do código ficar, eu quero saber explicar, entendeu? Pode colocar título também, mas um título mais amador, mais aluno colocando, sabe? Nada muito complicado, nada um código muito complicado. Um código amador mesmo, mais funcional."
- Origem dos requisitos:
  - Descrito pelo usuário: nova paleta de cores (vermelho, amarelo, azul e verde, sem referência ao animal); visual sem exagero; usar H2 e CRUD; usar switch case, while, do while, return, public void e public static; comentários/títulos em estilo de aluno; código simples; zip ajustado e roteiro de apresentação.
  - Extraído do PDF da atividade: CRUD completo com Spring Boot REST, Fetch API, H2 e validação no backend; rodapé com identificação e declaração de IA; roteiro de validação do Anexo 1; instruções do Anexo 2.
  - Decisão de implementação (não pedida literalmente): do while em JogoService.limparEspacos e no resumo do JavaScript; switch em JogoService.padronizarPlataforma, no selo de status e nos erros por campo do JavaScript; while na montagem dos cards; mensagem de erro dentro do formulário; correção da mensagem de sucesso após alterar (dizia sempre "cadastrado").


## Solicitação 6

- Data da solicitação: 2026-11-25 09:26
- Usuário solicitante: Murilo Silva Dantas
- Prompt utilizado: "Com base no zip que eu estou te entregando, eu quero que você analise e veja se tá com tudo que o professor está pedindo. E eu peço que você traga o zip abaixo atualizado, pois o zip que eu subi, ele tá duplicado. Eu quero que tire o que tá duplicado e o que não é necessário, deixando ele funcionando normalmente e fácil de explicar, porque eu vou ter que apresentar isso depois"
- Origem dos requisitos:
  - Descrito pelo usuário: analisar o ZIP conforme as exigências do professor; remover arquivos duplicados e desnecessários; preservar o funcionamento; manter o código fácil de explicar; entregar o projeto atualizado em ZIP.
  - Extraído do PDF da atividade: CRUD completo de jogos; API REST com Spring Boot; frontend acessando os endpoints via Fetch API; persistência em H2; validações implementadas no backend; listagem inicial vazia; cadastro, alteração e exclusão com confirmação; destaque para jogos indisponíveis; mensagens de sucesso e erro; rodapé com identificação e declaração de uso de IA; requisitos técnicos e roteiro de validação do Anexo 1; registro de solicitações e endpoint GET /prompt conforme o Anexo 2.
  - Consideração de escopo: o PDF determina requisitos adicionais de cadastro e relacionamento de plataformas somente para alunos que não cursam PI3.
