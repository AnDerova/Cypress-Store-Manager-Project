/// <reference types="cypress" />

import LoginPage from "./LoginPage";

class RegistrationPage {
  getUsername = () => cy.get('[id="username"]');
  getEmail = () => cy.get('[type="email"]');
  getPassword = () => cy.get('[type="password"]');
  getLoginLink = () => cy.get('[href="/login"]');
  getErrorMessage = () => cy.get(".invalid-feedback");

  getRegisterButton = () => cy.get('[type="submit"]');

  visit() {
    cy.visit("http://localhost:8000/register/");
  }

  verifyRegistrationForm() {
    cy.url().should("include", "/register");
    cy.get("h2").should("have.text", "Регистрация");
    cy.get('input[placeholder="Имя пользователя"]').should("be.visible");
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Пароль"]').should("be.visible");
    return this;
  }

  typeUserName(userName) {
    if (userName !== "") {
      this.getUsername().clear().type(userName);
         } else {
      this.getUsername().clear();
    }
    return this;
  }

  typeEmail(email) {
    if (email !== "") {
      this.getEmail().clear().type(email);
          } else {
      this.getEmail().clear();
    }
    return this;
  }

  typePassword(password) {
    if (password !== ""){
        this.getPassword().clear().type(password);
           }else{
        this.getPassword().clear();
    }
        return this;
  }

//   clickRegisterButton() {
//     this.getRegisterButton().click();
//     return LoginPage;
//   }

  clickRegisterButton() {
    this.getRegisterButton().click();
    return cy.wrap(this); // Теперь можно использовать `.then()`
}

  clickLoginLink() {
    this.getLoginLink().click();
    return LoginPage;
  }

  clearFields() {
    this.getUsername().clear();
    this.getEmail().clear();
    this.getPassword().clear();
    return this;
  }
}

export default RegistrationPage;
