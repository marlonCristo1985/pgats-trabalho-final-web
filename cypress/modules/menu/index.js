class Menu {
  irParaLogin() {
    cy.get('a[href="/login"]').click()
  }

  realizarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click()
  }

  irParaProdutos() {
    cy.get('a[href="/products"]').click()
  }

  irParaContato() {
    cy.get('a[href*=contact]').click()
  }

}

export default new Menu()