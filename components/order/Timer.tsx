// components/ETATimer.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  AppState,
  AppStateStatus,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { BackgroundFetchStatus } from "expo-background-fetch";
import BackgroundTimer from "react-native-background-timer";
import moment from "moment";
import { ETA_TIMER_TASK } from "@/tasks/eta.tasks";

type FirestoreLike =
  | { _seconds?: number; _nanoseconds?: number }
  | string
  | number
  | Date;

type Props = {
  startTime: FirestoreLike;
  etaMinutes: number;
  status?: "IN_PROGRESS" | string;
  order_id?: string;
  milestoneMinutes?: number[];
};

const ANDROID_CHANNEL_ONGOING = "eta-ongoing";
const ANDROID_CHANNEL_ALERTS = "eta-alerts";

const tsToDate = (val: FirestoreLike) => {
  if (val && typeof val === "object" && "_seconds" in val) {
    const seconds = (val as any)._seconds ?? 0;
    const nanos = (val as any)._nanoseconds ?? 0;
    return new Date(seconds * 1000 + Math.floor(nanos / 1e6));
  }
  return new Date(val as any);
};

const ensureNotifPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
};

const configureAndroidChannels = async () => {
  if (Platform.OS !== "android") return;

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ONGOING, {
    name: "ETA Ongoing",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [250],
    sound: "default",
    showBadge: false,
  });

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ALERTS, {
    name: "ETA Alerts",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [250, 250, 250],
    sound: "default",
    showBadge: true,
  });
};

