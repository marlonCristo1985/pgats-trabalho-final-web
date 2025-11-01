import userData from '../fixtures/allData.json'
import menu from '../modules/menu'
import login from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato'
import { getRandomEmail } from '../support/helpers'
import carrinho from '../modules/carrinho'

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

  it('TC04: Realizar Logout do Usuário', () => {
    login.preencherFormularioDeLogin(userData.email, userData.password)
    menu.realizarLogout()

    cy.url().should('contain', 'login')
    cy.contains('Login to your account')
    cy.get('a[href="/login"]').should('contain', 'Signup / Login')
  });

  it('TC05: Tentativa de cadastrar usuário com e-mail em uso', () => {
    login.preencherFormularioDePreCadastro(userData.email)

    cy.contains('button', 'Signup').click()
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
  });

  it('TC6: Cadastrar Contato', () => {
    menu.irParaContato()
    contato.preencherFormularioDeContato()

    cy.get('[data-qa="submit-button"]').click()

    cy.get('.status').should('be.visible')
    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')

  });

  it("TC08: Verificar todos os produtos e a página de detalhes do produto", () => {
    menu.irParaProdutos();

    cy.url().should('eq', 'https://automationexercise.com/products');
    cy.get('.title').should('have.text', 'All Products')
    cy.get('a[href="/product_details/1"').click();
    cy.url().should('eq', 'https://automationexercise.com/product_details/1');
    cy.get('.product-information').should('be.visible');
    cy.get('.product-information h2').should('have.text', 'Blue Top');
    cy.get('.product-information p').should('contain.text', 'Category: Women > Tops');
    cy.get('.product-information span').should('contain.text', 'Rs. 500');
    cy.get('.product-information p').should('contain.text', 'Availability: In Stock');
    cy.get('.product-information p').should('contain.text', 'Condition: New');
    cy.get('.product-information p').should('contain.text', 'Brand: Polo');
  });

  it("TC09: Pesquisar produto", () => {
    menu.irParaProdutos();
    cy.get('.title').should('have.text', 'All Products');
    cy.get('input[id="search_product"]').type('tshirt');
    cy.get('button[id="submit_search"]').click();
    cy.url().should('eq', 'https://automationexercise.com/products?search=tshirt');
    cy.get('.title').should('have.text', 'Searched Products');
    cy.get('.product-image-wrapper').should("have.length", 6);
  });

  it("TC10: Verificar assinatura na página inicial", () => {
    cy.get('.single-widget h2').should('have.text', 'Subscription');
    cy.get('input[id="susbscribe_email"]').type(getRandomEmail());
    cy.get('button[id="subscribe"]').click();
    cy.get('.alert-success').should('have.text', 'You have been successfully subscribed!');
  });

  it("TC015: Fazer pedido: Registre-se antes de finalizar a compra", () => {
    login.preencherFormularioDePreCadastro()
    cadastro.prencherFormularioDeCadastroUsuario()
    cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains(`Logged in as `)

    carrinho.adicionarProdutosNoCarrinho();
    cy.get('.modal-title').should('have.text', 'Added!')

    carrinho.irParaCarrinho();
    cy.get('.active').should('have.text', 'Shopping Cart')
    cy.get('.cart_product').should("have.length", 2)

    carrinho.realizarCheckout()
    cadastro.validarEnderecoDeEntrega()

    cy.get('.cart_product').should("have.length", 2)
    cy.get('td:nth-child(4) > p').should("have.text", 'Rs. 1900')
    cy.get('.form-control').type(userData.description)
    cy.get('a[href="/payment"]').click()

    carrinho.adicionarInformacoesDePagamento()

    cy.get('[data-qa="pay-button"]').click()
    cy.get('[data-qa="order-placed"]').should('be.visible').and('have.text', 'Order Placed!');
    cy.get('#form p').should('be.visible').and('have.text', 'Congratulations! Your order has been confirmed!');
  });
  
});
