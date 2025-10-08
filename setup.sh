#!/bin/bash

# AI Companion App - Phase 1 Setup Script
echo "🚀 Setting up AI Companion App - Phase 1"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "   Please upgrade Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file if it doesn't exist (for future phases)
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file for future phases..."
    cat > .env.local << EOF
# Environment variables for future phases
# Phase 2: Social Media Features
# Phase 3: AI Companion & Authentication

# Future authentication (Phase 3)
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your-secret-key-here
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
# APPLE_ID=your-apple-id
# APPLE_SECRET=your-apple-secret
EOF
    echo "✅ .env.local file created for future phases"
else
    echo "✅ .env.local file already exists"
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "⚠️  Type check found some issues, but continuing..."
else
    echo "✅ Type check passed"
fi

# Build the project
echo "🏗️  Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Open http://localhost:3000 in your browser"
echo "   3. Test the application on different devices"
echo ""
echo "📱 Features available:"
echo "   • Landing page with hero section"
echo "   • Search interface with suggestions"
echo "   • Content display with metrics"
echo "   • Responsive design (mobile, tablet, desktop)"
echo "   • PWA capabilities"
echo ""
echo "🔧 Development commands:"
echo "   • npm run dev     - Start development server"
echo "   • npm run build   - Build for production"
echo "   • npm run start   - Start production server"
echo "   • npm run lint    - Run ESLint"
echo ""
echo "📚 Documentation: See README.md for detailed information"
echo ""
echo "Happy coding! 🚀"
