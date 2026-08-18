import { AppProvider, useApp } from '@/context/AppContext';
import { ToastContainer } from '@/components/ui/Toast';
import { SplashScreen } from '@/screens/SplashScreen';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';
import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { SearchScreen } from '@/screens/SearchScreen';
import { RouteOptionsScreen } from '@/screens/RouteOptionsScreen';
import { ActiveNavigationScreen } from '@/screens/ActiveNavigationScreen';
import { AccessibilityDetailsScreen } from '@/screens/AccessibilityDetailsScreen';
import { ReportScreen } from '@/screens/ReportScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { SOSScreen } from '@/screens/SOSScreen';

function ScreenRouter() {
  const { screen } = useApp();

  switch (screen) {
    case 'splash':
      return <SplashScreen />;
    case 'welcome':
      return <WelcomeScreen />;
    case 'signup':
      return <SignUpScreen />;
    case 'onboarding':
      return <OnboardingScreen />;
    case 'home':
      return <HomeScreen />;
    case 'search':
      return <SearchScreen />;
    case 'routes':
      return <RouteOptionsScreen />;
    case 'navigation':
      return <ActiveNavigationScreen />;
    case 'accessibility-details':
      return <AccessibilityDetailsScreen />;
    case 'report':
      return <ReportScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'sos':
      return <SOSScreen />;
    default:
      return <HomeScreen />;
  }
}

function AppContent() {
  return (
    <div className="min-h-screen bg-ink-50">
      <ScreenRouter />
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
