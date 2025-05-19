# Files to Include in Your GitHub Repository

The following files should be included when you push this project to GitHub:

## Core Application Files
- `src/` directory (contains all React components and game logic)
  - `App.js` - Main application component
  - `App.css` - Main styles
  - `index.js` - React entry point
  - `index.css` - Global styles
  - `questionGenerator.js` - Game question logic

## Configuration Files
- `package.json` - Project dependencies and scripts
- `package-lock.json` - Dependency lock file
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.gitignore` - Git ignore rules

## Public Assets
- `public/` directory
  - `index.html` - HTML template
  - `manifest.json` - Web app manifest

## Documentation
- `README.md` - Project documentation
- `GITHUB_SETUP.md` - GitHub Pages setup guide
- `LICENSE` - MIT license

## GitHub Specific
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment

## Helper Scripts
- `deploy.sh` - Deployment helper script

## Instructions for GitHub

1. Create a new repository on GitHub named `grammar-rush-v2`
2. Initialize it with a README (if not already created)
3. Clone the repository to your local machine
4. Copy all the files listed above into the cloned repository
5. Commit and push the changes to GitHub
6. GitHub Actions will automatically deploy your site to GitHub Pages

Remember to update the `homepage` field in `package.json` with your actual GitHub username:
```
"homepage": "https://yourusername.github.io/grammar-rush-v2"
```