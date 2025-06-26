# Minecraft Voting Reminder App

A simple web application to help manage daily voting on Minecraft server listing websites. Never forget to vote again!

## Features

- **Username Management**: Save your username permanently on your device
- **Website Management**: Add unlimited voting websites with names and URLs
- **Copy Functionality**: One-click copy for usernames and website URLs
- **Browser Notifications**: Get reminded when it's time to vote
- **Mobile Optimized**: Works perfectly on both desktop and mobile browsers
- **Local Storage**: All data saved securely on your device

## How to Use

1. **Set Your Username**: Enter your Minecraft username - it automatically saves for future visits
2. **Add Voting Sites**: Add your server's voting websites with custom names
3. **Enable Notifications**: Click "Enable Notifications" to get voting reminders
4. **Easy Voting**: Click any website link to open it in a new tab, copy your username with one click

## Installation & Setup

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Build for Production
```bash
npm run build
```

## Technical Stack

- **Frontend**: React 18 + TypeScript
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: Local Storage + TanStack Query
- **Build Tool**: Vite
- **Backend**: Express.js
- **Routing**: Wouter

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Application pages
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express server
├── shared/                 # Shared types and schemas
└── package.json           # Project dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.