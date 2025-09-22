#!/bin/bash

# Artwork Autobrander Deployment Script
echo "🚀 Deploying Artwork Autobrander..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Artwork Autobrander"
    echo "✅ Git repository initialized"
    echo "⚠️  Don't forget to:"
    echo "   1. Create a GitHub repository"
    echo "   2. Add remote: git remote add origin <your-repo-url>"
    echo "   3. Push: git push -u origin main"
else
    echo "📝 Committing changes..."
    git add .
    git commit -m "Update Artwork Autobrander - $(date)"
    echo "✅ Changes committed"
    echo "📤 Pushing to remote..."
    git push origin main
    echo "✅ Pushed to remote repository"
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Go to https://render.com"
echo "2. Create new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Use these settings:"
echo "   - Build Command: npm install && npm run build"
echo "   - Start Command: npm start"
echo "   - Environment: Node"
echo ""
echo "Your app will be available at: https://your-app-name.onrender.com"
