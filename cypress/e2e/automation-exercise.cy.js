import userData from '../fixtures/allData.json'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'

describe('Trabalho Final', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com')
    cy.navegarParaLogin()
  });

  it("TC01: Cadastrar usuário", () => {
    login.preencherFormularioDePreCadastro()
    cadastro.prencherFormularioDeCadastroUsuario()

    cy.url().should('eq', 'https://automationexercise.com/account_created');
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
  });

  it('TC02: Login com e-mail e senha corretos', () => {
    login.preencherFormularioDeLogin(userData.email, userData.password)

    cy.get('i.fa-user').parent().should('contain', userData.name)
    cy.get('a[href="/logout"]').should('be.visible')
  });

  it('TC03: Tentativa de login com e-mail e senha incorretos', () => {
    login.preencherFormularioDeLogin(userData.email, '54321')

    cy.get('#form p').should('contain', 'Your email or password is incorrect!')
  });

  it('TC04: Logout de Usuário', () => {
    login.preencherFormularioDeLogin(userData.email, userData.password)
    menu.efetuarLogout()

    cy.url().should('contain', 'login')
    cy.contains('Login to your account')
    cy.get('a[href="/logout"]').should('not.exist')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')
  });

  it('TC05: Cadastrar Usuário com e-mail existente no sistema', () => {
    login.preencherFormularioDePreCadastro(userData.email)

    cy.contains('button', 'Signup').click()
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
  });

});
