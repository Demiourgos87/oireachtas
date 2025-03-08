# Oireachtas project

The main goal of this demo project is to reflect my idea of what an ideal front-end app should look like, having in mind tooling, structure, and procedures to ensure easy code maintainability and scalability.

Second goal would be to demonstrate (hopefully successfully) React best practices and performance optimization techniques.

## 1 - Project setup

Please make sure to use Node.js versions 18, 20, or 22+.

``` git clone git@github.com:Demiourgos87/oireachtas.git ```

``` cd oireachtas ```

``` npm i ```

Run the development server with:

``` npm run dev ```

The development server starts at [http://localhost:5173](http://localhost:5173) by default.

## 2 - Tooling
Tools used in this project are:
- [Vite](https://vite.dev/) as a tooling solution and bundler.
- [Vitest](https://vitest.dev/) a performant unit testing framework powered by Vite.
- [ESLint](https://eslint.org/) to ensure identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
- [Prettier](https://prettier.io/) code formatter to ensure consistent coding style. Some custom formatting rules are applied, as well as imports sorting.
- [Husky](https://typicode.github.io/husky/) for git pre commit and pre push hooks to ensure that code with errors doesn't get pushed to the repo.
  - pre-commit hook is set up to check for linting errors, and run tests
  - pre-push hook is set up to run the project for production and ensure the application builds before pushing to remote origin
