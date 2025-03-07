const commonlocators = require("../../../../locators/commonlocators.json");
const widgetsPage = require("../../../../locators/Widgets.json");
const dsl = require("../../../../fixtures/textWidgetDsl.json");

describe("Text Widget Cell Background and Text Size Validation", function() {
  before(() => {
    cy.addDsl(dsl);
  });
  it("Change the cell background color", function() {
    cy.openPropertyPane("textwidget");
    /**
     * @param{Text} Random Text
     * @param{CheckboxWidget}Mouseover
     * @param{CheckboxPre Css} Assertion
     */

    //Check if the cell background is #03b365
    cy.selectColor("cellbackground");

    cy.get(`${widgetsPage.textWidget} .bp3-ui-text`).should(
      "have.css",
      "background-color",
      "rgb(3, 179, 101)",
    );

    //Toggle to JS mode
    cy.get(widgetsPage.toggleJsBcgColor)
      .click()
      .wait(200);

    //Check if the typed color red is reflecting in the background color and in the evaluated value
    cy.updateCodeInput(".t--property-control-cellbackground", "red");

    cy.get(`${widgetsPage.textWidget} .bp3-ui-text`).should(
      "have.css",
      "background-color",
      "rgb(255, 0, 0)",
    );

    cy.EvaluateCurrentValue("red");

    //Check if the typed color #03b365 is reflecting in the background color and in the evaluated value
    cy.updateCodeInput(".t--property-control-cellbackground", "#03b365");

    cy.get(`${widgetsPage.textWidget} .bp3-ui-text`).should(
      "have.css",
      "background-color",
      "rgb(3, 179, 101)",
    );

    cy.EvaluateCurrentValue("#03b365");

    //Check if the typed color transparent is reflecting in the background color and in the evaluated value
    cy.updateCodeInput(".t--property-control-cellbackground", "");

    cy.get(`${widgetsPage.textWidget} .bp3-ui-text`).should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0)",
    );

    cy.get(commonlocators.evaluatedCurrentValue)
      .first()
      .should("not.be.visible");
  });

  it("Change the text sizes", function() {
    cy.openPropertyPane("textwidget");

    //Check the label text size with dropdown
    cy.get(widgetsPage.textSize)
      .last()
      .click({ force: true });

    cy.wait(100);
    cy.selectTextSize("Heading 1");

    cy.get(`${widgetsPage.textWidget} .bp3-ui-text`).should(
      "have.css",
      "font-size",
      "24px",
    );

    //Toggle JS mode
    cy.get(widgetsPage.toggleTextSize)
      .click()
      .wait(200);

    //Check if the typed size HEADING2 is reflecting in the background color and in the evaluated value
    cy.updateCodeInput(".t--property-control-textsize", "HEADING2");

    cy.get(`${widgetsPage.textWidget} .bp3-ui-text`).should(
      "have.css",
      "font-size",
      "18px",
    );

    cy.EvaluateCurrentValue("HEADING2");

    //Check for if the text size changes to default size when set to blank in JS mode:
    cy.updateCodeInput(".t--property-control-textsize", "");

    cy.get(`${widgetsPage.textWidget} .bp3-ui-text`).should(
      "have.css",
      "font-size",
      "14px",
    );

    cy.get(commonlocators.evaluatedCurrentValue)
      .first()
      .should("not.be.visible");

    //Check the values not allowed error message
    cy.updateCodeInput(".t--property-control-textsize", "HEADING10");

    cy.evaluateErrorMessage("Disallowed value: HEADING10");
  });
});
