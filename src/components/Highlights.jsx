import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

function Highlights() {
    useGSAP(() =>{
        gsap.to('#title' , {
            opacity:1,
            y:0,
            // ease:'power1.inOut' 
        })
        gsap.to(('.link') ,{
            opacity:1,
            // delay:1,
            y :0,
            duration:1,
            stagger:0.3
        })
    } ,[])

  return (
    <section id='highlights'
        className='w-screen overflow-hidden h-full common-padding bg-[#101010] mt-0 '
    >
        <div className='screen-max-width'>
            <div className='w-full flex flex-col md:flex-row
            md:items-start sm:mt-0 md:mt-0 items-baseline justify-between
            gap-3 mb-10

            '>
                <h1 id='title' className='section-heading mb-10 leading-tight md:mb-0 '>Get the highlights.
                </h1>
                <div className='flex items-baseline-last gap-x-10 '>
                    <p className='link flex items-center  gap-2 leading-none'>Watch the film
                        <img src={watchImg} alt="watch" className='ml-2 h-5 w-5'/>
                    </p>
                    <p className='link flex items-center gap-2 text-base leading-none'>Watch the event
                        <img src={rightImg} alt="right" className='ml-2 h-4 w-4'/>
                    </p>
                </div>
            </div>
            <div className='mt-16'>
            <VideoCarousel />
            </div>
        </div>

    </section>
  )
}

export default Highlights