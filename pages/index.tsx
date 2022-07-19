import Head from "next/head";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import Icons from "../components/Icons";

export default function Home() {
	const { t, lang } = useTranslation("common");
	const [email, setEmail] = React.useState<string>("");
	const [joined, setJoined] = React.useState<boolean>(false);
	const [processing, setProcessing] = React.useState<boolean>(false);

	const doJoin = async () => {
		setProcessing(true);

		const res = await fetch("https://api.buttondown.email/v1/subscribers", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: process.env.NEXT_PUBLIC_BUTTONDOWN_TOKEN,
			},
			body: JSON.stringify({ email: email, tags: ["Snapod Waitlist"] }),
		});
		const data = await res.json();

		setProcessing(false);
		if (data.creation_date) {
			setJoined(true);
		} else {
			alert(t("cannotJoin"));
		}
	};

	return (
		<main>
			<Head>
				<title>Snapod | {t("headSlogan")}</title>
				<meta name='description' content={t("headDescription")} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<section className='h-screen w-full snapod-background text-gray-700 mb-20 border-b'>
				<nav className='flex page lg:pt-10 pt-14 lg:bg-transparent z-10 top-0 w-full lg:relative lg:pb-0 pb-3 shadow-none text-xl items-center justify-center nav'>
					<div
						id='snapod-logo'
						className='flex flex-1 gap-x-1.5 font-medium lg:text-xl text-2xl items-center text-gray-600 justify-center lg:justify-start'
					>
						<img
							src='https://storageapi2.fleek.co/2dc1b6ef-7974-41bd-98fe-4c43ab6976cf-bucket/snapod_logo_v1.png'
							className='lg:w-10 lg:h-10 w-20 h-20'
						/>
						<span className='hidden lg:block'>Snapod</span>
					</div>
					<div
						id='header-links'
						className='justify-evenly whitespace-nowrap items-center gap-x-6 hidden lg:flex'
					>
						<a
							className='text-base text-gray-600 hover:text-gray-700 transition-all'
							href='https://github.com/orgs/Snapodcast/discussions'
							target='_blank'
						>
							{t("community")}
						</a>
						<a
							className='text-base text-gray-600 hover:text-gray-700 transition-all'
							href='https://status.snapodcast.com'
							target='_blank'
						>
							{t("status")}
						</a>
						<a
							className='text-base text-gray-600 hover:text-gray-700 transition-all'
							href='https://twitter.com/Snapodcast'
							target='_blank'
						>
							{t("twitter")}
						</a>
						<select
							className='rounded-md bg-gray-300 bg-opacity-50 hover:bg-gray-300 transition-all pt-1 pb-1.5 px-2.5 text-gray-500 text-opacity-75 font-medium text-base'
							defaultValue={lang}
							onChange={(e) => {
								setLanguage(e.target.value);
							}}
						>
							<option value='zh-cn'>简体中文</option>
							<option value='en'>English</option>
						</select>
					</div>
				</nav>
				<div className='lg:mt-24 mt-0 lg:pt-0 pt-4'>
					<div className='text-center'>
						<h1
							className={`lg:text-4xl text-2xl ${
								lang === "zh-cn" ? "font-medium tracking-wider" : "font-bold"
							} lg:mb-4 mb-3`}
						>
							{t("headSlogan")}
						</h1>
						<p
							className={`lg:text-2xl text-sm text-gray-500 ${
								lang === "zh-cn" ? "tracking-widest" : "tracking-wide"
							} mb-1`}
						>
							{t("headerDes1")}
						</p>
						<p
							className={`lg:text-2xl text-sm text-gray-500 capitalize ${
								lang === "zh-cn" ? "tracking-widest" : "tracking-wide"
							}`}
						>
							{t("headerDes2")}
						</p>
					</div>
					<div className='mt-10 flex justify-center items-center'>
						<div className='flex join-input-container whitespace-nowrap mx-12'>
							<input
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								placeholder={t("email")}
								className='border transition-all border-gray-300 hover:border-gray-400 shadow-sm lg:py-2 lg:px-5 py-1.5 px-2 lg:pl-4 pl-3 rounded-lg lg:text-base text-sm bg-white flex-1 outline-none focus:shadow-md'
							/>
							<button
								onClick={() => {
									if (!joined) {
										doJoin();
									}
								}}
								className='lg:block lg:min-w-[172.63px] hidden rounded-md bg-gray-600 border border-gray-600 hover:bg-gray-700 transition-all ml-3 lg:py-2 lg:px-5 py-1.5 px-4 text-sm text-white lg:text-base shadow-sm hover:shadow-md'
							>
								{processing
									? t("headerJoining")
									: joined
									? t("headerJoined")
									: t("headerJoin")}
							</button>
							<button
								onClick={() => {
									if (!joined) {
										doJoin();
									}
								}}
								className='lg:hidden block rounded-md bg-gray-600 border border-gray-600 hover:bg-gray-700 transition-all ml-3 lg:py-2 lg:px-5 py-1.5 px-4 text-sm text-white lg:text-base shadow-sm hover:shadow-md'
							>
								{processing
									? t("headerJoiningSmall")
									: joined
									? t("headerJoinedSmall")
									: t("headerJoinSmall")}
							</button>
						</div>
					</div>
				</div>
				<div className='mt-20 flex justify-center lg:px-0 px-8'>
					<img
						src='https://storageapi.fleek.co/2dc1b6ef-7974-41bd-98fe-4c43ab6976cf-bucket/snapod-editing-episodes.png'
						className='lg:rounded-3xl rounded-xl shadow-2xl border border-gray-300 lg:w-[952px]'
					/>
				</div>
			</section>
			<section className='lg:pt-96 pt-0 page'>
				<div className='text-center mb-12'>
					<p className='text-gray-500 mb-1'>Features</p>
					<h1 className='text-4xl font-medium tracking-wide text-gray-700'>
						{t("feature")}
					</h1>
				</div>
				<div className='grid lg:grid-cols-3 grid-cols-1 gap-8 px-5'>
					<div className='rounded-lg bg-gray-100 px-8 py-8'>
						<span className='w-10 h-10 flex text-red-500'>
							<Icons name='add' />
						</span>
						<h2 className='text-gray-600 font-medium text-xl mt-3 mb-1'>
							{t("createPodcasts")}
						</h2>
						<p className='text-gray-500 text-lg'>{t("featureDes1")}</p>
					</div>
					<div className='rounded-lg bg-gray-100 px-8 py-8'>
						<span className='w-10 h-10 flex text-indigo-500'>
							<Icons name='download' />
						</span>
						<h2 className='text-gray-600 font-medium text-xl mt-3 mb-1'>
							{t("importPodcasts")}
						</h2>
						<p className='text-gray-500 text-lg'>{t("featureDes2")}</p>
					</div>
					<div className='rounded-lg bg-gray-100 px-8 py-8'>
						<span className='w-10 h-10 flex text-yellow-500'>
							<Icons name='rss' />
						</span>
						<h2 className='text-gray-600 font-medium text-xl mt-3 mb-1'>
							{t("rss")}
						</h2>
						<p className='text-gray-500 text-lg'>{t("featureDes3")}</p>
					</div>
					<div className='rounded-lg bg-gray-100 px-8 py-8'>
						<span className='w-10 h-10 flex text-purple-500'>
							<Icons name='episodes' />
						</span>
						<h2 className='text-gray-600 font-medium text-xl mt-3 mb-1'>
							{t("manageEpisodes")}
						</h2>
						<p className='text-gray-500 text-lg'>{t("featureDes4")}</p>
					</div>
					<div className='rounded-lg bg-gray-100 px-8 py-8'>
						<span className='w-10 h-10 flex text-pink-500'>
							<Icons name='music' />
						</span>
						<h2 className='text-gray-600 font-medium text-xl mt-3 mb-1'>
							{t("storeAudio")}
						</h2>
						<p className='text-gray-500 text-lg'>{t("featureDes5")}</p>
					</div>
					<div className='rounded-lg bg-gray-100 px-8 py-8'>
						<span className='w-10 h-10 flex text-blue-500'>
							<Icons name='globe' />
						</span>
						<h2 className='text-gray-600 font-medium text-xl mt-3 mb-1'>
							{t("snapodSites")}
						</h2>
						<p className='text-gray-500 text-lg'>{t("featureDes6")}</p>
					</div>
				</div>
				<div className='flex mt-16 px-5 gap-8 lg:flex-row flex-col'>
					<div className='rounded-lg bg-gray-100 py-12 px-12 flex-1 text-center snapod-feature-background-1'>
						<span className='w-12 h-12 flex text-green-500 mx-auto'>
							<Icons name='char-square' />
						</span>
						<h2 className='text-gray-600 font-medium text-2xl mt-2 mb-2'>
							{t("snapodAnalytics")}
						</h2>
						<p className='text-gray-500 lg:text-lg text-base lg:px-10 px-0 mb-10'>
							{t("featureDes7")}
						</p>
						<img
							src='https://storageapi.fleek.co/2dc1b6ef-7974-41bd-98fe-4c43ab6976cf-bucket/snapod-analytics.png'
							className='rounded-xl shadow-md lg:h-80 lg:w-full'
						/>
					</div>
					<div className='rounded-lg bg-gray-100 py-12 px-12 flex-1 text-center snapod-feature-background-1'>
						<span className='w-12 h-12 flex text-red-400 mx-auto'>
							<Icons name='upload' />
						</span>
						<h2 className='text-gray-600 font-medium text-2xl mt-2 mb-2'>
							{t("distributions")}
						</h2>
						<p className='text-gray-500 lg:text-lg text-base lg:px-10 px-0 mb-10'>
							{t("featureDes8")}
						</p>
						<img
							src='https://storageapi.fleek.co/2dc1b6ef-7974-41bd-98fe-4c43ab6976cf-bucket/distributions.png'
							className='rounded-xl shadow-md lg:h-80 lg:w-full'
						/>
					</div>
				</div>
			</section>
			<section className='lg:pt-40 pt-24 page'>
				<div className='text-center mb-12'>
					<p className='text-gray-500 mb-1'>Clients</p>
					<h1 className='text-4xl font-medium tracking-wide text-gray-700 mb-1'>
						{t("clients")}
					</h1>
					<p className='text-gray-400'>{t("clientsDes")}</p>
				</div>
				<div className='grid lg:grid-cols-2 grid-cols-1 gap-8 px-5'>
					<div className='rounded-lg bg-gray-100 lg:py-6 py-2 lg:px-12 px-8 flex items-center gap-x-3'>
						<div className='w-32 h-32 flex items-center'>
							<img src='/appstore.png' />
						</div>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("macos")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("macosDes")}
							</p>
						</div>
					</div>
					<div className='rounded-lg bg-gray-100 lg:py-6 py-2 lg:px-12 px-8 flex items-center gap-x-3.5'>
						<div className='w-32 h-32 transform lg:translate-y-1.5 flex items-center'>
							<img src='/microsoftstore.png' />
						</div>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("windows")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("windowsDes")}
							</p>
						</div>
					</div>
					<div className='rounded-lg bg-gray-50 border lg:p-12 p-8'>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("web")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("webDes")}
							</p>
						</div>
					</div>
					<div className='rounded-lg bg-gray-50 border lg:p-12 p-8'>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("mobile")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("mobileDes")}
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* <section className='lg:pt-40 pt-24 page'>
				<div className='text-center mb-12'>
					<p className='text-gray-500 mb-1'>Pricing</p>
					<h1 className='text-4xl font-medium tracking-wide text-gray-700 mb-1'>
						{t("pricing")}
					</h1>
					<p className='text-gray-400'>{t("pricingDes")}</p>
				</div>
				<div className='grid lg:grid-cols-5 grid-cols-1 gap-4 px-5'>
					<div className='rounded-lg bg-gray-100 py-6 px-8 lg:px-10 flex items-center gap-x-6'>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("priceName1")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("priceDes1")}
							</p>
						</div>
					</div>
					<div className='rounded-lg bg-gray-100 py-6 px-8 lg:px-10 flex items-center gap-x-6 lg:col-start-2 lg:col-end-4'>
						<div>
							<p className='lg:text-4xl text-3xl font-medium text-gray-600 border-2 border-gray-300 rounded-lg py-2.5 px-4'>
								$0
							</p>
						</div>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("priceName2")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("priceDes2")}
							</p>
						</div>
					</div>
					<div className='rounded-lg bg-gray-100 py-6 px-8 lg:px-10 flex items-center gap-x-6 lg:col-start-4 lg:col-end-6'>
						<div>
							<p className='lg:text-4xl text-3xl font-medium text-gray-600 border-2 border-gray-300 rounded-lg py-2.5 px-4'>
								$5
							</p>
						</div>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("priceName3")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("priceDes3")}
							</p>
						</div>
					</div>
				</div>
			</section> */}
			{/* <section className='lg:pt-40 pt-24 page flex items-center justify-center'>
				<div className='flex gap-x-3'>
					<a href='#'>
						<button className='rounded-md bg-gray-300 bg-opacity-50 hover:bg-gray-300 transition-all ml-2 pt-1 pb-1.5 px-3.5 text-gray-500 text-opacity-75 font-medium text-base'>
							{t("backToTop")}
						</button>
					</a>
					<a
						href='https://buttondown.email/helipeng?as_embed=true'
						target='_blank'
					>
						<button className='rounded-md bg-gray-300 bg-opacity-50 hover:bg-gray-300 transition-all ml-2 pt-1 pb-1.5 px-3.5 text-gray-500 text-opacity-75 font-medium text-base'>
							{t("navJoin")}
						</button>
					</a>
				</div>
			</section> */}
			<section className='lg:pt-40 pt-24 page flex items-center justify-center'>
				<a href='#'>
					<button className='rounded-md bg-gray-300 bg-opacity-50 hover:bg-gray-300 transition-all ml-2 py-2 px-5 text-gray-500 text-opacity-75 font-medium text-lg'>
						{t("comingSoon")}
					</button>
				</a>
			</section>
			<footer className='text-center lg:mt-40 mt-20 mb-10 border-t pt-10 text-gray-600'>
				<p className='lg:text-base text-sm'>
					&copy; 2021 Snapod | Snapod is a project by TonyHe (
					<a
						href='https://twitter.com/ttttonyhe'
						target='_blank'
						className='font-medium hover:text-gray-800 transition-all'
					>
						@TTTTonyHe
					</a>
					)
				</p>
			</footer>
		</main>
	);
}
