# Setup & Deployment Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm, yarn, or pnpm package manager
- Git (for version control)

### Installation

```bash
# 1. Navigate to project directory
cd cwh-cart

# 2. Install dependencies
npm install
# or
pnpm install
# or
yarn install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:5173
```

The development server will automatically reload when you save changes (Hot Module Replacement).

---

## 📦 Available Scripts

### Development
```bash
npm run dev
# Starts Vite dev server with HMR on http://localhost:5173
```

### Build
```bash
npm run build
# Builds for production with optimizations
# Output: dist/ directory
```

### Preview
```bash
npm run preview
# Preview production build locally
```

### Lint
```bash
npm run lint
# Run ESLint on source files
```

---

## 🌐 Deployment

### Vercel (Recommended)

Vercel provides the best experience for Vite + React applications.

#### Option 1: Deploy via CLI
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
```

#### Option 2: Deploy via Git
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Click "New Project"
# 4. Import your GitHub repository
# 5. Vercel automatically detects Vite setup
# 6. Click "Deploy"
```

#### Option 3: Deploy via Web Interface
1. Go to [vercel.com](https://vercel.com)
2. Sign in / Sign up
3. Click "New Project"
4. Import your repository
5. Configure settings (usually auto-detected)
6. Deploy

### GitHub Pages

```bash
# 1. Build project
npm run build

# 2. Deploy dist folder to gh-pages branch
# Use a tool like gh-pages package or manual git push
```

### Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Deploy
netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

```bash
docker build -t cwh-cart .
docker run -p 3000:3000 cwh-cart
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration (when ready)
VITE_API_URL=http://localhost:3000/api
VITE_API_KEY=your_api_key_here

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT=true

# Other config
VITE_APP_NAME=CWH Cart
VITE_APP_VERSION=1.0.0
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 🔌 Backend Integration

### Setup API Connection

Update `src/lib/utils.js` or create `src/config/api.js`:

```javascript
// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL

export const api = {
  get: (endpoint) => fetch(`${API_BASE_URL}${endpoint}`),
  post: (endpoint, data) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  // ... other methods
}
```

### Replace Mock Data

Update pages to use real data instead of `mockProducts`:

```javascript
// Before (mock)
import { mockProducts } from '../lib/utils'

// After (API)
import { api } from '../config/api'

useEffect(() => {
  api.get('/products').then(res => res.json()).then(setProducts)
}, [])
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to git
- Add to `.gitignore`:
```
.env.local
.env.*.local
```

### 2. API Security
- Use HTTPS in production
- Implement CORS properly
- Validate all inputs
- Use secure headers

### 3. Authentication
- Use secure session management
- Implement JWT or OAuth
- Store tokens securely
- Use httpOnly cookies

### 4. Payment Processing
- Never expose API keys
- Use backend for payments
- Implement PCI compliance
- Use established payment gateways

---

## 🧪 Testing

### Setup Jest & Testing Library

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### Example Test

```javascript
// src/components/Button.test.jsx
import { render, screen } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### Run Tests

```bash
npm run test
```

---

## 📊 Performance Optimization

### 1. Image Optimization
Use tools like:
- [ImageOptim](https://imageoptim.com/)
- [TinyPNG](https://tinypng.com/)
- [Cloudinary](https://cloudinary.com/)

### 2. Code Splitting
Already configured with React Router - components load on demand.

### 3. Lazy Loading
```javascript
import { lazy } from 'react'

const HeavyComponent = lazy(() => import('./Heavy'))
```

### 4. Bundle Analysis
```bash
npm install --save-dev @vitejs/plugin-visualizer
```

### 5. Caching Strategy
- Set proper cache headers in deployment
- Use CDN for static assets
- Implement service workers

---

## 🐛 Debugging

### Development Tools

1. **React DevTools**
   - Install browser extension
   - Inspect component hierarchy
   - Track state changes

2. **Vite Debug**
   ```bash
   DEBUG=* npm run dev
   ```

3. **Console Logging**
   ```javascript
   console.log('[CWH-CART] debug message:', data)
   ```

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

#### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### HMR Not Working
- Check firewall settings
- Restart dev server
- Clear browser cache

---

## 📈 Monitoring & Analytics

### Google Analytics
```bash
npm install react-ga4
```

```javascript
// main.jsx
import ReactGA from "react-ga4"
ReactGA.initialize("GA_MEASUREMENT_ID")
```

### Sentry Error Tracking
```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
})
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: dist
          path: dist/
```

---

## 🎓 Learning Resources

### Documentation
- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)

### Tutorials
- [Vite Setup Guide](https://vitejs.dev/guide/)
- [React Best Practices](https://react.dev/reference/rules)
- [Tailwind Performance](https://tailwindcss.com/docs/optimizing-for-production)

---

## 📞 Support & Troubleshooting

### Getting Help
1. Check the [ENTERPRISE_FEATURES.md](./ENTERPRISE_FEATURES.md)
2. Review component documentation in code
3. Search GitHub issues
4. Create a new issue with details

### Reporting Bugs
Include:
- Reproduction steps
- Expected behavior
- Actual behavior
- Browser/OS info
- Error messages

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Build passes without errors: `npm run build`
- [ ] All tests pass: `npm run test`
- [ ] Environment variables set correctly
- [ ] API endpoints configured
- [ ] SSL certificate installed
- [ ] DNS records configured
- [ ] CDN set up for assets
- [ ] Database migrations completed
- [ ] Monitoring/alerts configured
- [ ] Backup strategy implemented
- [ ] Security audit completed
- [ ] Performance tested
- [ ] SEO optimized
- [ ] Analytics configured
- [ ] Error tracking enabled

---

## 📝 Project Files Reference

```
.
├── src/
│   ├── components/        # All components
│   ├── pages/            # Page components
│   ├── store/            # Zustand store
│   ├── lib/              # Utilities & helpers
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind config
├── vite.config.js        # Vite config
├── .env.local           # Environment vars (git ignored)
├── ENTERPRISE_FEATURES.md
├── README.md
├── SETUP_GUIDE.md       # This file
└── IMPLEMENTATION_CHECKLIST.md
```

---

## ✨ Next Steps

1. **Customize Design**: Update colors in `tailwind.config.js`
2. **Connect Backend**: Replace mock data with API calls
3. **Add Features**: Build custom components as needed
4. **Deploy**: Push to production
5. **Monitor**: Track analytics & errors
6. **Iterate**: Gather feedback & improve

---

**Happy coding! 🎉**

For questions or updates, refer to the other documentation files or community resources.
