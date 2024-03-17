import dynamic from 'next/dynamic'
import Head from 'next/head'
import '../styles/globals.css'

const WalletConnectionProvider = dynamic(() => import('../context/WalletConnectionProvider'), {
    ssr: false,
})

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
                <title>SECUREPAY</title>
            </Head>
            <WalletConnectionProvider>
                <Component {...pageProps} />
            </WalletConnectionProvider>
        </>
    )
}

export default MyApp
