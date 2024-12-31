"use client";

import React, { JSX, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Button from "../atoms/Button";

type NavItem = {
  label: string;
  icon: JSX.Element;
  onClick?: () => void;
};

const NavigationDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      icon: <Bars3Icon className="text-primary" />,
      onClick: () => {
        router.push("/dashboard");
      },
    },
    {
      label: "Logout",
      icon: <ArrowRightStartOnRectangleIcon className="text-primary" />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="relative flex justify-center" id="navigation-drawer">
      {/* Toggle Button */}
      <Button id="toggle-navigation-drawer" className="p-2 text-xl w-12 h-12">
        <Bars3Icon
          className="text-primary"
          onMouseEnter={() => setIsOpen(!isOpen)}
        />
      </Button>

      {/* Drawer */}
      <div
        className={clsx(
          "fixed top-0 left-0 h-full bg-gray-800 text-white z-50 transition-transform transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ width: "240px" }}
      >
        {/* Close Button */}
        <Button
          className="absolute top-4 right-4 p-2 text-xl text-gray-400"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </Button>

        {/* Navigation Items */}
        <div className="mt-16 space-y-4 p-4">
          {navItems.map((item, index) => (
            <Button
              key={index}
              className="flex items-center w-full p-2 text-left hover:bg-gray-700 rounded-md"
              onClick={item.onClick}
            >
              <div className="text-2xl">{item.icon}</div>
              <span className="ml-4 text-lg">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <Button
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation drawer"
        ></Button>
      )}
    </div>
  );
};

export default NavigationDrawer;
