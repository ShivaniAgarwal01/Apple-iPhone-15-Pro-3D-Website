import React, { useReducer } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { animateWithGsap } from '../utils/animantions'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

gsap.registerPlugin(ScrollTrigger)
function HowItWorks() {
    const videoRef = useRef()
    useGSAP(() =>{
        gsap.from('#chip' ,{
            scrollTrigger:{
                trigger :'#chip',
                toggleActions : 'restart reverse restart reverse',
                start :'top 80%', 

            },
            scale:2,
            opacity :0,
            duration:1,
            ease :'power2.inOut'
        })
        animateWithGsap('.g_fadeIn' ,{
            opacity :1,
            y:0,
            duration :1,
            ease:'power2.inOut'
        })
    } ,[])

  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <div id='chip' className='flex-center w-full my-20'>
                <img src={chipImg} alt="chip" width={180} height={180} 
                className='block'
                />
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='hiw-title'>
                    A17 Pro chip.
                    <br /> A monster win for gaming.
                </h2>
                <p className='hiw-subtitle'>
                    It's here. The biggest redesign in the history of Apple GPUs.
                </p>
            </div>
            <div className='mt-10 lg:mt-20 mb-14'>
                <div className='relative h-full flex-center mb-10'>
                    <div className='overflow-hidden'>
                        <img 
                            src={frameImg} 
                            alt="frame" 
                            className='bg-transparent relative z-10'
                            />
                            </div> 
                            <div className='hiw-video'>
                                <video 
                                className='pointer-events-none'
                                 playsInline 
                                 preload='none'
                                 muted
                                 autoPlay
                                 ref={videoRef}
                                >
                                    <source 
                                        src={frameVideo}
                                        type='video/mp4'
                                    />
                                </video>
                            </div>
                    </div>
                <p className='text-[#86868b] font-semibold text-center mt-3'>
                    Honkai: Star Rail
                </p>
                </div>
                <div className='hiw-text-container'>
                            <div className='flex flex-1 justify-center flex-col'>
                                <p className='hiw-text g_fadeIn'>
                                    A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                                    <span className='text-white'>
                                        best graphic performance by far 
                                    </span>.
                                </p>
                                <br />
                                <p className='hiw-text g_fadeIn'>
                                    Mobile {' '}
                                    <span className='text-white'>
                                        games will look and feel so immersive
                                    </span>,
                                    with incredibly detailed environments and more realistic characters.And with industry-leading speed and efficiency, A17 Pro takes fast and runs with it.
                                </p>   
                            </div>
                        <div className='flex-1 flex justify-center flex-col g_fadeIn'>
                            <p className='hiw-text'>New</p>
                            <p className='hiw-bigtext' style={{margin :0, padding:0 , lineHeight :1}}>Pro-class GPU</p>
                            <p className='hiw-text'>with 6 cores</p>
                        </div>
                     </div>
            </div>
    </section>
  )
}

export default HowItWorks