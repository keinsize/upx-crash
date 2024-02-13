import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'

import { IMeta } from '@/types/meta.interface'

import { onlyText } from '@/utils/clear-text'

import { siteName, titleMerge } from '@/config'

const Meta: FC<PropsWithChildren<IMeta>> = ({
	title,
	description,
	image = '/favicon.ico',
	children,
	type = 'website'
}) => {
	return (
		<>
			<Head>
				<title itemProp='headline'>{titleMerge(title)}</title>
				<link rel='icon' href={image} type='image/x-icon' />
				{description ? (
					<>
						<meta
							itemProp='description'
							name='description'
							content={onlyText(description, 152)}
						/>
						<meta property='og:type' content={type} />
						<meta property='og:locale' content='en' />
						<meta property='og:title' content={titleMerge(title)} />
						<meta property='og:image' content={image} />
						<meta property='og:site_name' content={siteName} />
						<meta
							property='og:description'
							content={onlyText(description, 197)}
						/>
					</>
				) : (
					<meta name='robots' content='noindex, nofollow' />
				)}
			</Head>
			{children}
		</>
	)
}

export default Meta