const fmtHMS = (totalSeconds: number) => {
  const clamp = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(clamp / 3600);
  const m = Math.floor((clamp % 3600) / 60);
  const s = clamp % 60;
  const f = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${f(h)} : ${f(m)} : ${f(s)}`;
};

const ETATimer: React.FC<Props> = ({
  startTime,
  etaMinutes,
  status,
  order_id,
  milestoneMinutes = [10, 5, 1],
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const expectedEnd = useMemo(
    () => moment(tsToDate(startTime)).add(etaMinutes, "minute"),
    [startTime, etaMinutes]
  );

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const ongoingNotifId = useRef<string | null>(null);
  const tickTimerId = useRef<number | null>(null);

  // keep track of scheduled milestone notifications to cancel when needed
  const milestoneNotifIds = useRef<string[]>([]);

  // initial compute
  useEffect(() => {
    if (status != "IN_PROGRESS") return;
    const now = moment();
    const diff = expectedEnd.diff(now, "seconds");
    setSecondsLeft(diff > 0 ? diff : 0);
  }, [expectedEnd]);

  // permissions + channels
  useEffect(() => {
    (async () => {
      await ensureNotifPermissions();
      await configureAndroidChannels();
    })();
  }, []);

  // safe registration/unregistration
  const registerBackgroundFetch = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    if (status !== BackgroundFetchStatus.Available) return;

    const already = await TaskManager.isTaskRegisteredAsync(ETA_TIMER_TASK);
    if (already) return;

    try {
      await BackgroundFetch.registerTaskAsync(ETA_TIMER_TASK, {
        minimumInterval: 15 * 60,
        stopOnTerminate: false,
        startOnBoot: true,
      });
    } catch (e) {
      const msg = (e as any)?.message ?? "";
      if (!`${msg}`.includes("already registered")) {
        console.log("BackgroundFetch register error:", e);
      }
    }
  };

  const unregisterBackgroundFetch = async () => {
    try {
      const registered =
        await TaskManager.isTaskRegisteredAsync(ETA_TIMER_TASK);
      if (registered) {
        await BackgroundFetch.unregisterTaskAsync(ETA_TIMER_TASK);
      }
    } catch (e) {
      console.log("BackgroundFetch unregister error:", e);
    }
  };

  // ticking with BackgroundTimer
  const startTicking = () => {
    if (tickTimerId.current != null) return;
    const id = BackgroundTimer.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    tickTimerId.current = id as unknown as number;
  };

  const stopTicking = () => {
    if (tickTimerId.current != null) {
      BackgroundTimer.clearInterval(tickTimerId.current);
      tickTimerId.current = null;
    }
  };

  // Android ongoing sticky notification
  const showOngoingNotification = async (secs: number) => {
    if (Platform.OS !== "android") return;
    const body = `Time left: ${fmtHMS(secs)}${order_id ? `  •  #${order_id}` : ""}`;

    if (ongoingNotifId.current) {
      try {
        await Notifications.cancelScheduledNotificationAsync(
          ongoingNotifId.current
        );
      } catch {}
      ongoingNotifId.current = null;
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order timer running",
        body,
        sticky: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
        // @ts-ignore - Android only
        channelId: ANDROID_CHANNEL_ONGOING,
      },
      trigger: null,
    });
    ongoingNotifId.current = id;
  };

  const clearOngoingNotification = async () => {
    if (ongoingNotifId.current) {
      try {
        await Notifications.cancelScheduledNotificationAsync(
          ongoingNotifId.current
        );
      } catch {}
      ongoingNotifId.current = null;
    }
  };

  const sendCompletionNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order Completed",
        body: order_id
          ? `Order #${order_id} has reached its ETA.`
          : "ETA has finished. Please check the order.",
        sound: "default",
        // @ts-ignore - Android only
        channelId: ANDROID_CHANNEL_ALERTS,
      },
      trigger: null,
    });
  };

  // ───────────── Milestone scheduling ─────────────
  const clearMilestoneNotifications = async () => {
    if (milestoneNotifIds.current.length) {
      await Promise.allSettled(
        milestoneNotifIds.current.map((id) =>
          Notifications.cancelScheduledNotificationAsync(id)
        )
      );
    }
    milestoneNotifIds.current = [];
  };

  const scheduleMilestoneNotifications = async () => {
    // Clear any previous schedules first
    await clearMilestoneNotifications();

    const now = moment();
    const end = expectedEnd.clone();

    // Normalize & dedupe; keep only future milestones
    const uniqueSorted = Array.from(
      new Set(milestoneMinutes.filter((m) => m > 0))
    ).sort(
      (a, b) => b - a // schedule from largest to smallest (not required, but tidy)
    );

    for (const m of uniqueSorted) {
      const fireAt = end.clone().subtract(m, "minutes");
      if (fireAt.isAfter(now)) {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: `${m} minute${m === 1 ? "" : "s"} remaining`,
            body: order_id
              ? `Order #${order_id} ETA is in ${m} minute${m === 1 ? "" : "s"}.`
              : `ETA is in ${m} minute${m === 1 ? "" : "s"}.`,
            sound: "default",
            // @ts-ignore - Android only
            channelId: ANDROID_CHANNEL_ALERTS,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: fireAt.toDate(),
          },
        });
        milestoneNotifIds.current.push(id);
      }
    }
  };

  // lifecycle by status
  useEffect(() => {
    const inProgress = status === "IN_PROGRESS";

    if (inProgress) {
      startTicking();
      registerBackgroundFetch();
      showOngoingNotification(secondsLeft);
      // schedule milestones for current run
      scheduleMilestoneNotifications();
    } else {
      stopTicking();
      unregisterBackgroundFetch();
      clearOngoingNotification();
      clearMilestoneNotifications();
    }

    return () => {
      stopTicking();
      unregisterBackgroundFetch();
      clearOngoingNotification();
      clearMilestoneNotifications();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, startTime, etaMinutes]);

  // when time updates
  useEffect(() => {
    if (status === "IN_PROGRESS") {
      if (secondsLeft > 0) {
        showOngoingNotification(secondsLeft);
      } else {
        clearOngoingNotification();
        sendCompletionNotification();
        stopTicking();
        unregisterBackgroundFetch();
        clearMilestoneNotifications(); // milestones are no longer needed
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  // recompute after returning to foreground (reduces drift)
  useEffect(() => {
    const sub = AppState.addEventListener("change", (next: AppStateStatus) => {
      const prev = appState.current;
      appState.current = next;

      if (prev.match(/background|inactive/) && next === "active") {
        const now = moment();
        const diff = expectedEnd.diff(now, "seconds");
        setSecondsLeft(diff > 0 ? diff : 0);
      }
    });
    return () => sub.remove();
  }, [expectedEnd]);

  // progress color
  const total = Math.max(1, etaMinutes * 60);
  const pct = (secondsLeft / total) * 100;
  const timerColor =
    pct >= 66.66 ? "#2e7d32" : pct >= 33.33 ? "#f6a700" : "#d32f2f";
  console.log(startTime, etaMinutes, status, order_id, milestoneMinutes);

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Complete The Order In</Text>
      <Text style={[styles.timer, { color: timerColor }]}>
        {fmtHMS(secondsLeft)}
      </Text>
    </View>
  );
};

export default ETATimer;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#e8f2ff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  timer: {
    fontSize: 28,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    paddingBottom: 8,
  },
});
