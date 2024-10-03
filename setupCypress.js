const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const initCypressProject = () => {
console.log("Inicializando o Projeto Cypress.......");
execSync("npx cypress install", { stdio: "inherit" });


const dirs = ["cypress", "cypress/e2e","cypress/fixtures", "cypress/screenshots", "cypress/support"];
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Criando os Diretórios: ${dir}`);
  }
});

// Arquivo cypress.config.js
const cypressConfigContent = `
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    experimentalRunAllSpecs: false,
    video: false,
    setupNodeEvents(on, config) {
      
    },
    specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}'
  }
});
`;
fs.writeFileSync(path.join("cypress.config.js"), cypressConfigContent);
console.log("Criando o cypress.config.js");

// Arquivo e2e.js
const e2eContent = `
import './commands';
import "cypress-real-events";
`;
fs.writeFileSync(path.join("cypress/support/e2e.js"), e2eContent);
console.log("Criando o cypress/support/e2e.js");

// Arquivo commands.js
const commandsContent = `

`;
fs.writeFileSync(path.join("cypress/support/commands.js"), commandsContent);
console.log("Criando o cypress/support/commands.js");

// Arquivo Teste Exemplo
const testExemplo = `
describe('Exemplo de aplicação de tarefas', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo');
  });

  it('deve exibir dois itens de tarefa por padrão', () => {
    cy.get('.todo-list li').should('have.length', 2);
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
  });

  it('deve permitir adicionar novas tarefas', () => {
    const newItem = 'Feed the cat';
    cy.get('[data-test=new-todo]').type(\`\${newItem}{enter}\`);
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem);
  });

  it('deve permitir marcar um item como concluído', () => {
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check();
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed');
  });

  context('Com uma tarefa marcada como concluída', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check();
    });

    it('deve filtrar apenas as tarefas não concluídas', () => {
      cy.contains('Active').click();
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog');
      cy.contains('Pay electric bill').should('not.exist');
    });

    it('deve filtrar apenas as tarefas concluídas', () => {
      cy.contains('Completed').click();
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill');
      cy.contains('Walk the dog').should('not.exist');
    });

    it('deve permitir excluir todas as tarefas concluídas', () => {
      cy.contains('Clear completed').click();
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill');
      cy.contains('Clear completed').should('not.exist');
    });
  });
});
`;
fs.writeFileSync(path.join("cypress/e2e/teste.cy.js"), testExemplo);
console.log("Criando o cypress/e2e/teste.cy.js");

// Arquivo cypress.env.json
const cyEnvContent = `{}`;
fs.writeFileSync(path.join("cypress.env.json"), cyEnvContent);
console.log("Criando o cypress.env.json");

// Arquivo .editorconfig
const editorConfigContent = `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true`;
fs.writeFileSync(path.join(".editorconfig"), editorConfigContent);
console.log("Criando o .editorconfig");

// Arquivo .eslintrc.json
const eslintrcContent = `{
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["cypress"],
  "rules": {
    "no-console": "off",
    "prettier/prettier": "error"
  }
}
`;
fs.writeFileSync(path.join(".eslintrc.json"), eslintrcContent);
console.log("Criando o .eslintrc.json");

// Arquivo .prettierrc
const prettierrcContent = `{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
`;
fs.writeFileSync(path.join(".prettierrc"), prettierrcContent);
console.log("Criando o .prettierrc");

};
initCypressProject();
