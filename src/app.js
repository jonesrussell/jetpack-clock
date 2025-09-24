// World Clock Application for Remote Team Coordination
// Optimized for TV/kiosk display

class WorldClock {
  constructor() {
    this.timeZones = [
      {
        id: 'ontario',
        city: 'Ontario',
        timezone: 'America/Toronto',
        abbreviation: 'EST',
        offset: '-05:00',
        isLocal: true,
        emoji: '🍁'
      },
      {
        id: 'vancouver',
        city: 'Vancouver',
        timezone: 'America/Vancouver',
        abbreviation: 'PST',
        offset: '-08:00',
        emoji: '🌲'
      },
      {
        id: 'alberta',
        city: 'Alberta',
        timezone: 'America/Edmonton',
        abbreviation: 'MST',
        offset: '-07:00',
        emoji: '🏔️'
      },
      {
        id: 'hawaii',
        city: 'Hawaii',
        timezone: 'Pacific/Honolulu',
        abbreviation: 'HST',
        offset: '-10:00',
        emoji: '🌺'
      },
      {
        id: 'sri-lanka',
        city: 'Sri Lanka',
        timezone: 'Asia/Colombo',
        abbreviation: 'IST',
        offset: '+05:30',
        emoji: '🦁'
      },
      {
        id: 'uk',
        city: 'United Kingdom',
        timezone: 'Europe/London',
        abbreviation: 'GMT',
        offset: '+00:00',
        emoji: '🇬🇧'
      },
      {
        id: 'philippines',
        city: 'Philippines',
        timezone: 'Asia/Manila',
        abbreviation: 'PHT',
        offset: '+08:00',
        emoji: '🇵🇭'
      }
    ];

    this.meetingTimes = [
      {
        timezone: 'America/Vancouver',
        hour: 10,
        minute: 0,
        days: [1, 2, 3, 4, 5], // Monday to Friday
        title: 'Daily Standup',
        description: '10:00 AM PST'
      }
    ];

    this.init();
  }

  init() {
    this.updateClocks();
    this.updateCurrentTime();
    this.updateDate();
    
    // Update every second
    setInterval(() => {
      this.updateClocks();
      this.updateCurrentTime();
    }, 1000);

    // Update date every minute
    setInterval(() => {
      this.updateDate();
    }, 60000);

    // Check for meetings every 30 seconds
    setInterval(() => {
      this.checkMeetingTimes();
    }, 30000);
  }

  getCurrentTimeInTimezone(timezone) {
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);
  }

  getCurrentDateInTimezone(timezone) {
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(now);
  }

  updateClocks() {
    const container = document.getElementById('clock-container');
    container.innerHTML = '';

    this.timeZones.forEach(timezone => {
      const time = this.getCurrentTimeInTimezone(timezone.timezone);
      const [hours, minutes, seconds] = time.split(':');
      const isMeetingTime = this.isMeetingTime(timezone);
      
      const clockCard = document.createElement('div');
      clockCard.className = `clock-card ${isMeetingTime ? 'meeting-time active' : ''}`;
      
      // Special styling for local timezone (Ontario)
      if (timezone.isLocal) {
        clockCard.classList.add('border-blue-400', 'bg-gradient-to-br', 'from-blue-900/30', 'to-slate-900');
      }

      clockCard.innerHTML = `
        <div class="text-center">
          <div class="text-6xl mb-4">${timezone.emoji}</div>
          <h2 class="text-3xl font-bold mb-2">${timezone.city}</h2>
          <div class="text-slate-400 text-lg mb-4">${timezone.abbreviation}</div>
          
          <div class="space-y-2">
            <div class="text-5xl font-mono font-bold tracking-wider">
              ${hours}:${minutes}
            </div>
            <div class="text-2xl font-mono text-slate-400">
              ${seconds}
            </div>
          </div>
          
          ${isMeetingTime ? `
            <div class="mt-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg">
              <div class="text-red-400 font-semibold">🚨 Meeting Time!</div>
              <div class="text-sm text-red-300">Daily Standup</div>
            </div>
          ` : ''}
          
          <div class="mt-4 text-sm text-slate-500">
            ${this.getRelativeTime(timezone)}
          </div>
        </div>
      `;

      container.appendChild(clockCard);
    });
  }

  updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    document.getElementById('current-time').textContent = timeString;
  }

  updateDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    document.getElementById('current-date').textContent = dateString;
  }

  isMeetingTime(timezone) {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    return this.meetingTimes.some(meeting => {
      if (meeting.timezone !== timezone.timezone) return false;
      if (!meeting.days.includes(currentDay)) return false;
      
      const meetingTime = new Date();
      meetingTime.setHours(meeting.hour, meeting.minute, 0, 0);
      
      // Check if current time is within 5 minutes of meeting time
      const timeDiff = Math.abs(now - meetingTime);
      return timeDiff <= 5 * 60 * 1000; // 5 minutes in milliseconds
    });
  }

  getRelativeTime(timezone) {
    const now = new Date();
    const localTime = new Date(now.toLocaleString("en-US", {timeZone: timezone.timezone}));
    const utcTime = new Date(now.toLocaleString("en-US", {timeZone: "UTC"}));
    
    const diffHours = Math.floor((localTime - utcTime) / (1000 * 60 * 60));
    const sign = diffHours >= 0 ? '+' : '';
    
    return `UTC${sign}${diffHours}`;
  }

  checkMeetingTimes() {
    const alertBanner = document.getElementById('meeting-alert');
    const hasActiveMeeting = this.timeZones.some(timezone => this.isMeetingTime(timezone));
    
    if (hasActiveMeeting) {
      alertBanner.classList.remove('hidden');
    } else {
      alertBanner.classList.add('hidden');
    }
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WorldClock();
  
  // Add some visual feedback for kiosk mode
  document.addEventListener('click', () => {
    // Prevent any default behaviors that might interfere with kiosk mode
    console.log('Clock application active');
  });
  
  // Handle window focus for kiosk mode
  window.addEventListener('focus', () => {
    document.body.style.opacity = '1';
  });
  
  window.addEventListener('blur', () => {
    document.body.style.opacity = '0.95';
  });
});

// Service worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Only register if we create a service worker
    // navigator.serviceWorker.register('/sw.js');
  });
}
