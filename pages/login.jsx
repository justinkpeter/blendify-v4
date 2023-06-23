import React, { useState, useEffect, useRef }from 'react';
import {getProviders, signIn} from "next-auth/react";
import * as THREE from 'three';
import WAVES from 'vanta/dist/vanta.waves.min';
export default function Login({providers}) {

	const [vantaEffect, setVantaEffect] = useState(undefined);
	const vantaRef = useRef(null);

	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				WAVES({
					el: vantaRef.current,
					THREE: THREE,
					mouseControls: true,
					touchControls: false,
					gyroControls: true,
					scale: 1.00,
					scaleMobile: 1.00,
					color: "#18181b"
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	return (
		<main
			className={`relative min-h-screen w-screen items-center justify-center`} data-scroll-section>
			<div className={'relative h-screen w-screen select-none'} ref={vantaRef}>
				<div className={'relative h-full w-full bg-black rounded-xl bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-5 '}>
					<div className={'absolute left-4 bottom-4 uppercase font-extrabold text-[256px] tracking-tighter leading-[80.4%]'}>
						<span className={'font-black'}> blen </span> <br/>
						<span> dify </span>
					</div>
				</div>

			</div>

			<div className={"flex mt-16"}>
				<button
					className={"py-6 px-12 w-fit rounded-full bg-green-500 font-medium transition text-lg hover:bg-green-800 flex items-center gap-4"}
					onClick={(e) => {
						e.preventDefault()
						signIn(providers?.spotify?.id, { callbackUrl: '/'}

						)}}
				>
					{/*<Image src={'/assets/logo/Spotify_Icon_RGB_White.png'} alt={'Spotify'} width={30} height={30}/>*/}
					<span> Continue with Spotify </span>
				</button>
			</div>



		</main>
	)
}

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: {
			providers,
		},
	};
}