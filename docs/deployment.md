# Deployment Guide

This guide provides detailed instructions for deploying the GPA Calculator to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [GitHub account](https://github.com) (for automated deployments)
- Node.js 18+ and npm installed locally

## Deployment Methods

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAmaya-Wickramaarachchi%2Fgpa-calculator)

Click the button above to deploy directly to Vercel.

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # Clone the repository
   git clone https://github.com/Amaya-Wickramaarachchi/gpa-calculator.git
   cd gpa-calculator
   
   # Install dependencies
   npm install
   
   # Deploy to Vercel
   vercel --prod
   ```

### Method 3: GitHub Integration (Recommended)

1. **Fork the Repository:**
   - Go to [https://github.com/Amaya-Wickramaarachchi/gpa-calculator](https://github.com/Amaya-Wickramaarachchi/gpa-calculator)
   - Click "Fork" to create your own copy

2. **Connect to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your forked repository
   - Vercel will auto-detect the Next.js framework

3. **Configure Project:**
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 4: Automated CI/CD with GitHub Actions

This repository includes a GitHub Actions workflow for automated deployments.

1. **Set up Secrets:**
   In your GitHub repository settings, add these secrets:
   
   ```
   VERCEL_TOKEN=your_vercel_token
   ORG_ID=your_vercel_org_id
   PROJECT_ID=your_vercel_project_id
   ```

2. **Get Required IDs:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   
   # Get your org and project IDs
   cat .vercel/project.json
   ```

3. **Automatic Deployment:**
   - Push to `main` branch triggers production deployment
   - Pull requests trigger preview deployments

## Configuration Files

### vercel.json
```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "ignoreCommand": "git diff --quiet HEAD^ HEAD -- ."
}
```

### .vercelignore
The project includes a `.vercelignore` file to optimize deployment by excluding:
- `node_modules/`
- Test files
- Documentation
- Development files
- IDE and OS files

## Environment Variables

This project doesn't require any environment variables for basic functionality. If you extend the application with features that need environment variables:

1. **Local Development:**
   Create `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   ```

2. **Vercel Dashboard:**
   - Go to Project Settings
   - Navigate to Environment Variables
   - Add your variables for Production, Preview, and Development environments

## Custom Domain

1. **Add Domain:**
   - Go to your Vercel project dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Configure DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP addresses

## Performance Optimization

The project is optimized for Vercel with:
- Static generation for all pages
- Automatic code splitting
- Image optimization (if using next/image)
- Compressed assets
- CDN distribution

## Troubleshooting

### Build Failures
- Check Node.js version (requires 18+)
- Verify all dependencies are listed in `package.json`
- Review build logs in Vercel dashboard

### Deploy Issues
- Ensure `vercel.json` is properly configured
- Check that your repository is connected correctly
- Verify environment variables if used

### Performance Issues
- Use Vercel Analytics to monitor performance
- Check Core Web Vitals in Vercel dashboard
- Optimize images and reduce bundle size

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Project Repository](https://github.com/Amaya-Wickramaarachchi/gpa-calculator)