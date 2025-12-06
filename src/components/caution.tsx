"use client";

import { TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";

async function setCookie(name: string, value: string, days: number) {
  if (!("cookieStore" in window)) return;

  const expires = Date.now() + days * 864e5;

  // biome-ignore lint/suspicious/noExplicitAny: window is any
  await (window as any).cookieStore.set({
    name,
    value,
    expires,
    path: "/",
  });
}

async function getCookie(name: string): Promise<string> {
  if (!("cookieStore" in window)) return "";

  // biome-ignore lint/suspicious/noExplicitAny: window is any
  const cookie = await (window as any).cookieStore.get(name);
  return cookie?.value ?? "";
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
    let cancelled = false;

    const checkCookie = async () => {
      const closed = await getCookie("cautionAlertClosed");
      if (!cancelled && closed !== "true") {
        setVisible(true);
      }
    };

    checkCookie();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClose = async () => {
    setVisible(false);
    await setCookie("cautionAlertClosed", "true", 30);
  };

  if (!visible) return null;

  return (
    <div className="relative">
      <Alert className="mb-4 rounded-sm border-0 bg-[#FFF4E5]">
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
        className="absolute top-4 right-6 h-5 w-5 text-muted-foreground"
        onClickAction={handleClose}
      />
    </div>
  );
};
