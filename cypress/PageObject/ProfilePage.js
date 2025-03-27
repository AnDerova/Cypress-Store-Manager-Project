/// <reference types="cypress" />

class ProfilePage {

    verifyUserRedirectedToProfilePage() {
        cy.url().should("include", "/login");
        cy.get("h2").should("have.text", "Добро пожаловать в личный кабинет");
      };
};

export default ProfilePage;