import { useAppDispatch } from "@/store/Reduxhook";
import { checkPermissions } from "@/utils/Permissions.utils";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

/**
 * A custom hook that:
 *  1. Checks permissions once on mount (callCount < 1).
 *  2. Resets callCount to 0 when user clicks "Open Settings" (outside this hook).
 *  3. Re-checks once if app moves from background => active and callCount < 1.
 */
const usePermissions = () => {
  const dispatch = useAppDispatch();

  // Store how many times we've called checkPermissions
  const callCountRef = useRef<number>(0);

  // Store the last known AppState to detect transitions
  const lastAppStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    // 1) If we haven't checked yet, do it now
    if (callCountRef.current < 1) {
      console.log("[usePermissions] Checking on mount...");
      checkPermissions(dispatch);
      callCountRef.current += 1;
    }

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      // If the app was backgrounded/inactive and returns to active,
      // and callCount < 1 => re-check
      if (
        (lastAppStateRef.current === "background" ||
          lastAppStateRef.current === "inactive") &&
        nextAppState === "active"
      ) {
        // If we haven't called checkPermissions again
        if (callCountRef.current < 1) {
          console.log("[usePermissions] Re-checking on return to active...");
          checkPermissions(dispatch);
          callCountRef.current += 1;
        }
      }
      lastAppStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [dispatch]);

  // We'll expose a function that lets us reset the callCount
  // so that next time we become active, we do call checkPermissions again
  const resetCallCount = () => {
    callCountRef.current = 0;
  };

  return { resetCallCount };
};

export default usePermissions;
