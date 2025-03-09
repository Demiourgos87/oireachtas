# Oireachtas project

## 1 - Project overview
The main goal of this demo project is to reflect my idea of what an ideal front-end app should look like, having in mind tooling, structure, and procedures to ensure easy code maintainability and scalability.

Second goal would be to demonstrate (hopefully successfully) React best practices and performance optimization techniques.

The tech stack used is React with Typescript, and MaterialUI as a component library.


## 2 - Project structure
```
src
|
+--api          # exported API request declarations and api hooks
|
+--assets       # contains all the static files such as images, fonts, etc
|
+--components   # shared components used across the application
|
+--hooks        # shared hooks used across the application
|
+--types        # shared types used across the application
|
+--utils        # shared utility functions
```

The main principle regarding components to follow is colocation, meaning that all the code a component needs, sits in that components directory, such as the component itself, subcomponents, if they are not used elsewhere, hooks, styling files, test files, etc.

If a component uses something that is not specific just to itself, then that code should be moved to a shared place.


## 3 - Tooling and standards
Tools and standards used in this project are:
- [Vite](https://vite.dev/) as a tooling solution and bundler.
- [Vitest](https://vitest.dev/) a performant unit testing framework powered by Vite.
- [ESLint](https://eslint.org/) to ensure identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.
- [Prettier](https://prettier.io/) code formatter to ensure consistent coding style. Some custom formatting rules are applied, as well as imports sorting.
- [Husky](https://typicode.github.io/husky/) for implementing and executing git hooks to ensure that code with errors doesn't get pushed to the repository. In the case when pushing something that does not need tests or app building, the checks can be skipped by using the `--no-verify` flag, for example ``` git commit -m "commit description" --no-verify ```
  - pre-commit hook is set up to check for linting errors, and run tests
  - pre-push hook is set up to run the project for production and ensure the application builds before pushing to remote origin
- Absolute imports, to make it easier to import components, hooks, utils, etc, and avoid messy import paths.
- When developing the application, always use the `dev` branch, and upon completing the code, a pull request should be made for it to be merged into `main` branch.


## 4 - Project setup

Please make sure to use Node.js versions 18, 20, or 22+.

```
git clone git@github.com:Demiourgos87/oireachtas.git
```

```
cd oireachtas
```

```
npm i
```

Run the development server with:

```
npm run dev
```

The development server starts at [http://localhost:5173](http://localhost:5173) by default.


## 5 - 