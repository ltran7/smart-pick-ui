describe("Smart Pick", () => {
    it("Ball is selected when clicked", () => {
      cy.visit("/smartpick");

      cy.get('button[id="1-number"]').click().should('have.class', 'ball-selected');
      cy.get('button[id="1-star"]').click().should('have.class', 'ball-selected');
    });

    it("Ball is unselected when clicked twice", () => {
        cy.visit("/smartpick");
  
        cy.get('button[id="1-number"]').click().should('have.class', 'ball-selected');
        cy.get('button[id="1-star"]').click().should('have.class', 'ball-selected');

        cy.get('button[id="1-number"]').click().should('have.class', 'ball');
        cy.get('button[id="1-star"]').click().should('have.class', 'ball');
      });

    it("Selected balls are displayed and ordered in the selection", () => {
        cy.visit("/smartpick");
  
        cy.get('button[id="49-number"]').click();
        cy.get('button[id="5-number"]').click();
        cy.get('button[id="20-number"]').click();
        cy.get('button[id="38-number"]').click();
        cy.get('button[id="16-number"]').click();
        cy.get('span[id="selection-numbers"]').contains('5 - 16 - 20 - 38 - 49');

        cy.get('button[id="8-star"]').click();
        cy.get('button[id="3-star"]').click();
        cy.get('span[id="selection-stars"]').contains('3 - 8');
    });

    it("Selected balls are sent to the request body", () => {
        cy.intercept('POST', '/smart-pick/draw*').as('generate-button-action')

        cy.visit("/smartpick");
  
        cy.get('button[id="1-number"]').click();
        cy.get('button[id="2-number"]').click();
        cy.get('button[id="1-star"]').click();

        cy.get('button[id="generate-button"]').click();

        cy.wait('@generate-button-action');

        cy.get('@generate-button-action')
          .its('request.body')
          .should(
            'deep.equal',
            [
                {
                    "number": 1,
                    "type": "NUMBER"
                },
                {
                    "number": 2,
                    "type": "NUMBER"
                },
                {
                    "number": 1,
                    "type": "STAR"
                }
            ]
          )
      });

    it("Reset button empties selection", () => {
        cy.visit("/smartpick");
  
        cy.get('button[id="1-number"]').click().should('have.class', 'ball-selected');
        cy.get('button[id="2-number"]').click().should('have.class', 'ball-selected');
        cy.get('button[id="1-star"]').click().should('have.class', 'ball-selected');
        cy.get('span[id="selection-numbers"]').contains('1 - 2');
        cy.get('span[id="selection-stars"]').contains('1');

        cy.get('button[id="reset-button"]').click();

        cy.get('button[id="1-number"]').should('have.class', 'ball');
        cy.get('button[id="2-number"]').should('have.class', 'ball');
        cy.get('button[id="1-star"]').should('have.class', 'ball');
        cy.get('span[id="selection-numbers"]').should('have.value', '');
        cy.get('span[id="selection-stars"]').should('have.value', '');
    });

    it("Success of probability is calculated when selection is full", () => {
        cy.intercept(
            {
              method: 'POST',
              url: '/smart-pick/draw*',
            },
            { "balls": [
                {
                    "number": 1,
                    "type": "NUMBER"
                },
                {
                    "number": 2,
                    "type": "NUMBER"
                },
                {
                    "number": 3,
                    "type": "NUMBER"
                },
                {
                    "number": 4,
                    "type": "NUMBER"
                },
                {
                    "number": 5,
                    "type": "NUMBER"
                },
                {
                    "number": 11,
                    "type": "STAR"
                },
                {
                    "number": 12,
                    "type": "STAR"
                }
            ], 
            "probability": 4.1
            }
          ).as('generate-button-action');

        cy.visit("/smartpick");

        cy.get('button[id="generate-button"]').click();

        cy.wait('@generate-button-action');

        cy.get('h1[id="probability"]').contains('4%');
    });
  });