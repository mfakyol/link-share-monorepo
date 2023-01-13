import { getCookie, setCookie } from "@packages/lib/cookie";
import uniqueId from "@packages/lib/uniqueId";

export default function getbrowserId() {
  let browserId;
  browserId = getCookie("browserId");
  if (!browserId) {
    const uid = uniqueId();
    browserId = uid;
    setCookie("browserId", uniqueId(), 365 * 2);
  }
  return browserId;
}
