import { useEffect, useRef, ReactNode } from 'react';
import { useGameStore } from '../store/gameStore';

interface TelegramProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
          selectionChanged: () => void;
        };
        initData: string;
        initDataUnsafe: {
          query_id?: string;
          user?: {
            id: number;
            is_bot?: boolean;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
            photo_url?: string;
          };
          auth_date?: number;
          hash?: string;
          start_param?: string;
        };
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        platform: string;
        headerColor: string;
        backgroundColor: string;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        onEvent: (eventType: string, callback: () => void) => void;
        offEvent: (eventType: string, callback: () => void) => void;
        sendData: (data: string) => void;
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
        showPopup: (params: {
          title?: string;
          message: string;
          buttons?: Array<{
            id?: string;
            type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
            text?: string;
          }>;
        }, callback?: (buttonId: string) => void) => void;
        showAlert: (message: string, callback?: () => void) => void;
        showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void;
        requestWriteAccess: (callback?: (granted: boolean) => void) => void;
        requestContact: (callback?: (shared: boolean) => void) => void;
        CloudStorage: {
          setItem: (key: string, value: string, callback?: (error: Error | null, stored: boolean) => void) => void;
          getItem: (key: string, callback: (error: Error | null, value: string | null) => void) => void;
          getItems: (keys: string[], callback: (error: Error | null, values: Record<string, string>) => void) => void;
          removeItem: (key: string, callback?: (error: Error | null, removed: boolean) => void) => void;
          removeItems: (keys: string[], callback?: (error: Error | null, removed: boolean) => void) => void;
          getKeys: (callback: (error: Error | null, keys: string[]) => void) => void;
        };
      };
    };
  }
}

export const useTelegram = () => {
  const tg = window.Telegram?.WebApp;

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
    startParam: tg?.initDataUnsafe?.start_param,
    isExpanded: tg?.isExpanded,
    platform: tg?.platform,
    colorScheme: tg?.colorScheme,
    haptic: tg?.HapticFeedback,
  };
};

const TelegramProvider = ({ children }: TelegramProviderProps) => {
  const { setUserInfo, addReferral } = useGameStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      // Initialize Telegram WebApp
      tg.ready();
      
      // Expand to full screen
      tg.expand();
      
      // Set theme colors
      tg.setHeaderColor('#1d2025');
      tg.setBackgroundColor('#000000');
      
      // Enable closing confirmation
      tg.enableClosingConfirmation();

      // Get user info
      const user = tg.initDataUnsafe?.user;
      if (user) {
        const username = user.username || user.first_name || 'CEO';
        setUserInfo(username, user.id.toString());
      }

      // Handle referral
      const startParam = tg.initDataUnsafe?.start_param;
      if (startParam && user) {
        // This is a referral - the startParam contains the referrer's code
        // In a real app, you'd send this to your backend
        console.log('Referred by:', startParam);
      }
    } else {
      // Running outside Telegram (development mode)
      console.log('Running in development mode (outside Telegram)');
      setUserInfo('Developer', 'dev-123');
    }
  }, [setUserInfo, addReferral]);

  return <>{children}</>;
};

export default TelegramProvider;
