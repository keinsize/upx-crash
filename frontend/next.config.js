/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: false,
	swcMinify: true,
	experimental: {
		esmExternals: false
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/games/crash',
				permanent: true
			}
		]
	}
}
