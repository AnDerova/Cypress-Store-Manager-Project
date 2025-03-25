/// <reference types="cypress" />

import LoginPage from "../PageObject/LoginPage";
import ProfilePage from "../PageObject/ProfilePage";

const loginPage = new LoginPage();
const profilePage = new ProfilePage();

describe("Login Tests", () => {
  const validEmail = "zubane@mailinator.com";
  const validPassword = "zubane12345";

  beforeEach(() => {
    cy.visit("/login");
    loginPage.verifyLoginForm();
  });

  it("Successful login with valid credentials", () => {
    loginPage
      .typeEmail(validEmail)
      .typePassword(validPassword)
      .clickSubmitButton();
    profilePage.verifyUserRedirectedToProfilePage();
  });

  it.only("Successful login with 'Remember Me' checkbox ", () => {
    loginPage
      .typeEmail(validEmail)
      .typePassword(validPassword)
      .checkRememberMeCheckbox()
      .clickSubmitButton();
    profilePage.verifyUserRedirectedToProfilePage();
    cy.window()
      .its("localStorage.access_token")
      .should("exist")
      .as("authToken");

    // Сохраняем текущий токен и перезагружаем страницу
    cy.get("@authToken").then((token) => {
      // Очистить localStorage, но оставить токен в переменной
      cy.window().then((win) => {
        win.localStorage.clear();
        win.localStorage.setItem("access_token", token); // Записываем токен обратно
      });
    });

    cy.visit("/login");
    loginPage.getEmail().should("be.visible").and("have.value", validEmail);
    loginPage
      .getPassword()
      .should("be.visible")
      .and("have.value", validPassword);
  });
});
