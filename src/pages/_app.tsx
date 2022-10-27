import type { AppProps } from "next/app";

import "../styles/global.scss";
import "../styles/content.scss";
import "../styles/movie-card.scss";
import "../styles/loader.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
