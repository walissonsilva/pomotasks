export function sendBrowserNotification(title: string, content: string) {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: content,
      icon: "/images/pomotasks.png",
    });
  }
}
