"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleMockGoogleLogin = async (email: string, name: string, avatarUrl: string) => {
    setIsLoading(true);
    try {
      await loginWithGoogle(email, name, avatarUrl);
      onClose();
    } catch (err) {
      console.error("Google Auth failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-outline-variant rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.57 15 0 12 0 7.35 0 3.4 2.67 1.53 6.57l3.97 3.08C6.46 6.85 9 5.04 12 5.04z" />
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.58v2.97h3.91c2.28-2.1 3.54-5.19 3.54-8.7z" />
            <path fill="#FBBC05" d="M5.5 14.65c-.24-.73-.38-1.5-.38-2.31s.14-1.58.38-2.31L1.53 6.95C.56 8.96 0 11.19 0 13.5s.56 4.54 1.53 6.55l3.97-3.1-1.07-2.3z" />
            <path fill="#34A853" d="M12 18.96c-3 0-5.54-1.81-6.5-4.31l-3.97 3.1C3.4 21.33 7.35 24 12 24c3.15 0 5.81-1.05 7.75-2.85l-3.91-2.97c-1.05.7-2.39 1.18-3.84 1.18z" />
          </svg>
          <h3 className="font-headline-md text-on-surface font-bold">Sign in with Google</h3>
          <p className="text-sm text-on-surface-variant">Select a Google Account to sign in to ZBounty</p>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => handleMockGoogleLogin("alex@zechub.org", "Alex ZecHub", "https://api.dicebear.com/7.x/adventurer/svg?seed=Alex")}
            className="w-full p-3 rounded-lg border border-outline-variant hover:bg-primary-container/10 transition-colors flex items-center gap-3 text-left"
            disabled={isLoading}
          >
            <img className="w-8 h-8 rounded-full bg-surface" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Alex" alt="Alex" />
            <div>
              <div className="font-bold text-sm text-on-surface">Alex ZecHub</div>
              <div className="text-xs text-on-surface-variant">alex@zechub.org</div>
            </div>
          </button>

          <button
            onClick={() => handleMockGoogleLogin("sara@zcash.community", "Sara Shield", "https://api.dicebear.com/7.x/adventurer/svg?seed=Sara")}
            className="w-full p-3 rounded-lg border border-outline-variant hover:bg-primary-container/10 transition-colors flex items-center gap-3 text-left"
            disabled={isLoading}
          >
            <img className="w-8 h-8 rounded-full bg-surface" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sara" alt="Sara" />
            <div>
              <div className="font-bold text-sm text-on-surface">Sara Shield</div>
              <div className="text-xs text-on-surface-variant">sara@zcash.community</div>
            </div>
          </button>

          <button
            onClick={() => handleMockGoogleLogin("contributor@zbounty.dev", "Contributor Z", "https://api.dicebear.com/7.x/adventurer/svg?seed=Contributor")}
            className="w-full p-3 rounded-lg border border-outline-variant hover:bg-primary-container/10 transition-colors flex items-center gap-3 text-left"
            disabled={isLoading}
          >
            <img className="w-8 h-8 rounded-full bg-surface" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Contributor" alt="Contributor" />
            <div>
              <div className="font-bold text-sm text-on-surface">Contributor Z</div>
              <div className="text-xs text-on-surface-variant">contributor@zbounty.dev</div>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md font-bold rounded-lg uppercase transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
