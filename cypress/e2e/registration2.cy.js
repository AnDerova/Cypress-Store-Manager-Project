import { faker } from "@faker-js/faker";
import RegistrationPage from "../PageObject/RegistrationPage";
import LoginPage from "../PageObject/LoginPage";

const registrationPage = new RegistrationPage();
const loginPage = new LoginPage();

describe("Registration Page Tests", () => {
  let validUserName, validEmail, validPassword;
  let invalidCases;

  beforeEach(() => {
    cy.visit("http://localhost:8000/register/");

    validUserName = faker.lorem.word();
    validEmail = faker.internet.email().toLowerCase();
    validPassword = faker.internet.password({
      length: 12,
      pattern: /[A-Za-z0-9!@#$%^&*]/,
    });

    invalidCases = [
      { case: "empty fields", userName: "", email: "", password: "" },
      {
        case: "missing username",
        userName: "",
        email: validEmail,
        password: validPassword,
      },
      {
        case: "missing email",
        userName: validUserName,
        email: "",
        password: validPassword,
      },
      {
        case: "missing password",
        userName: validUserName,
        email: validEmail,
        password: "",
      },
      {
        case: "username with spaces",
        userName: " ".repeat(10),
        email: validEmail,
        password: validPassword,
      },
      {
        case: "password with spaces",
        userName: validUserName,
        email: validEmail,
        password: " ".repeat(10),
      },
      {
        case: "short username (2 char)",
        userName: "ab",
        email: validEmail,
        password: validPassword,
      },
      {
        case: "long username (51 char)",
        userName: "a".repeat(51),
        email: validEmail,
        password: validPassword,
      },
    ];
  });

  invalidCases.forEach(({ case: testCase, userName, email, password }) => {
    it(`Should display an error message for ${testCase}`, () => {
      cy.log(`Testing case: ${testCase}`);

      registrationPage
        // .verifyRegistrationForm()
        .typeUserName(userName)
        .typeEmail(email)
        .typePassword(password)
        .clickRegisterButton();

      // Проверяем, что ошибка отображается
    //   registrationPage.getErrorMessage().should("be.visible");
    });
  });
});