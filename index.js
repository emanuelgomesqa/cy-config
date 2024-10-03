const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const initCypressProject = () => {
  console.log("Inicializando o Projeto Cypress.......");

  // Instalando dependências essenciais
  execSync("npm i cypress eslint prettier", { stdio: "inherit" });
  console.log("Instalando Dependências Essenciais.......");
  execSync("npm i -D cypress-real-events faker-br", { stdio: "inherit" });

  const dirs = ["cypress", "cypress/e2e", "cypress/fixtures", "cypress/screenshots", "cypress/support"];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Criando os Diretórios: ${dir}`);
    }
  });

  // Arquivo cypress.config.js
  const cypressConfigContent = `const { defineConfig } = require('cypress');

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
  const e2eContent = `import './commands';
import "cypress-real-events";
`;
  fs.writeFileSync(path.join("cypress/support/e2e.js"), e2eContent);
  console.log("Criando o cypress/support/e2e.js");

  // Arquivo commands.js
  const commandsContent = ``;
  fs.writeFileSync(path.join("cypress/support/commands.js"), commandsContent);
  console.log("Criando o cypress/support/commands.js");

  // Arquivo Teste Exemplo
  const testExemplo = `describe('Exemplo de aplicação de tarefas', () => {
  // Seu código de testes aqui...
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

  // Modificar o package.json
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // Adiciona ou atualiza o script
    packageJson.scripts = {
      ...packageJson.scripts,
      "cypress:run": "cypress run",
      "cypress:open": "cypress open"
    };

    // Escreve as alterações de volta no package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("Scripts adicionados ao package.json");
  } else {
    console.error("package.json não encontrado.");
  }
};

initCypressProject();
