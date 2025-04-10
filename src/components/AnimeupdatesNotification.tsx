import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DailyNotification: React.FC = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(
    Notification.permission
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.error("Service Workers are not supported in this browser.");
      return;
    }

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register("/emailservice.js");
        console.log("Service Worker registered");
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    };

    registerServiceWorker();
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }
  
    if (permissionStatus === "denied") {
      alert(
        "You have blocked notifications. Please enable them from your browser settings."
      );
      return;
    }
  
    setIsLoading(true);
    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
  
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        
        // Send a message to the service worker
        registration.active?.postMessage({ type: "IMMEDIATE_NOTIFICATION" });
  
        setShowPopover(true);
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (showPopover) {
      const timer = setTimeout(() => setShowPopover(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showPopover]);

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-5 rounded-lg shadow-lg w-72 max-w-full sm:w-80">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Daily Anime Updates</h1>
        <button
          className="text-white hover:text-gray-400"
          onClick={() => setShowNotification(false)}
        >
          ✖
        </button>
      </div>
      <p className="text-sm">Get notified every day at 10 AM!</p>

      {permissionStatus === "default" && (
        <button
          onClick={requestPermission}
          disabled={isLoading}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-500"
        >
          {isLoading ? "Requesting..." : "Enable Notifications"}
        </button>
      )}

      {permissionStatus === "denied" && (
        <p className="mt-3 text-red-500 text-sm">
          ❌ Notifications are blocked. Enable them from browser settings.
        </p>
      )}

      {permissionStatus === "granted" && (
        <p className="mt-3 text-green-500 text-sm">✅ Notifications enabled!</p>
      )}

      <AnimatePresence>
        {showPopover && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-full right-0 mb-2 bg-white text-black p-4 rounded-lg shadow-lg w-64"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopover(false)}
            >
              ✖
            </button>
            <p>✅ Notifications Enabled! 🎉</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DailyNotification;
