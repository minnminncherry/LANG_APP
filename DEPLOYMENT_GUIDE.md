# LANG_APP CI/CD Deployment Guide

## Overview
This project uses GitHub Actions to automatically build, test, and deploy both the React frontend and FastAPI backend to Render.com.

## Architecture
```
┌─────────────────┐
│  GitHub Actions │
│   Workflows     │
└────────┬────────┘
         │
    ┌────┴─────┐
    │           │
    ▼           ▼
┌─────────┐ ┌──────────┐
│ React   │ │ FastAPI  │
│ Build   │ │  Build   │
└────┬────┘ └────┬─────┘
     │           │
     ▼           ▼
  ┌──────────────────────┐
  │   Render.com Deploy  │
  │  (Static + Backend)  │
  └──────────────────────┘
```

## Prerequisites

### 1. Render.com Setup
- Create a Render account at https://render.com
- Create a new Web Service for the backend
- Create a static site service for the frontend
- Note the service IDs for webhook configuration

### 2. MySQL Database Setup
- Create a MySQL database (local or managed)
- Store the connection string as `DATABASE_URL`
- Example: `mysql+pymysql://user:password@host:3306/lang_app_db`

### 3. GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

```
RENDER_FRONTEND_DEPLOY_HOOK    - Render deploy hook for frontend
RENDER_BACKEND_DEPLOY_HOOK     - Render deploy hook for backend
DATABASE_URL                   - MySQL connection string
```

#### How to get Render Deploy Hooks:
1. Go to your Render service
2. Click "Settings" → "Deploy Hooks"
3. Click "Create Deploy Hook"
4. Copy the URL

## Setting Up Render Deploy Hooks

### Frontend Deploy Hook
1. In Render dashboard, go to your frontend service
2. Settings → Deploy → Manual Deploy (or add custom hook)
3. Create a deploy hook and add the URL as `RENDER_FRONTEND_DEPLOY_HOOK` secret

### Backend Deploy Hook
1. In Render dashboard, go to your backend service
2. Settings → Deploy → Manual Deploy (or add custom hook)
3. Create a deploy hook and add the URL as `RENDER_BACKEND_DEPLOY_HOOK` secret

## Environment Variables in Render

### Frontend Service
- `REACT_APP_API_URL=https://your-backend.onrender.com`

### Backend Service
- `DATABASE_URL=your_mysql_connection_string`
- `PYTHONUNBUFFERED=true`
- `CORS_ORIGINS=["https://your-frontend.onrender.com"]`

## CI/CD Pipeline Workflow

### Triggers
- **Build & Test**: Triggered on every push to any branch and all PRs
- **Deploy**: Triggered only on push to `main` branch after successful build

### Jobs

#### 1. Build Job
- Sets up Node.js and Python environments
- Installs dependencies for both React and FastAPI
- Builds the React app (output to `dist/`)
- Runs Python tests (if test files exist)
- Uploads React build artifacts

#### 2. Deploy Frontend Job
- Runs only on push to `main`
- Rebuilds React app
- Triggers Render deployment via webhook

#### 3. Deploy Backend Job
- Runs only on push to `main`
- Triggers Render deployment via webhook

## Local Development

### Start Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```
Backend runs at: `http://localhost:8000`

### Start Frontend
```bash
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

### Access API
- Backend: http://localhost:8000
- Health check: http://localhost:8000/health
- Frontend: http://localhost:5173

## Testing

### Python Backend Tests
```bash
pip install pytest httpx
pytest backend/ -v
```

### React App Build
```bash
npm run build
npm run preview
```

## Database Setup

### MySQL Setup
```sql
CREATE DATABASE lang_app_db;
CREATE USER 'lang_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON lang_app_db.* TO 'lang_user'@'localhost';
FLUSH PRIVILEGES;
```

### Update backend/app.py for Database
If you need database integration, update `backend/app.py`:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
```

## Troubleshooting

### Deploy Hook Not Working
- Verify the webhook URL is correctly set in GitHub secrets
- Check Render service settings for deploy hooks
- Ensure service is not on "paused" status

### Database Connection Errors
- Verify `DATABASE_URL` format: `mysql+pymysql://user:password@host:port/database`
- Ensure MySQL server is running
- Check firewall/network access from Render to database

### Build Failures
- Check GitHub Actions logs for detailed error messages
- Verify `package.json` scripts are correct
- Ensure `backend/requirements.txt` has all dependencies

### CORS Issues
- Update `CORS_ORIGINS` in backend service environment variables
- Format should be: `["https://frontend-url.onrender.com"]`

## Monitoring

### GitHub Actions
- Go to Actions tab to view workflow runs
- Check logs for any build or deployment errors

### Render Dashboard
- Monitor service logs in real-time
- Check health status of services
- View deployment history

## Security Best Practices

1. **Never commit secrets** - Use GitHub Secrets
2. **Rotate credentials** - Change DATABASE_URL periodically
3. **Use environment variables** - Keep sensitive data out of code
4. **Enable branch protection** - Require PR reviews before merge to main
5. **Monitor deployments** - Check Render logs regularly

## Next Steps

1. Configure GitHub Secrets with your Render webhooks
2. Set DATABASE_URL for MySQL connection
3. Push to main branch to trigger first deployment
4. Monitor GitHub Actions and Render logs
5. Test frontend and backend functionality on Render

## Support
For issues with:
- **GitHub Actions**: Check workflow logs
- **Render deployment**: Check Render service logs
- **Database**: Verify MySQL connection string
- **CORS/API**: Check browser console and backend logs
