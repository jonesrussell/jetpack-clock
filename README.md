# Jetpack Clock - World Time Zone Display

A full-screen, kiosk-style world clock application designed for remote teams. Perfect for displaying on large TV screens via HDMI to keep track of team members across different time zones.

## Features

- **Real-time clocks** for all team locations:
  - 🍁 Ontario (EST) - Your local timezone
  - 🌲 Vancouver (PST) - Company headquarters  
  - 🏔️ Alberta (MST)
  - 🌺 Hawaii (HST)
  - 🦁 Sri Lanka (IST)
  - 🇬🇧 United Kingdom (GMT)
  - 🇵🇭 Philippines (PHT)

- **Meeting alerts** - Visual indicators when it's meeting time (10am PST daily standup)
- **Modern design** - Built with Tailwind CSS for a sleek, professional look
- **TV optimized** - Full-screen display perfect for kiosk mode on large screens
- **Auto-refresh** - Updates every second to stay current
- **Responsive layout** - Adapts to different screen sizes

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build CSS
```bash
npm run build:prod
```

### 3. Run the Application
```bash
npm run serve
```

Then open your browser to `http://localhost:8040

### 4. For TV/Kiosk Mode
- Open the application in your browser
- Press `F11` for full-screen mode
- Or use browser kiosk mode extensions for true kiosk experience

## Development

### Watch Mode (for development)
```bash
npm run build
```
This will watch for changes and rebuild CSS automatically.

### Development Server
```bash
npm run dev
```
Runs both the CSS build watcher and HTTP server simultaneously.

## Customization

### Adding New Time Zones
Edit `src/app.js` and add to the `timeZones` array:

```javascript
{
  id: 'new-location',
  city: 'New Location',
  timezone: 'America/New_York',
  abbreviation: 'EST',
  offset: '-05:00',
  emoji: '🏙️'
}
```

### Adding Meeting Times
Add to the `meetingTimes` array in `src/app.js`:

```javascript
{
  timezone: 'America/Vancouver',
  hour: 14, // 2 PM
  minute: 0,
  days: [1, 2, 3, 4, 5], // Monday to Friday
  title: 'Team Meeting',
  description: '2:00 PM PST'
}
```

### Styling
- Edit `src/input.css` for custom styles
- Modify `tailwind.config.js` for theme customization
- The design uses a dark theme optimized for TV displays

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome/Edge recommended for best kiosk mode experience
- Mobile responsive but optimized for large displays

## Kiosk Mode Setup

### Chrome Kiosk Mode
```bash
# Linux/Windows
chrome --kiosk --app=http://localhost:8000

# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --kiosk --app=http://localhost:8040
```

### Firefox Kiosk Mode
```bash
firefox --kiosk http://localhost:8040
```

## Troubleshooting

### CSS Not Loading
- Make sure to run `npm run build:prod` after making changes
- Check that `dist/output.css` exists and has content

### Time Zones Not Updating
- Ensure your system clock is accurate
- Check browser console for JavaScript errors

### Full Screen Issues
- Use browser's built-in full-screen mode (F11)
- For true kiosk mode, use browser command-line flags
- Disable browser toolbars and navigation in kiosk mode

## License

MIT License - Feel free to customize for your team's needs!
