import { faker } from "@faker-js/faker";

class Cadastro {
  prencherFormularioDeCadastroUsuario(usuario) {

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

    const dadosGerados = {
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

    cy.get('input#company').type(dadosGerados.company)
    cy.get('input#address1').type(dadosGerados.address1)
    cy.get('input#address2').type(dadosGerados.address2)
    cy.get('select#country').select(dadosGerados.country)
    cy.get('input#state').type(dadosGerados.state)
    cy.get('input#city').type(dadosGerados.city)
    cy.get('[data-qa="zipcode"]').type(dadosGerados.zipcode)
    cy.get('[data-qa="mobile_number"]').type(dadosGerados.mobile_number)

    cy.get('[data-qa="create-account"]').click()

    this.dadosUsuario = dadosGerados
    cy.wrap(dadosGerados).as('dadosUsuario')
  }
}

export default new Cadastro()