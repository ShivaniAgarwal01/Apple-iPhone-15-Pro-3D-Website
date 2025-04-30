import React ,{Fragment}from 'react'
import { footerLinks } from '../constants'

function Footer() {
  return (
    <footer className='py-5 sm:px-10 px-5'>
        <div className='screen-max-width'>
            <div>
                <p className='font-semibold text-[#86868b] text-[12px]'>More ways to shop: {' '}
                    <span className='underline text-[#2997FF]'>
                        Find an Apple Store {' '}
                    </span>
                    or {' '}
                    <span className='underline text-[#2997FF]'>
                        other retailer {' '}
                    </span>
                    near you.
                </p>
                <p className='font-semibold text-[#86868b] text-[12px]'>Or call 00800-040-1966{' '}
                    </p>
            </div>
            <div className='h-8'></div>
            <div className='bg-neutral-700 my-5 h-[1px] w-full' />
            <div className='h-4'></div>
            <div className='flex md:flex-row flex-col md:items-center justify-between'>
                <p className='font-semibold text-[#86868b] text-[12px]'>
                    Copyright @ 2025 Apple Inc. All rights reserved. 
                </p>
                <div className='flex flex-wrap'>
                    {footerLinks.map((link, i) => (
                        <div key={link} className="font-semibold text-[#86868b] text-[12px]">
                            {' '}{link} {' '}
                            {i !== footerLinks.length - 1 && <span>|</span>}
                        </div>
                    ))}
                </div>
            </div>
                <div className='h-4'></div>
        </div>
    </footer>
  )
}

export default Footer