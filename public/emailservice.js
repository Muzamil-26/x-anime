self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  console.log("Service Worker activated");
});

self.addEventListener("message", (event) => {
  if (!event.data || !event.data.type) return;

  if (event.data.type === "IMMEDIATE_NOTIFICATION") {
    console.log("Sending immediate notification");

    self.registration.showNotification("Anime Updates Enabled!", {
      body: "You'll now get daily updates at 10 AM!",
      icon: "../src/assets/Images/favicon.ico",
      tag: "anime-welcome",
    });
  }

  if (event.data.type === "START_NOTIFICATION") {
    console.log("Notification scheduling started");

    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      console.log(`Checking Time: ${hours}:${minutes}`); // Debugging

      if (hours === 14 && minutes === 36) { // 2:36 PM
        self.registration.showNotification("Daily Anime Update", {
          body: "Check out today's anime updates!",
          icon: "../src/assets/Images/favicon.ico",
          tag: "daily-anime-update",
        });
      }
    };

    checkTime(); // Run immediately in case it's already the correct time
    setInterval(checkTime, 60000); // Check every minute
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("https://x-anime-kduf.vercel.app"));
});
