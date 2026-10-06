import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileContainer } from './components/MobileContainer';
import { BottomNavBar, TabType } from './components/BottomNavBar';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RoleSelectorScreen } from './screens/RoleSelectorScreen';
import { ClientHomeScreen } from './screens/ClientHomeScreen';
import { WalletScreen } from './screens/WalletScreen';
import { DepositMethodsScreen } from './screens/DepositMethodsScreen';
import { LotterySelectionScreen } from './screens/LotterySelectionScreen';
import { SmartPredictionsScreen } from './screens/SmartPredictionsScreen';
import { PollaHipicaScreen } from './screens/PollaHipicaScreen';
import { PollaAnimalitosScreen } from './screens/PollaAnimalitosScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { BonusesAndReferralsScreen } from './screens/BonusesAndReferralsScreen';
import { PlayHistoryScreen } from './screens/PlayHistoryScreen';
import { ClientProfileScreen } from './screens/ClientProfileScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';
import { ObservationsBlockScreen } from './screens/ObservationsBlockScreen';
import { TelegramFeedScreen } from './screens/TelegramFeedScreen';
import { LosersOfTheWeekScreen } from './screens/LosersOfTheWeekScreen';

// 3 Slot Machines & Casino Hub
import { CasinoHubScreen } from './screens/CasinoHubScreen';
import { SlotMachineScreen } from './screens/SlotMachineScreen';
import { AnimalitosSlotScreen } from './screens/AnimalitosSlotScreen';
import { HipicaSlotScreen } from './screens/HipicaSlotScreen';

import { StoriesViewerModal } from './screens/StoriesViewerModal';
import { UserRole } from './types';

