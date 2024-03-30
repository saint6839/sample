# nest-init-app-factory

## To import other tools inside your tool - you must link external workspaces using:

```bash
yarn link:workspaces
```

or just install deps:

```bash
yarn
```

## To use this tool in your project, just import it using the following syntax:

```ts
import { nestInitAppFactory } from 'packages/nest-init-app-factory';
```

## To build your tool use command:

```ts
npx nx run nest-init-app-factory:build
```

## To run your tool build use the command:

```ts
npx nx run nest-init-app-factory:run
```
