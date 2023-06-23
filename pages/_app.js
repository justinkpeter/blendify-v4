import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react";
import React, { useRef } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

export default function App({ Component, pageProps }) {

  const containerRef = useRef(null)
  const options = {
    smooth: true,
    lerp: 0.1,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    },
  }

  return (
    <>
        <SessionProvider session={pageProps.session}>
            <LocomotiveScrollProvider options={options} watch={[]} containerRef={containerRef}>
                <main data-scroll-container ref={containerRef} className={'font-montserrat'}>
                    <Component {...pageProps} />
                </main>
            </LocomotiveScrollProvider>
        </SessionProvider>
    </>
  )
}
