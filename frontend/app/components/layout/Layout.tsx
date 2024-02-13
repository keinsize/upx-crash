import { FC, PropsWithChildren } from 'react'

import { IMeta } from '@/types/meta.interface'

import Footer from './footer/Footer'
import Header from './header/Header'
import Meta from './meta/Meta'
import Sidebar from './sidebar/Sidebar'

const Layout: FC<PropsWithChildren<IMeta>> = ({ children, ...rest }) => {
	return (
		<>
			<Meta {...rest} />

			<Header />
			<Sidebar />
			<section className='relative ml-[72px] mt-[50px] mb-[50px] px-[15px]'>
				{children}
			</section>
			<Footer />
		</>
	)
}

export default Layout
