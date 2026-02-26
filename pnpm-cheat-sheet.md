# Install Dependencies

### Install all dependencies in the monorepo

`pnpm install`

### Install dependencies in a specific workspace

`pnpm install --filter frontend`

`pnpm install --filter backend`

### Install devDependencies at the root (workspace-wide)

`pnpm add -D typescript ts-node prettier eslint -w`

### or

`pnpm add -D typescript ts-node prettier eslint --workspace-root`

# Add Packages

### Runtime dependency in a specific workspace

For example:

`pnpm add react react-dom --filter frontend`

`pnpm add express @types/express --filter backend`

`pnpm add lodash --filter shared`

### Add devDependencies to a specific workspace

`pnpm add -D jest ts-jest --filter backend`

# Remove Packages

`pnpm remove react --filter frontend`

`pnpm remove express --filter backend`

# Update Dependencies

### Update a single dependency in a workspace

`pnpm up react --filter frontend`

### Update all dependencies in all workspaces

`pnpm up -r`
