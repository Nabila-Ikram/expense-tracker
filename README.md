# Expense Tracker

A full-stack personal finance management application for tracking income, expenses, budgets, savings goals, and financial activity through a responsive dashboard.

## Overview

Expense Tracker is a full-stack web application designed to help users manage their personal finances in one place.

The application allows users to create an account, record income and expenses, manage budgets, set financial goals, and monitor their financial activity through an interactive dashboard.

This project was developed to strengthen practical skills in frontend development, backend development, database management, REST APIs, authentication, and responsive user interface design.

## Features

### Authentication
- User registration and login
- Password hashing
- Account-based data management
- Persistent login state

### Transaction Management
- Add income and expense transactions
- Edit transactions
- Delete transactions
- Categorize transactions
- Add descriptions
- Select transaction dates
- Validate expenses against available balance

### Dashboard
- Display total balance
- Display total income
- Display total expenses
- Monthly financial overview
- Interactive balance visualization
- Financial data analysis

### Budget Management
- Create budgets
- Track spending against budgets
- Display budget progress
- Edit budgets
- Delete budgets
- Prevent spending from exceeding available budget limits

### Goal Management
- Create financial goals
- Set target amounts
- Track saved amounts
- Monitor goal progress
- Edit goals
- Delete goals

### Settings
- View profile information
- Manage account preferences
- Security settings
- Theme preferences

### User Interface
- Responsive design
- Mobile, tablet, and desktop support
- Dark and light themes
- Reusable React components
- Interactive notifications
- Responsive forms and layouts

## Technology Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- React Router
- React Icons
- Recharts

### Backend

- Python
- Flask
- Flask-CORS
- SQLAlchemy
- REST API

### Database

- SQL Database
- SQLAlchemy ORM

### Development Tools

- Git
- GitHub
- Visual Studio Code

## Architecture

The application follows a client-server architecture.

```text
React Frontend
      |
      | HTTP / REST API
      |
      v
Flask Backend
      |
      | SQLAlchemy ORM
      |
      v
SQL Database
