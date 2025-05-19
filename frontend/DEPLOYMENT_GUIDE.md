# Step-by-Step Guide to Deploy Grammar Rush V2 to GitHub Pages

## Prerequisites
- A GitHub account
- Git installed on your computer
- Node.js and npm installed on your computer

## Steps

### 1. Create a New GitHub Repository

1. Go to [GitHub](https://github.com) and log in to your account
2. Click the "+" icon in the upper right corner and select "New repository"
3. Name your repository `grammar-rush-v2`
4. Add a description (optional): "A cyberpunk-themed grammar game built with React"
5. Keep it as a Public repository
6. Initialize with a README (optional)
7. Click "Create repository"

### 2. Clone the Repository to Your Computer

```bash
git clone https://github.com/yourusername/grammar-rush-v2.git
cd grammar-rush-v2
```

### 3. Copy the Game Files

Copy all the files from your downloaded project folder into this repository.

### 4. Update the Homepage URL

Open `package.json` and update the homepage field with your GitHub username:

```json
"homepage": "https://yourusername.github.io/grammar-rush-v2",
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Commit and Push to GitHub

```bash
git add .
git commit -m "Initial commit: Grammar Rush V2 game"
git push origin main
```

### 7. Deploy to GitHub Pages

You have two options:

**Option 1: Manual Deployment**
```bash
npm run deploy
```

**Option 2: Automatic Deployment via GitHub Actions**
The GitHub Actions workflow will automatically deploy your site when you push to the main branch.

### 8. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to the "Pages" section in the left sidebar
4. Under "Source", ensure it's set to deploy from the `gh-pages` branch
5. Click "Save"

### 9. Access Your Game

After a few minutes, your game will be available at:
```
https://yourusername.github.io/grammar-rush-v2
```

### 10. Share Your Game

Share the URL with friends and enjoy playing Grammar Rush V2!