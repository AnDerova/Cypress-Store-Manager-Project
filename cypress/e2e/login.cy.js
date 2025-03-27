/// <reference types="cypress" />

import LoginPage from "../PageObject/LoginPage";
import ProfilePage from "../PageObject/ProfilePage";
import RegistrationPage from "../PageObject/RegistrationPage";

const loginPage = new LoginPage();
const profilePage = new ProfilePage();
const registrationPage = new RegistrationPage();

describe("Login Tests", () => {
  const validEmail = "zubane@mailinator.com";
  const validPassword = "zubane12345";
  const invalidPassword = "vucuzore!";

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

  it.skip("Successful login with 'Remember Me' checkbox ", () => {
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

  it("User Authorization | 'Sign Up' link functionality", () => {
    loginPage.clickRegisterButton();
    registrationPage.verifyRegistrationForm();
  });

  it("User Authorization | Display an error message when email is missing '@'", () => {
    const invalidEmail = "zubanemailinator.com";
    loginPage
      .typeEmail(invalidEmail)
      .typePassword(validPassword)
      .clickSubmitButtonWithoutRedirect();
    cy.get("body").should("contain", "Please include");
    //loginPage.getErrorMessage().should("be.visible");
  });

  it("User Authorization | Attempt to log in with a non-existent email", () => {
    const invalidEmail = "lizihadexo123@mailinator.com";
    loginPage
      .typeEmail(invalidEmail)
      .typePassword(validPassword)
      .clickSubmitButtonWithoutRedirect();
    loginPage.getErrorMessage().should("be.visible");
  });

  it("User Authorization | Incorrect password for a valid email", () => {
    loginPage.typeEmail(validEmail).typePassword(invalidPassword);
    loginPage.clickSubmitButtonWithoutRedirect();
    loginPage.getErrorMessage().should("be.visible");
  });

  it("User Authorization | Email field is empty for a valid password", () => {
    loginPage.typePassword(validPassword);
    loginPage.clickSubmitButtonWithoutRedirect();
    loginPage.getErrorMessage().should("be.visible");
  });

  it("User Authorization | Password field is empty for a valid email", () => {
    loginPage.typeEmail(validEmail);
    loginPage.clickSubmitButtonWithoutRedirect();
    loginPage.getErrorMessage().should("be.visible");
  });

  it("User Authorization | Should not allow login with incorrect password case", () => {
    const invalidPassword = "VucuZore!"
    loginPage.typeEmail(validEmail).typePassword(invalidPassword);
    loginPage.clickSubmitButtonWithoutRedirect();
    loginPage.getErrorMessage().should("be.visible");
  });
});
