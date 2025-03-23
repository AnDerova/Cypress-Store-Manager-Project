/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import RegistrationPage from "../PageObject/RegistrationPage";
import LoginPage from "../PageObject/LoginPage";

const registrationPage = new RegistrationPage();
const loginPage = new LoginPage();

describe("Registration Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/register/");
  });

  const nameLengths = [3, 7, 50];
  const userName = faker.lorem.word(length);
  const shortUserName = "ab";
  const longUserName = "a".repeat(51);
  const password = faker.internet.password({
    length: 12,
    pattern: /[A-Za-z0-9!@#$%^&*]/,
  });

  nameLengths.forEach((length) => {
    it(`Registration with valid data - a name of ${length} characters`, () => {
      const email = faker.internet.email().toLowerCase();
      registrationPage
        .typeUserName(userName)
        .typeEmail(email)
        .typePassword(password)
        .clickRegisterButton();

      cy.url().should("include", "/login");
    });
  });

  it("Navigate to login page when clicking the login link", () => {
    registrationPage.clickLoginLink();
    cy.url().should("include", "/login");
    loginPage.verifyLoginForm();
  });

  it("Display error message when registering without filling in fields", () => {
    registrationPage.clearFields().clickRegisterButton();
    registrationPage.getErrorMessage();
  });

  it("Display an error message when registering without entering a username", () => {
    const email = faker.internet.email().toLowerCase();
    registrationPage
      .verifyRegistrationForm()
      .typeEmail(email)
      .typePassword(password)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should('be.visible');
  });

  it("Display an error message when registering without entering a email", () => {
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(userName)
      .typePassword(password)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should('be.visible');
  });

  it("Display an error message when registering without entering a password", () => {
    const email = faker.internet.email().toLowerCase();
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(userName)
      .typeEmail(email)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should('be.visible');
  });

  it("Display an error message when registering with a username consisting of spaces", () => {
    const email = faker.internet.email().toLowerCase();
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(" ".repeat(10))
      .typeEmail(email)
      .typePassword(password)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should('be.visible');
  });

  it("Display an error message when registering with a password consisting of spaces", () => {
    const email = faker.internet.email().toLowerCase();
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(userName)
      .typeEmail(email)
      .typePassword(" ".repeat(10))
      .clickRegisterButton();
    registrationPage.getErrorMessage().should('be.visible');
  });

  it("Display an error message when registering with a 2-character username", () => {
    const email = faker.internet.email().toLowerCase();
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(shortUserName)
      .typeEmail(email)
      .typePassword(password)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should('be.visible');
  });

  it.only("Display an error message when registering with a 51-character username", () => {
    const email = faker.internet.email().toLowerCase();
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(longUserName)
      .typeEmail(email)
      .typePassword(password)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should('be.visible');
  });
});
