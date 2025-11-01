import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'

describe('Trabalho Final', () => {  
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    });

    it("TC1: Cadastrar usuário", () => {
      menu.navegarParaLogin()
      login.preencherFormularioDePreCadastro()
      cadastro.prencherFormularioDeCadastroUsuario()

      cy.url().should('eq', 'https://automationexercise.com/account_created');
      cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
    });
  });
