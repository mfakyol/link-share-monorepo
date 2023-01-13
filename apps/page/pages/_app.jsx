import EventListener from "@components/EventListener";
import "@styles/🌎.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <EventListener />
    </>
  );
}

export default MyApp;
