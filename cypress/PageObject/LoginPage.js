/// <reference types="cypress" />

class LoginPage {
    
    getEmail = () => cy.get('[type="email"]');
    getPassword = () => cy.get('[type="password"]');
    getSubmitButton = () => cy.get('[type="submit"]');

    verifyLoginForm() {
          cy.url().should('include', '/login');
          cy.get('h2').should('have.text', 'Вход');
          cy.get('input[placeholder="Email"]').should('be.visible');
          cy.get('input[placeholder="Пароль"]').should('be.visible');
        };
     
    clickSubmitButton () {
        this.getSubmitButton().click();
        return this;
    }
}

export default LoginPage;