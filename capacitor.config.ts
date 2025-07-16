import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b1939500c2a2459e91bfcc557cec26a4',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://b1939500-c2a2-459e-91bf-cc557cec26a4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      showSpinner: false
    }
  }
};

export default config;