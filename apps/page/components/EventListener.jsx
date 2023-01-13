import { useEffect } from "react";
import getbrowserId from "@lib/getBrowserId";
import detectDevice from "@packages/lib/detectDevice";
import { onEvent, offEvent } from "@packages/lib/event";
import detectLanguage from "@packages/lib/detectLanguage";
import http from "@packages/lib/http";
import { apiUrl } from "@packages/lib/config";
import useIsomorphicLayoutEffect from "@packages/react-lib/hooks/useIsomorphicLayoutEffect";

function EventListener() {
  useIsomorphicLayoutEffect(() => {
    const eventListener = (e) => {
      const { payload } = e.detail;
      const body = {
        createdAt: Date.now(),
        device: detectDevice(window),
        language: detectLanguage(window),
        browserId: getbrowserId("browserId"),
        ...payload,
      };
      http.post(`${apiUrl}/tracker/event`, { body });
    };

    onEvent("tracker", eventListener);

    return () => {
      offEvent("tracker", eventListener);
    };
  }, []);

  return null;
}

export default EventListener;
