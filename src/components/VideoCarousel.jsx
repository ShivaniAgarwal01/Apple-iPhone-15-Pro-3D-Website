import React, { useEffect, useRef , useState} from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

function VideoCarousel() {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video , setVideo] = useState({
    isEnd : false,
    startPlay : false,
    videoId :0,
    isLastVideo :false,
    isPlaying : false,
  })

  
  const [loadedData, setloadedData] = useState([])
  
  const {isEnd, isLastVideo, startPlay , videoId , isPlaying } = video;
  
  useEffect(() => {
      if(loadedData.length > 3)
      {
        if(!isPlaying)
          {
            videoRef.current[videoId].pause();
        }else{
          if(startPlay)
          {
            videoRef.current[videoId].play();
          }
        }
      }
    }, [startPlay , videoId, isPlaying , loadedData])


    useGSAP(() =>{

      gsap.to('#slider' ,{
        transform: `translateX(${-100 * videoId}%)`,
        duration: 2,
        ease : 'power2.inOut'
      })

      gsap.to('#video' ,{
        scrollTrigger:{
          trigger:'#video',
          toggleActions:'restart none none none'
        },
        onComplete : () =>{
          setVideo((prev) => ({
            ...prev ,
            startPlay:true,
            isPlaying:true,
          }))
        }
      })
    } ,[isEnd , videoId])
    
    const handleLoadedMetaData = (i , e) => setloadedData((prev) => [...prev , e]);


  useEffect(() =>{
    let animUpdate;
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if(span[videoId])
    {
      let anim = gsap.to(span[videoId] , {
        onUpdate : () =>{
          const progress = Math.ceil(anim.progress() * 100)
          ;
          if(progress != currentProgress)
          {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId] , {
              width : window.innerWidth < 760
              ? '10vw' 
              : window.innerWidth <1200
              ? '10vw'
              : '4vw'
            })

            gsap.to(span[videoId] ,{
              width : `${currentProgress}%`,
              backgroundColor : 'white'
            })
          }
        },
        onComplete : () =>{
            if(isPlaying)
            {
              gsap.to(videoDivRef.current[videoId], {
                width: '12px'
              })

              gsap.to(span[videoId] ,{
                backgroundColor : '#afafaf'
              })

            }
        }
    })
    if(videoId === 0)
    {
      anim.restart();
    }

    animUpdate = () => {
      anim.progress(videoRef.current[videoId].currentTime  / hightlightsSlides[videoId].videoDuration)
    }
  }

  if(isPlaying)
  {
    gsap.ticker.add(animUpdate)
  }else{
    gsap.ticker.remove(animUpdate)
  }


} , [videoId, startPlay])

  const handleProcess = (type , i) =>{
      switch (type) {
        case 'video-end':
          setVideo((prev) => ({...prev , isEnd:true , videoId : i+1}))  
          break;

        case 'video-last':
          setVideo( (prev) => ({
             ...prev , isLastVideo:true ,
          }))
          break;

        case 'video-reset':
        setVideo((prev) =>({...prev , isLastVideo : false ,videoId : 0}))
          break;

         case 'play':
          setVideo((prev) => ({...prev ,isPlaying :!prev.isPlaying}))
          break;

          case 'pause':
            setVideo((prev) => ({...prev , isPlaying : !prev.isPlaying}))
            break;

        default:
          return video;
          // break; 
      }

  }

  return (
    <>
    <div className='flex items-center gap-10 sm:gap-20 mt-20 sm:mt-20 '>
        {hightlightsSlides.map((list ,i ) => (
            <div key={list.id} id='slider' className='pr-10 sm:pr-20 mt-10'>
                <div className='relative video_carousel_container'>
                    <div className='w-full h-full flex items-center justify-center
                    rounded-3xl overflow-hidden bg-black'>
                      <video 
                        id='video'
                        playsInline= {true}
                        preload='auto'
                        muted
                        className= {` %{
                            list.id === 2 && 'translate-x-44'}
                            pointer-events-none
                          `}
                        ref={(el) => (videoRef.current[i] = el)}
                        onEnded={() => 
                          i !== 3
                          ? handleProcess('video-end' , i)
                          : handleProcess('video-last')
                        }
                        onPlay={() => {
                          setVideo((prevVideo) => ({
                            ...prevVideo , isPlaying : true
                          }))
                        }}
                        onLoadedMetadata = {(e) => handleLoadedMetaData(i , e )}
                      >
                        <source src={list.video} type='video/mp4' />
                      </video>
                    </div>
                    <div className='absolute top-10 left-[5%] z-10 text-white'>
                    {list.textLists.map((text) =>(
                  <p key={text} 
                  className='md:text-xl sm:text-xl font-medium mb-2'
                  >
                    {text}
                  </p>
          ))}
                    </div>
                </div>

            </div>
    ))}
    </div>
    <div className='relative flex items-center justify-center mt-10 mb-20 h-[150px]'>
      <div className='flex items-center justify-center px-6 gap-4 py-3 bg-[#42424570] rounded-3xl backdrop-blur-lg w-40 h-10 '>
      {videoRef.current.map((_ , i) => (
          <span 
            key={i}
            ref={(el) => (videoDivRef.current[i] = el )}
            className='relative w-10 h-3 rounded-full bg-gray-300 overflow-hidden cursor-pointer'
          >
            <span 
            className='absolute h-full left-0 top-0 bg-white'
            ref={(el) => (videoSpanRef.current[i] = el )}
            />
          </span>
      ))}
      </div>
      <button className='control-btn'>
        <img src={isLastVideo ? replayImg : 
          !isPlaying ? playImg : pauseImg}
           alt={isLastVideo ? 'replay'  : !isPlaying ? 'play' : 'pause '}
            onClick= { () => {
              if (isLastVideo) {
                handleProcess('video-reset');
              } else if (!isPlaying) {
                handleProcess('play');
              } else {
                handleProcess('pause');
              }  
            }}
           />
      </button>
    </div>
    </>
  )
}

export default VideoCarousel