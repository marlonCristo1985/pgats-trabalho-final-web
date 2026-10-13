# Testes E2E com Cypress · Automation Exercise

Automação de testes de ponta a ponta (E2E) da loja virtual de treino [Automation Exercise](https://automationexercise.com), feita com **Cypress** e **JavaScript**.

Trabalho final da disciplina *Automação de Testes na camada de Interface (Web)* da pós-graduação em Automação de Testes de Software (Faculdade Facint).

---

## O que é testado

São **10 cenários**, que seguem a lista de casos de teste publicada pelo próprio site (por isso a numeração tem saltos).

| Caso | Cenário | O que o teste confere |
|---|---|---|
| TC01 | Cadastrar usuário | Conta criada, com a mensagem "Account Created!" |
| TC02 | Login com e-mail e senha corretos | Nome do usuário no menu e botão de logout visível |
| TC03 | Login com senha errada | Mensagem de e-mail ou senha incorretos |
| TC04 | Logout | Volta para a tela de login |
| TC05 | Cadastro com e-mail já usado | Mensagem de e-mail já existente |
| TC06 | Formulário de contato com anexo | Envio de um PDF e mensagem de sucesso |
| TC08 | Lista de produtos e detalhes | Nome, categoria, preço, estoque, condição e marca do produto |
| TC09 | Pesquisa de produto | Página de resultados e quantidade de produtos encontrados |
| TC10 | Assinatura da newsletter | Mensagem de assinatura feita |
| TC15 | Compra completa, com cadastro antes do checkout | Carrinho com 2 itens, endereço de entrega igual ao do cadastro, total do pedido, pagamento e "Order Placed!" |

---

## Como o projeto está organizado

```
cypress/
├── e2e/
│   └── automation-exercise.cy.js   # os 10 cenários
├── modules/                        # ações de cada parte do site (padrão parecido com Page Objects)
│   ├── cadastro/                   # formulário de cadastro e conferência do endereço
│   ├── carrinho/                   # carrinho, checkout e pagamento
│   ├── contato/                    # formulário de contato com upload
│   ├── login/                      # pré-cadastro e login
│   └── menu/                       # navegação
├── fixtures/
│   ├── allData.json                # dados fixos de teste
│   └── CYN.pdf                     # arquivo usado no upload
└── support/
    ├── commands.js                 # comando customizado cy.navegarParaLogin()
    └── helpers.js                  # gerador de e-mail aleatório
```

### Boas práticas aplicadas

- **Módulos por área do site:** os testes ficam curtos e legíveis; se um seletor mudar, a correção é feita em um lugar só.
- **Dados dinâmicos com Faker:** nome, empresa, endereço, telefone e e-mail novos a cada execução, para que o cadastro não falhe por dado repetido.
- **Dados guardados entre etapas:** o endereço gerado no cadastro é conferido depois, no checkout (TC15).
- **Seletores estáveis:** uso de `data-qa` sempre que o site oferece.
- **Comando customizado** para a navegação que se repete em todos os testes.
- **Relatório HTML** com gráficos e prints embutidos (Mochawesome).

---

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
# 1. Baixar o projeto
git clone https://github.com/marlonCristo1985/pgats-trabalho-final-web.git
cd pgats-trabalho-final-web

# 2. Instalar as dependências
npm install

# 3a. Rodar com a tela do Cypress aberta
npx cypress open

# 3b. Ou rodar tudo direto no terminal
npx cypress run
```

O relatório fica em `cypress/reports/html/index.html`.

> **Atenção:** os cenários TC02, TC03 e TC05 usam um usuário fixo do arquivo `cypress/fixtures/allData.json`. Como o site é público e às vezes apaga contas, se esses testes falharem, cadastre de novo esse e-mail no site (ou troque por um usuário seu).

---

## Integração contínua (GitHub Actions)

O pipeline `.github/workflows/main.yml` roda os testes em uma máquina Ubuntu do GitHub:

1. baixa o projeto;
2. instala as dependências;
3. executa `npx cypress run`;
4. guarda o **relatório HTML, os vídeos e os prints** como artefato, mesmo quando algum teste falha.

Para rodar: aba **Actions** → **Trabalho Final Web** → **Run workflow**.

---

## Tecnologias

![Cypress](https://img.shields.io/badge/Cypress-13-17202C?logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?logo=githubactions&logoColor=white)

Cypress · JavaScript · @faker-js/faker · cypress-mochawesome-reporter · GitHub Actions

---

**Autor:** Marlon de Cristo Paula · [Portfólio](https://marloncristo1985.github.io/?ref=github) · [LinkedIn](https://www.linkedin.com/in/marlon-de-cristo-paula-b1299144)
