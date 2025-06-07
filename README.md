# Productivity Companion

A comprehensive productivity and wellness application designed to help you optimize your daily routine, track progress, and achieve your goals through data-driven insights and AI coaching.

## ✨ Features

### 📊 **Dashboard & Analytics**
- Personal productivity dashboard with real-time stats
- Comprehensive analytics for tasks, focus time, and performance
- Weekly progress tracking and completion rates
- Gamified point system with streaks and leaderboards

### ✅ **Task Management**
- Advanced task creation and management
- Priority-based task organization
- Daily task tracking and completion
- Focus time monitoring

### 📅 **Schedule Optimization**
- Smart schedule planning and optimization
- Meeting management and coordination
- Calendar integration and time blocking
- Automated scheduling suggestions

### 🏃‍♂️ **Health & Wellness Integration**
- Wearable device connectivity (fitness trackers, smartwatches)
- Daily check-in system for mood and energy tracking
- Health metrics integration
- Wellness goal setting and monitoring

### 🤖 **AI-Powered Coaching**
- Personalized productivity insights
- AI-driven recommendations
- Performance optimization suggestions
- Adaptive goal setting

### 🏆 **Social & Gamification**
- Leaderboards and ranking system
- Achievement tracking and rewards
- Progress sharing and accountability
- Streak tracking for habit building

### 🔐 **Authentication & Security**
- Secure user authentication via Supabase
- Personal profile management
- Data privacy and security
- Cross-device synchronization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: Multiple database support (Supabase, PostgreSQL, SQLite, etc.)
- **ORM**: Drizzle ORM with migrations
- **Authentication**: Supabase Auth
- **TypeScript**: Full type safety
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd productive
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your database and Supabase credentials in `.env.local`

5. Run database migrations:
```bash
pnpm db:push
```

6. Start the development server:
```bash
pnpm dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Application Structure

- **`/app`** - Next.js app router pages and API routes
- **`/components`** - Reusable UI components organized by atomic design
  - `atoms/` - Basic UI elements
  - `molecules/` - Component combinations
  - `organisms/` - Complex components
- **`/lib`** - Utility functions and configurations
- **`/hooks`** - Custom React hooks
- **`/utils`** - Helper functions

## 🗄️ Database Management

```bash
# Generate migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Push schema changes
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

## 🔧 Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 📊 Key Features Deep Dive

### Task Management
Complete task lifecycle management with priority levels, due dates, and progress tracking.

### Schedule Optimization
AI-powered schedule optimization that learns from your patterns and suggests optimal time blocks.

### Wearables Integration
Connect popular fitness trackers and smartwatches to automatically sync health and activity data.

### Analytics Dashboard
Comprehensive insights into your productivity patterns, helping you identify peak performance times.


## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please reach out through the application's feedback system or create an issue in this repository.