'use client';

import { useState, useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires +
    '; path=/';
}

function getCookie(name: string) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

export const CloseAlert = ({
  className,
  onClickAction,
}: {
  className?: string;
  onClickAction?: () => void;
}) => {
  return (
    <button
      type="button"
      aria-label="Close caution alert"
      className={className}
      onClick={onClickAction}
    >
      <X />
    </button>
  );
};

export const Caution = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const closed = getCookie('cautionAlertClosed');
    if (closed !== 'true') {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setVisible(false);
    setCookie('cautionAlertClosed', 'true', 30);
  };

  if (!visible) return null;

  return (
    <div className="relative">
      <Alert className="bg-[#FFF4E5] border-0 mb-4 rounded-sm">
        <TriangleAlert className="h-4 w-4" stroke="#ED6C02" />
        <AlertDescription className="pr-5">
          Jarn-nai is a website created by students and is not supported by
          servers from Reg Chula. It is merely a tool to help find instructors
          more easily, but it is not an actual course registration system. You
          can register for courses only through the official channel at
          https://www2.reg.chula.ac.th/.
        </AlertDescription>
      </Alert>
      <CloseAlert
        className="top-4 right-6 absolute text-muted-foreground h-5 w-5"
        onClickAction={handleClose}
      />
    </div>
  );
};
