// import '../styles/reset.css'
// import '../styles/style.css'
import '../styles/styles.css'
import '../styles/example-styles.css'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  const contextProps = {}
  return <Component {...pageProps} {...contextProps} />
}
