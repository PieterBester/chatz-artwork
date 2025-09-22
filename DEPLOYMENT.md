# Deployment Guide - Artwork Autobrander

This guide will help you deploy the Artwork Autobrander to Render so you can access it from anywhere.

## Option 1: Deploy to Render (Recommended)

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Artwork Autobrander"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/artwork-autobrander.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Go to Render Dashboard**:
   - Visit [render.com](https://render.com)
   - Sign in to your account

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `artwork-autobrander` repository

3. **Configure the Service**:
   - **Name**: `artwork-autobrander` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Choose `Starter` (free tier) or `Standard` for better performance

4. **Environment Variables** (Optional):
   - `NODE_ENV`: `production`
   - `NEXT_TELEMETRY_DISABLED`: `1`

5. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Wait for deployment to complete (usually 2-5 minutes)

6. **Access Your App**:
   - Once deployed, you'll get a URL like: `https://artwork-autobrander.onrender.com`
   - Bookmark this URL for easy access

### Step 3: Custom Domain (Optional)

1. **Add Custom Domain**:
   - In your Render dashboard, go to your service
   - Click "Settings" → "Custom Domains"
   - Add your domain (e.g., `artwork.yourdomain.com`)
   - Follow the DNS configuration instructions

## Option 2: Deploy with Docker

If you prefer Docker deployment:

1. **Build the Docker Image**:
   ```bash
   docker build -t artwork-autobrander .
   ```

2. **Run Locally** (for testing):
   ```bash
   docker run -p 3000:3000 artwork-autobrander
   ```

3. **Deploy to Render with Docker**:
   - In Render, select "Docker" as the environment
   - Render will automatically use your Dockerfile

## Option 3: Deploy to Other Platforms

### Vercel (Alternative)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Configure redirects for SPA routing

## Post-Deployment Configuration

### 1. Update Store Information
After deployment, you can update store details by:
- Editing `src/config/stores.ts`
- Committing and pushing changes
- Render will automatically redeploy

### 2. Add Store Logos
1. Upload your store logos to `public/logos/`
2. Update the logo paths in `src/config/stores.ts`
3. Commit and push changes

### 3. Environment-Specific Settings
Create a `.env.production` file for production-specific settings:
```env
NEXT_PUBLIC_APP_URL=https://your-app-url.onrender.com
NEXT_PUBLIC_APP_NAME=Artwork Autobrander
```

## Monitoring and Maintenance

### 1. View Logs
- In Render dashboard, go to your service
- Click "Logs" to view real-time logs
- Monitor for any errors or issues

### 2. Performance Monitoring
- Render provides basic performance metrics
- Monitor response times and error rates
- Upgrade to paid plan for better monitoring

### 3. Automatic Deployments
- Render automatically redeploys when you push to main branch
- You can disable auto-deploy in settings if needed
- Manual deployments available in the dashboard

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **App Not Loading**:
   - Check if the service is running (green status)
   - Verify the start command is correct
   - Check environment variables

3. **Image Processing Issues**:
   - Ensure the app has sufficient memory
   - Consider upgrading to a paid plan for better performance
   - Check browser console for client-side errors

4. **Slow Performance**:
   - Free tier has limited resources
   - Consider upgrading to Standard plan
   - Optimize image sizes before upload

### Getting Help

1. **Render Support**:
   - Check Render documentation
   - Contact Render support for platform issues

2. **App Issues**:
   - Check the logs in Render dashboard
   - Review the code in `src/lib/imageProcessor.ts`
   - Test locally first: `npm run dev`

## Security Considerations

1. **Environment Variables**:
   - Don't commit sensitive data to Git
   - Use Render's environment variable system

2. **File Uploads**:
   - The app processes images client-side
   - No server-side file storage
   - Images are processed in the browser

3. **Access Control**:
   - Consider adding authentication if needed
   - The app is currently public (no login required)

## Cost Considerations

### Render Free Tier
- 750 hours/month
- Sleeps after 15 minutes of inactivity
- Cold start takes ~30 seconds
- Perfect for personal/small business use

### Render Paid Plans
- Always-on service
- Better performance
- Custom domains
- More resources

## Next Steps

1. **Deploy the app** using the steps above
2. **Test thoroughly** with your actual artwork
3. **Share the URL** with your team
4. **Monitor usage** and upgrade if needed
5. **Add custom domain** for professional appearance

Your Artwork Autobrander will be accessible from anywhere once deployed! 🚀
