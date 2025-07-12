# Training Wheels

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🔒 Security Features

This template includes basic security measures to protect your application:

### Security Headers
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer-Policy**: Controls referrer information sent to other sites
- **Permissions-Policy**: Restricts browser features (camera, microphone, etc.)

### Environment Validation
- Automatically checks that required environment variables are set
- Prevents runtime errors from missing API keys
- Provides clear error messages for missing variables

### Rate Limiting
- Built-in rate limiting utility for AI API calls
- Prevents abuse and protects your API keys
- Configurable limits and time windows

These security features work automatically and don't require configuration.

## 🛠️ Environment Setup

### Required Environment Variables

Create a `.env.local` file in your project root with these variables:

```bash
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI API Keys (Optional - add as needed)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
FAL_API_KEY=your_fal_api_key
```

### Security Best Practices

1. **Never commit API keys to version control**
   - The `.env.local` file is already in `.gitignore`
   - Use different keys for development and production

2. **Use environment variables for all secrets**
   - API keys, database URLs, and other sensitive data
   - Never hardcode secrets in your code

3. **Validate environment variables**
   - The template automatically checks for required variables
   - Add validation for any new required variables

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🔧 Using Security Features

### Rate Limiting in API Routes

```typescript
import { rateLimit } from '@/lib/rateLimit'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Get user identifier (IP address, user ID, etc.)
  const identifier = request.ip || 'anonymous'
  
  // Check rate limit (10 requests per minute)
  if (!rateLimit(identifier, 10, 60000)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }
  
  // Your API logic here
  return NextResponse.json({ success: true })
}
```

### Environment Variable Validation

```typescript
import { validateEnv, getEnvVar } from '@/lib/env'

// Validate all required variables
validateEnv()

// Get a required environment variable
const apiKey = getEnvVar('OPENAI_API_KEY')

// Get an optional environment variable with fallback
const maxRequests = getEnvVar('MAX_REQUESTS', '10')
```

### Adding New Required Environment Variables

1. Add the variable to `src/lib/env.ts`:
```typescript
const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'YOUR_NEW_VARIABLE' // Add here
] as const
```

2. The validation will automatically check for it on app startup.

## 🚨 Troubleshooting

### Common Security Issues

**"Missing required environment variables" error**
- Check that your `.env.local` file exists in the project root
- Ensure all required variables are set (no empty values)
- Restart your development server after adding environment variables

**Rate limiting not working**
- Make sure you're using the same identifier consistently
- Check that the rate limit function is called before your API logic
- Consider using user IDs instead of IP addresses for better tracking

**Security headers not applied**
- The middleware only applies to non-API routes
- Check that your route is not in the excluded patterns
- Restart your development server after changes

> **🚨 IMPORTANT: After cloning, rename the project folder and update the project name in files before starting development.**

## 🏷️ How to Rename Your Project

After cloning this repo, follow these steps to personalize your project:

1. **Rename the project folder:**
   - Move or rename the folder to your desired project name.
   - Example (in your terminal):
     ```bash
     mv training-wheels my-new-project
     cd my-new-project
     ```

2. **Update the project name in `package.json`:**
   - Open `package.json`
   - Change the `"name"` field to your new project name

3. **Update the README:**
   - Change the project title at the top of `README.md` to your new project name

4. **(Optional) Update any other references:**
   - Search the codebase for the old project name and update as needed

5. **Commit your changes:**
   ```bash
   git add package.json README.md
   git commit -m "chore: rename project"
   ```

6. **(Optional) Update your remote repository:**
   - If you want to push to a new GitHub repo, follow [GitHub's guide](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository)
