#!/bin/bash

echo "🚀 Deploying Grammar Rush V2 to GitHub Pages..."

# Step 1: Install dependencies if needed
echo "📦 Checking for dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Step 2: Build the project
echo "🏗️ Building the project..."
npm run build

# Step 3: Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete! Your game should be available at your GitHub Pages URL soon."
echo "🌐 Make sure your GitHub repository is configured to use the gh-pages branch for GitHub Pages."
echo "📝 If this is your first deployment, it may take a few minutes for the site to become available."