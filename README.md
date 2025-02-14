# renat.ai - Advanced AGI Assistant

An advanced AI chat assistant powered by DAIAS, built with React, TypeScript, and Supabase.

![renat.ai](https://renat.ai/og-image.png)

## Features

- 🧠 Advanced AI chat interface powered by OpenAI
- 🔒 Secure authentication with Supabase
- 💫 Beautiful animations and visual effects
- 🎨 Modern, responsive design with Tailwind CSS
- 🔄 Real-time message synchronization
- 📱 Cross-device conversation persistence
- 🌙 Dark mode support
- 🔑 Password reset functionality
- 🎯 TypeScript for type safety

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Supabase
- **AI Integration**: OpenAI API
- **Build Tool**: Vite
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Routing**: React Router
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account
- OpenAI API key

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/renatrazumov/renat.ai.git
cd renat.ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Database Setup

The project uses Supabase for data storage. The database schema includes:

- `messages` table for storing chat messages
- Authentication tables (handled by Supabase)

Required tables will be created automatically through migrations in the `supabase/migrations` directory.

## Project Structure

```
renat.ai/
├── src/
│   ├── components/     # React components
│   ├── context/        # React context providers
│   ├── lib/           # Utility functions and API clients
│   ├── pages/         # Page components
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── supabase/         # Supabase configurations and migrations
```

## Key Components

- `ChatBot`: Main chat interface component
- `SacredGeometry`: Background animation component
- `GlitchText`: Text effect component
- `ProfileMenu`: User authentication menu
- `PulsingBackground`: Animation effect component

## Authentication Flow

1. User signs up/logs in through Supabase Auth
2. JWT tokens are automatically managed by Supabase
3. Protected routes require authentication
4. Password reset flow is handled via email

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Code Style

The project uses ESLint and TypeScript for code quality. Configuration can be found in:
- `eslint.config.js`
- `tsconfig.json`

## Deployment

The application is deployed on Netlify with the following configuration:

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Environment variables must be set in the Netlify dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Created By

Developed by [Renat Razumov](https://renatrazumov.com), powered by [DAIAS](https://daias.netlify.app/) and built with [bolt.new](https://bolt.new/?rid=1cmcp4).

## Connect

- [Twitter](https://twitter.com/renatrazumov)
- [LinkedIn](https://linkedin.com/in/renatrazumov)
- [YouTube](https://youtube.com/@renatrazumov)
- [GitHub](https://github.com/renatrazumov)
