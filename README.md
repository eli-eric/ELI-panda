# ELI-PANDA 

### (ELI oPerations And maiNtenance DAtabase)

The premise that good maintenance practices are fundamental to success is beyond question. In accordance with IMPULSE Project requirements, ELI facilities had an obligation to create a joint spare parts database. The essential intention behind this requirement had several purposes, such as: to build up a relevant database in order to minimize possible downtime for user experiments, to determine which spare parts must be stocked in advance, to make cost-effective maintenance decisions.

This repository is the main frontend app(web application) written in [NEXT.JS](https://nextjs.org/) using [React](https://reactjs.org/), [TypeScript](https://reactjs.org/docs/static-type-checking.html#typescript), [TailwindCSS](https://tailwindcss.com/), [NextAuth](https://next-auth.js.org/)

## Getting Started

Create ".env" file using an example env file "env-example" in the root of this app. With no changes of the example file, application runs on port 5001 against mock server (pages/api/mock-server).

Run the development server:

```bash
yarn dev
```

Open [http://localhost:5001](http://localhost:5001) with your browser to see the result.

## Backend for this UI

The only way how to access data in PANDA database is ELI PANDA REST API.

More information in API repository's [readme.md](https://github.com/eli-eric/eli-panda-api/tree/main) 



