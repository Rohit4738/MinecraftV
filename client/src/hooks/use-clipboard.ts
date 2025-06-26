import { useState } from 'react';

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string): Promise<boolean> => {
    try {
      // Modern clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (success) {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
      return false;
    }
  };

  return { copy, isCopied };
}
