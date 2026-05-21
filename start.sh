#!/bin/bash

# Employee Portal - Quick Start Script
# This script starts both frontend and backend servers

echo "🚀 Employee Portal - Quick Start"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+"
    exit 1
fi

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo "⚠️  MySQL command not found. Make sure MySQL is running."
fi

echo "📦 Starting services..."
echo ""

# Create a directory for logs if it doesn't exist
mkdir -p logs

# Start Backend
echo "▶️  Starting Backend Server (port 3000)..."
cd backend
npm install > /dev/null 2>&1
npm run dev &
BACKEND_PID=$!
echo "✅ Backend started with PID: $BACKEND_PID"
cd ..

# Start Frontend
echo "▶️  Starting Frontend Server (port 5173)..."
cd frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started with PID: $FRONTEND_PID"
cd ..

echo ""
echo "================================"
echo "🎉 Services are running!"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend:  http://localhost:3000"
echo ""
echo "🔐 Demo Credentials:"
echo "   Admin:    john.smith@company.com / password123"
echo "   Manager:  sarah.johnson@company.com / password123"
echo "   Employee: michael.chen@company.com / password123"
echo ""
echo "❌ To stop, press Ctrl+C"
echo "================================"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
