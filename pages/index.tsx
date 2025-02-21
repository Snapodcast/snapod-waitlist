import Head from "next/head";
import React, { useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import Icons from "../components/Icons";
import en from "../locales/en/common.json";
import zh from "../locales/zh-cn/common.json";

const Home = () => {
	const langFromCookie = getCookie("snapod-lang");
	const [lang, setLang] = useState<string>(
		langFromCookie ? langFromCookie.toString() : "en"
	);

	const t = (key: string) => {
		switch (lang) {
			case "en":
				return en[key];
			case "zh":
				return zh[key];
			default:
				return en[key];
		}
	};

	const changeLang = (lang: string) => {
		setLang(lang);
		setCookie("snapod-lang", lang, { maxAge: 365 * 24 * 60 * 60 });
	};

	const [email, setEmail] = React.useState<string>("");
	const [joined, setJoined] = React.useState<boolean>(false);
	const [processing, setProcessing] = React.useState<boolean>(false);

	const doJoin = async () => {
		setProcessing(true);

		try {
			const res = await fetch(
				"https://lists.lipeng.ac/api/public/subscription",
				{
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						name: email.split("@")[0],
						list_uuids: ["060f023e-8c73-4c4a-b57b-df4b6d6eb3bf"],
					}),
				}
			);
			const data = await res.json();
			setProcessing(false);
			if (data.data) {
				setJoined(true);
			} else {
				alert(t("cannotJoin"));
			}
		} catch (error) {
			console.error(error);
			setProcessing(false);
		}
	};

	const title = `Snapod | ${t("headSlogan")}`;

	return (
		<main className='animate-fade-in'>
			<Head>
				<title>{title || "Snapod"}</title>
				<meta
					name='description'
					content='Snapod is a podcast hosting platform dedicated to providing podcast enthusiasts with comprehensive and powerful features and solutions for podcast creation, operation and continuous growth.'
				/>
				<meta
					name='keywords'
					content='snapod, snapodcast, podcast, podcast hosting, rss, web3, rss3, 声奈波, 播客, 播客平台'
				/>
				<link
					rel='icon'
					href='https://storage.snapodcast.com/arweave/favicon.ico'
				/>
			</Head>
			<section className='h-screen w-full snapod-background text-gray-700 mb-20 border-b border-gray-200'>
				<nav className='flex page lg:pt-10 pt-14 lg:bg-transparent z-10 top-0 w-full lg:relative lg:pb-0 pb-3 shadow-none text-xl items-center justify-center backdrop-filter-none'>
					<div
						id='snapod-logo'
						className='flex flex-1 gap-x-1.5 font-medium lg:text-xl text-2xl items-center text-gray-600 justify-center lg:justify-start'
					>
						<img
							src='https://storage.snapodcast.com/arweave/snapod_logo_v1.png'
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
							href='https://app.snapodcast.com'
							target='_blank'
						>
							{t("alpha")}
						</a>
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
							className='rounded-md bg-gray-300/50 hover:bg-gray-300 transition-all pt-1 pb-1.5 px-2.5 text-gray-500 text-opacity-75 font-medium text-base'
							defaultValue={lang}
							onChange={(e) => {
								changeLang(e.target.value);
							}}
						>
							<option value='zh'>简体中文</option>
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
						<div className='flex lg:w-[500px] whitespace-nowrap mx-12'>
							<input
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								placeholder={t("email")}
								className='border transition-all border-gray-300 hover:border-gray-400 shadow-xs lg:py-2 lg:px-5 py-1.5 px-2 lg:pl-4 pl-3 rounded-lg lg:text-base text-sm bg-white flex-1 outline-hidden focus:shadow-md'
							/>
							<button
								onClick={() => {
									if (!joined) {
										doJoin();
									}
								}}
								className='lg:block lg:min-w-[172.63px] hidden rounded-md bg-gray-600 border border-gray-600 hover:bg-gray-700 transition-all ml-3 lg:py-2 lg:px-5 py-1.5 px-4 text-sm text-white lg:text-base shadow-xs hover:shadow-md'
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
								className='lg:hidden block rounded-md cursor-pointer bg-gray-600 border border-gray-600 hover:bg-gray-700 transition-all ml-3 lg:py-2 lg:px-5 py-1.5 px-4 text-sm text-white lg:text-base shadow-xs hover:shadow-md'
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
						src='https://storage.snapodcast.com/arweave/snapod-editing-episodes.png'
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
							src='https://storage.snapodcast.com/arweave/snapod-analytics.png'
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
							src='https://storage.snapodcast.com/arweave/distributions.png'
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
							<img src='https://storage.snapodcast.com/arweave/appstore.png' />
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
							<img src='https://storage.snapodcast.com/arweave/microsoftstore.png' />
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
					<div className='rounded-lg bg-gray-50 border border-gray-200 lg:p-12 p-8'>
						<div>
							<h2 className='text-xl lg:text-2xl font-medium text-gray-600 mb-1'>
								{t("web")}
							</h2>
							<p className='text-base lg:text-lg text-gray-500'>
								{t("webDes")}
							</p>
						</div>
					</div>
					<div className='rounded-lg bg-gray-50 border border-gray-200 lg:p-12 p-8'>
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
			<section className='lg:pt-40 pt-24 page flex items-center justify-center'>
				<a href='#'>
					<button className='rounded-md cursor-pointer bg-gray-300/50 hover:bg-gray-300 transition-all ml-2 py-2 px-5 text-gray-500 text-opacity-75 font-medium text-lg'>
						{t("comingSoon")}
					</button>
				</a>
			</section>
			<footer className='text-center lg:mt-40 mt-20 mb-10 border-t border-gray-200 pt-10 text-gray-600'>
				<p className='lg:text-base text-sm'>
					&copy; 2021 - {new Date().getFullYear()} Snapod | A project by Tony He
					(
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
};

export default Home;
