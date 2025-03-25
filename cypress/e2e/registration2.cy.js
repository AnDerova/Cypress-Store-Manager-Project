import { faker } from "@faker-js/faker";
import RegistrationPage from "../PageObject/RegistrationPage";

const registrationPage = new RegistrationPage();

describe("Registration Page Tests", () => {
  let validUserName, validEmail, validPassword;
  let invalidCases;

  beforeEach(() => {
    cy.log("Running beforeEach hook");
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

    cy.log("invalidCases initialized:", invalidCases);
  });

  it("Should run tests for invalid cases", () => {
    if (invalidCases && Array.isArray(invalidCases)) {
      invalidCases.forEach(({ case: testCase, userName, email, password }) => {
        cy.log(`Running test for case: ${testCase}`);

        registrationPage
          .typeUserName(userName)
          .typeEmail(email)
          .typePassword(password)
          .clickRegisterButton();

        //registrationPage.getErrorMessage().should("be.visible");
      });
    } else {
      throw new Error("invalidCases is not defined or is not an array");
    }
  });
});