const MainAppContent: React.FC = () => {
  const { currentRole, setCurrentRole, logout } = useApp();
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [targetObsUserId, setTargetObsUserId] = useState<string | undefined>(undefined);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'inicio') {
      setCurrentScreen('inicio');
    } else if (tab === 'resultados') {
      setCurrentScreen('resultados');
    } else if (tab === 'wallet') {
      setCurrentScreen('billetera');
    } else if (tab === 'perfil') {
      setCurrentScreen('mi_perfil');
    }
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    if (screen === 'inicio') setActiveTab('inicio');
    if (screen === 'resultados') setActiveTab('resultados');
    if (screen === 'billetera') setActiveTab('wallet');
    if (screen === 'mi_perfil') setActiveTab('perfil');
  };

  const handleSelectRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'administrador') {
      setCurrentScreen('admin_dashboard');
    } else if (role === 'taquillero') {
      setCurrentScreen('telegram_feed');
    } else {
      setCurrentScreen('inicio');
    }
  };

  const showBottomNav =
    currentScreen === 'inicio' ||
    currentScreen === 'resultados' ||
    currentScreen === 'billetera' ||
    currentScreen === 'mi_perfil';

  return (
    <MobileContainer activeScreen={currentScreen} onNavigate={handleNavigate}>
      {/* 1. Pantalla de Inicio (Splash) */}
      {currentScreen === 'splash' && (
        <SplashScreen onStart={() => setCurrentScreen('login')} />
      )}

      {/* 2. Login */}
      {currentScreen === 'login' && (
        <LoginScreen
          onNavigateRegister={() => setCurrentScreen('registro')}
          onNavigateForgotPassword={() => setCurrentScreen('olvido_clave')}
          onNavigateRoleSelector={() => setCurrentScreen('role_selector')}
          onLoginSuccess={() => setCurrentScreen('inicio')}
        />
      )}

      {/* 3. Selección de perfil */}
      {currentScreen === 'role_selector' && (
        <RoleSelectorScreen
          onSelectRole={handleSelectRole}
          onBackToLogin={() => setCurrentScreen('login')}
        />
      )}

      {/* 4. Inicio Cliente */}
      {currentScreen === 'inicio' && (
        <ClientHomeScreen
          onNavigate={handleNavigate}
          onOpenStories={idx => setActiveStoryIndex(idx)}
        />
      )}

      {/* 5. Billetera */}
      {currentScreen === 'billetera' && (
        <WalletScreen
          onBack={() => handleNavigate('inicio')}
          onNavigateDeposit={() => handleNavigate('depositar')}
        />
      )}

      {/* 6. Métodos de depósito */}
      {currentScreen === 'depositar' && (
        <DepositMethodsScreen
          onBack={() => handleNavigate('billetera')}
          onSuccess={() => handleNavigate('billetera')}
        />
      )}

      {/* 7. Selección de loterías */}
      {currentScreen === 'jugar' && (
        <LotterySelectionScreen
          onBack={() => handleNavigate('inicio')}
          onNavigatePollaHipica={() => handleNavigate('polla_hipica')}
          onNavigatePollaAnimalitos={() => handleNavigate('polla_animalitos')}
          onNavigateHistory={() => handleNavigate('mis_jugadas')}
          onNavigateTragamonedas={() => handleNavigate('casino_hub')}
        />
      )}

      {/* 8. Casino Hub - Selector de 3 Tragamonedas */}
      {currentScreen === 'casino_hub' && (
        <CasinoHubScreen
          onBack={() => handleNavigate('inicio')}
          onSelectGame={gameKey => handleNavigate(gameKey)}
        />
      )}

      {/* 8.1 Tragamonedas 1: ALIADAS 777 GOLD */}
      {(currentScreen === 'tragamonedas' || currentScreen === 'tragamonedas_777') && (
        <SlotMachineScreen
          onBack={() => handleNavigate('casino_hub')}
          onNavigateDeposit={() => handleNavigate('depositar')}
        />
      )}

      {/* 8.2 Tragamonedas 2: ANIMALITOS SAFARI SLOT */}
      {currentScreen === 'tragamonedas_animalitos' && (
        <AnimalitosSlotScreen
          onBack={() => handleNavigate('casino_hub')}
          onNavigateDeposit={() => handleNavigate('depositar')}
        />
      )}

      {/* 8.3 Tragamonedas 3: HÍPICA ROYALE 5y6 */}
      {currentScreen === 'tragamonedas_hipica' && (
        <HipicaSlotScreen
          onBack={() => handleNavigate('casino_hub')}
          onNavigateDeposit={() => handleNavigate('depositar')}
        />
      )}

      {/* 9. Pronósticos de jugadas */}
      {currentScreen === 'pronosticos' && (
        <SmartPredictionsScreen
          onBack={() => handleNavigate('inicio')}
          onPlaySuggestedNumbers={() => handleNavigate('jugar')}
        />
      )}

      {/* 10. Polla Hípica personalizada */}
      {currentScreen === 'polla_hipica' && (
        <PollaHipicaScreen onBack={() => handleNavigate('inicio')} />
      )}

      {/* 11. Polla de Animalitos */}
      {currentScreen === 'polla_animalitos' && (
        <PollaAnimalitosScreen onBack={() => handleNavigate('inicio')} />
      )}

      {/* 12. Resultados de todas las loterías */}
      {currentScreen === 'resultados' && (
        <ResultsScreen onBack={() => handleNavigate('inicio')} />
      )}

      {/* 13. Bonos y referidos */}
      {currentScreen === 'bonos_referidos' && (
        <BonusesAndReferralsScreen onBack={() => handleNavigate('inicio')} />
      )}

      {/* 14. Historial de jugadas */}
      {currentScreen === 'mis_jugadas' && (
        <PlayHistoryScreen onBack={() => handleNavigate('inicio')} />
      )}

      {/* 15. Perfil del cliente */}
      {currentScreen === 'mi_perfil' && (
        <ClientProfileScreen
          onBack={() => handleNavigate('inicio')}
          onLogout={() => {
            logout();
            setCurrentScreen('login');
          }}
          onNavigateRoleSelector={() => setCurrentScreen('role_selector')}
        />
      )}

      {/* 16. Registro de cliente */}
      {currentScreen === 'registro' && (
        <RegisterScreen
          onBack={() => setCurrentScreen('login')}
          onRegistered={() => setCurrentScreen('login')}
        />
      )}

      {/* 17. Olvido de contraseña */}
      {currentScreen === 'olvido_clave' && (
        <ForgotPasswordScreen onBack={() => setCurrentScreen('login')} />
      )}

      {/* 18. Panel administrador */}
      {currentScreen === 'admin_dashboard' && (
        <AdminDashboardScreen
          onBack={() => handleNavigate('inicio')}
          onNavigateObservations={uid => {
            setTargetObsUserId(uid);
            setCurrentScreen('observaciones');
          }}
          onNavigateTelegramFeed={() => setCurrentScreen('telegram_feed')}
        />
      )}

      {/* 19. Observaciones y bloqueo */}
      {currentScreen === 'observaciones' && (
        <ObservationsBlockScreen
          targetUserId={targetObsUserId}
          onBack={() => handleNavigate('admin_dashboard')}
        />
      )}

      {/* 20. Telegram - Taquilleros */}
      {currentScreen === 'telegram_feed' && (
        <TelegramFeedScreen onBack={() => handleNavigate('inicio')} />
      )}

      {/* 21. Perdedores de la semana */}
      {currentScreen === 'perdedores' && (
        <LosersOfTheWeekScreen onBack={() => handleNavigate('inicio')} />
      )}

      {/* Stories Viewer Modal */}
      {activeStoryIndex !== null && (
        <StoriesViewerModal
          initialIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
        />
      )}

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </MobileContainer>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
