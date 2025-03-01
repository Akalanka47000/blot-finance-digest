# Finance Digest

This is a [Turborepo](https://turbo.build/repo) designed to house all components of the Finance digest application

</br>

## [API Documentation](https://documenter.getpostman.com/view/32343835/2sAYdhKqVB)

## File Structure

- client - Frontend application for Finance digest
- packages - All shared packages
  - config-eslint - ESLint configurations
  - constants - Common constants
  - types - Common type definitions
- patches - Patches for node modules
- server - Backend service for Finance digest
- commitlint.config.js - Commitlint configuration file
- lefthook.yml - Lefthook configuration file
- tsconfig.json - Base TypeScript configuration file
- turbo.json - Turbo configuration file

</br>

## Prerequisites

- [Bun](https://bun.sh) (v1.2.0 or higher).
- You will need to create a `.env` at the root of every workspace and fill in the required keys. The services will not start without them.
- A [Postgres](https://www.postgresql.org) and a [Redis](https://redis.io/) data source.
- An AWS account with an S3 bucket for file storage.

</br>

## Commands

- `bun install` - Installs all dependencies for all workspaces
- `bun dev` - Runs a development server for both client and server

## Running migrations

- `bun migrate --filter server` - Runs migrations for the server workspace, or you could navigate to the server workspace and run `bun migrate`

</br>

## Utilities

This turborepo has some additional tools already setup for you:

- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
