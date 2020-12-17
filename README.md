# nwd-server-boilerplate

Boilerplate of networkdefines server

<br>

## Configuration

Make a .env.local .env.dev .env using .env.sample

- `.env.local` : for local envrionment
- `.env.dev` : for dev server environment
- `.env` : for production server environment

<br>

## Installation

```shell
$ yarn install

or

$ npm install
```

<br>

## Run server

**local environment**

```shell
$ yarn local
```
<br>

**development environment**

```shell
$ yarn dev
```
<br>

**production environment**

```shell
$ yarn tsc
$ npx ts-node dist/server.ts
```
<br>
