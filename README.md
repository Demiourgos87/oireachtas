# Oireachtas project

## 1 - Project overview
The main goal of this demo project is to reflect my idea of what an ideal front-end app should look like, having in mind tooling, structure, and procedures to ensure easy code maintainability and scalability.

Second goal would be to demonstrate (hopefully successfully) React best practices and performance optimization techniques.

The tech stack used is React with Typescript, and MaterialUI as a component library.


## 2 - Project setup
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

Create a local .env from the example
```
cp .env.example .env.local
```

Run the development server with:

```
npm run dev
```

The development server starts at [http://localhost:5173](http://localhost:5173) by default.


## 3 - Project structure
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
+--stores       # global stores shared accross the application
|
+--styles       # shared styles accross the application
|
+--types        # shared types used across the application
|
+--utils        # shared utility functions
```

The main principle regarding components to follow is colocation, meaning that all the code a component needs, sits in that components directory, such as the component itself, subcomponents, if they are not used elsewhere, hooks, styling files, test files, etc.

If a component uses something that is not specific just to itself, then that code should be moved to a shared place.


## 4 - Tooling and standards
Tools and standards used in this project are:
- [Vite](https://vite.dev/) as a tooling solution and bundler
- [Vitest](https://vitest.dev/) a performant unit testing framework powered by Vite
- [ESLint](https://eslint.org/) to ensure identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs
- [Prettier](https://prettier.io/) code formatter to ensure consistent coding style. Some custom formatting rules are applied, as well as imports sorting
- [Husky](https://typicode.github.io/husky/) for implementing and executing git hooks to ensure that code with errors doesn't get pushed to the repository. In the case when pushing something that does not need tests or app building, the checks can be skipped by using the `--no-verify` flag, for example ``` git commit -m "commit description" --no-verify ```
  - pre-commit hook is set up to check for linting errors, and run tests
  - pre-push hook is set up to run the project for production and ensure the application builds before pushing to remote origin
- Utilize .env for managing environment variables
- Absolute imports, to make it easier to import components, hooks, utils, etc, and avoid messy import paths
- When developing the application, always use the `dev` branch, and upon completing the code, a pull request should be made for it to be merged into `main` branch


## 5 - API communication
Since the API is very simple, only `GET` requests, a native browser `fetch` API for retreiving the data is used.

`useGetData` hook handles all communication, including building of the query parameters that are necessary for pagination and filters.

Pagination is handled via the API `limit` and `skip` query parameters.

Filtering uses additional parameter, `bill_status`, and is handled through a multi select component.


## 6 - State management
[Zustand](https://zustand-demo.pmnd.rs/) is used for the favourites functionality, implementing a global store to hold the information on favoured bills, and handle adding/removing them, with persisting the state to local storage.


## 7 - Styling
Since the requirement was MaterialUI, styling relies mostly on its own component styling, utilizing only inline styling where necessary.


## 8 - Performance optimizaions
Performance optimization should only be done if there is a need for it, and is causing issues. Avoid unnecessary use of `useCallback` and `useMemo` hooks unless performance is measured and they actually make impact. Overusing them result in less readable code.

I have provided some simple memoization in the project more as an example, such as memoizing the `DataTableHead` and `DataTableRow` components with `React.memo()`, and calculation of which data source to use in `DataTable` tabs with `useMemo` hook.

Some other performance optimization used is debouncing the clicks on filters.


## 9 - Testing



## Additional considerations
Some features i would like to have added are snackbars for information on adding or removing a bill from favourites