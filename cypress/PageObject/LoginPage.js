/// <reference types="cypress" />

import ProfilePage from "./ProfilePage";

class LoginPage {
  getEmail = () => cy.get('[type="email"]');
  getPassword = () => cy.get('[type="password"]');
  getRememberMeCheckbox = () => cy.get('[id="rememberMe"]');
  getSubmitButton = () => cy.get('[type="submit"]');

  verifyLoginForm() {
    cy.url().should("include", "/login");
    cy.get("h2").should("have.text", "Вход");
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Пароль"]').should("be.visible");
    return this;
  };

  typeEmail(email) {
    this.getEmail().clear().type(email);
    return this;
  };

  typePassword(password) {
    this.getPassword().clear().type(password);
    return this;
  };

  checkRememberMeCheckbox() {
    this.getRememberMeCheckbox().check();
    return this;
  };

  clickSubmitButton() {
    this.getSubmitButton().click();
    return new ProfilePage();
  };

};

export default LoginPage;
