/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import RegistrationPage from "../PageObject/RegistrationPage";
import LoginPage from "../PageObject/LoginPage";

const registrationPage = new RegistrationPage();
const loginPage = new LoginPage();

describe("Registration Page Tests", () => {
  let validUserName, validEmail, validPassword;

  beforeEach(() => {

    cy.visit("/register");
=======
 

    validUserName = faker.person.firstName();
    validEmail = faker.internet.email().toLowerCase();
    validPassword = faker.internet.password({
      length: 12,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    });
  });

  const nameLengths = [3, 7, 50];

  nameLengths.forEach((length) => {
    it(`Registration with valid data - a name of ${length} characters`, () => {
      registrationPage
        .typeUserName(validUserName)
        .typeEmail(validEmail)
        .typePassword(validPassword)
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
    registrationPage
      .verifyRegistrationForm()
      .typeEmail(validUserName)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when registering without entering a email", () => {
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when registering without entering a password", () => {
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(validEmail)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when registering with a username consisting of spaces", () => {
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(" ".repeat(10))
      .typeEmail(validEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when registering with a password consisting of spaces", () => {
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(validEmail)
      .typePassword(" ".repeat(10))
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when registering with a 2-character username", () => {
    const shortUserName = "ab";
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(shortUserName)
      .typeEmail(validEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when registering with a 51-character username", () => {
    const longUserName = "a".repeat(51);
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(longUserName)
      .typeEmail(validEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when email is missing '@'", () => {
    const invalidEmail = faker.internet.email().replace("@", "");
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(invalidEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when email is missing '@'", () => {
    const invalidEmail = faker.internet.email().replace("@", "@@@");
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(invalidEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when email is missing domain", () => {
    const invalidEmail = faker.internet.email().split("@")[0] + "@";
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(invalidEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Display an error message when email is missing domain", () => {
    const invalidEmail = faker.internet.email().replace(/\.(?=\w+$)/, "");
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(invalidEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Should display an error message when registering with an email containing spaces", () => {
    const invalidEmail = faker.internet.email().replace("@", " @");
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(invalidEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Should display an error message when registering with an already registered email", () => {
    const registeredEmail = faker.internet.email();
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(registeredEmail)
      .typePassword(validPassword)
      .clickRegisterButton();
    cy.url().should("include", "/login");
    cy.visit("http://localhost:8000/register/");

    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(registeredEmail)
      .typePassword(validPassword)
      .clickRegisterButton();

    registrationPage.getErrorMessage().should("be.visible");
  });

  it("Should display an error message when registering with a short password (less than 8 characters", () => {
    const shortPassword = faker.internet.password({ length: 5 });
    registrationPage
      .verifyRegistrationForm()
      .typeUserName(validUserName)
      .typeEmail(validEmail)
      .typePassword(shortPassword)
      .clickRegisterButton();
    registrationPage.getErrorMessage().should("be.visible");
  });
});
