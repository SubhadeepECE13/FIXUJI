import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";

export const ETA_TIMER_TASK = "ETA_TIMER_TASK";

// Define ONCE at module scope. This file must be imported at app startup.
TaskManager.defineTask(ETA_TIMER_TASK, async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order timer is still running ⏱️",
        body: "We'll let you know when the ETA is complete.",
        sound: true,
      },
      trigger: null,
    });
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (err) {
    console.error("ETA_TIMER_TASK error:", err);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});
