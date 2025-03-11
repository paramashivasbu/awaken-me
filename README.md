# Meditation Alarm App

A React application that replaces jarring alarm sounds with gentle voice prompts and soothing guided meditations that must complete before the alarm can be dismissed.

## Features

- Time picker interface with smooth animations for setting alarm time
- Library of guided meditations with varying lengths (5-15 minutes)
- Gradual volume increase feature that starts very soft and builds slowly
- Simple meditation progress indicator that shows time remaining
- Alarms that require meditation completion before dismissal

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to the local server URL (typically http://localhost:5173)

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory and can be served using any static file server.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- ShadCN UI Components
- Vite
