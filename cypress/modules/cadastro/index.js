import { faker } from "@faker-js/faker";

class Cadastro {
  prencherFormularioDeCadastroUsuario() {

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    cy.get('#id_gender1').check()
    cy.get('input#password').type('12345', { log: false })
    cy.get('select[data-qa="days"]').select('2')
    cy.get('select[data-qa="months"]').select('May')
    cy.get('select[data-qa="years"]').select('1999')
    cy.get('input[type="checkbox"]#newsletter').check()
    cy.get('input[type="checkbox"]#optin').check()
    cy.get('input#first_name').type(firstName)
    cy.get('input#last_name').type(lastName)

    const novoUsuario = {
      firstName,
      lastName,
      company: `PGATS ${faker.company.name()}`,
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'Australia',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobile_number: faker.phone.number(),
      password: '12345'
    }

    cy.get('input#company').type(novoUsuario.company)
    cy.get('input#address1').type(novoUsuario.address1)
    cy.get('input#address2').type(novoUsuario.address2)
    cy.get('select#country').select(novoUsuario.country)
    cy.get('input#state').type(novoUsuario.state)
    cy.get('input#city').type(novoUsuario.city)
    cy.get('[data-qa="zipcode"]').type(novoUsuario.zipcode)
    cy.get('[data-qa="mobile_number"]').type(novoUsuario.mobile_number)

    cy.get('[data-qa="create-account"]').click()

    this.dadosUsuario = novoUsuario
    cy.wrap(novoUsuario).as('dadosUsuario')
  }

    validarEnderecoDeEntrega() {
    const esperado = this.dadosUsuario || {}

    cy.get(':nth-child(2) > .heading').should('have.text', 'Address Details');
    cy.get('#address_delivery .address_firstname').should('contain.text', `${esperado.firstName} ${esperado.lastName}`);
    cy.get('#address_delivery .address_address1').eq(0).should('contain.text', esperado.company);
    cy.get('#address_delivery .address_address1').eq(1).should('contain.text', esperado.address1);
    cy.get('#address_delivery .address_address1').eq(2).should('contain.text', esperado.address2);
    cy.get('#address_delivery .address_phone').should('contain.text', esperado.mobile_number);
  }
}

export default new Cadastro()