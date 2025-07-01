# Admin Dashboard Test

React + Vite + TypeScript project with configured code formatting.

## Technologies

- React 19
- Vite
- TypeScript
- ESLint
- Prettier

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

## Code Formatting

### Automatic Formatting

The project is configured for automatic formatting when:

- Saving a file (`Ctrl+S`)
- Pasting code (`Ctrl+V`)
- Switching between files (thanks to `files.autoSave: "onFocusChange"`)

### Manual Formatting

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check

# Fix ESLint errors
npm run lint:fix
```

## VS Code Settings

The project includes VS Code settings for automatic formatting:

- **Prettier** - main formatter for all files
- **ESLint** - code quality checking
- **Auto-save** when switching between files
- **Automatic error fixing** when saving

### Recommended Extensions

When opening the project, VS Code will suggest installing recommended extensions:

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Path Intellisense

## Project Structure

```
src/
├── App.tsx          # Main component
├── main.tsx         # Entry point
├── App.css          # Application styles
└── index.css        # Global styles
```

## Configuration

- `.prettierrc` - Prettier settings
- `.prettierignore` - files excluded from formatting
- `eslint.config.js` - ESLint configuration with Prettier integration
- `.vscode/settings.json` - VS Code settings for the project

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
