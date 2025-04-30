import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constants'

function Navbar() {
  return (
    <header className='w-full mt-10 py-10 sm:px-10 px-5 flex justify-between items-center' >   
        <nav className='flex w-full screen-max-width'>
            <img src={appleImg} alt="Apple" width={14} height={18} />
            <div className='flex  flex-1 justify-center max-sm:hidden gap-x-10'>
                {navLists.map((nav) =>(
                    <div key={nav} className='text-sm cursor-pointer text-[#86868b] hover:text-white transition-all'>
                        {nav}
                    </div >
                ))}
            </div>
            <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
                <img src={searchImg} alt="search" height={18} width={18}/>
                <img src={bagImg} alt="bag" height={18} width={18}/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar