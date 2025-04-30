import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ModelView from './ModelView'
import { yellowImg } from '../utils';
import { Canvas } from '@react-three/fiber'
import {View} from '@react-three/drei'
import { models, sizes } from '../constants/index';
import ErrorBoundary from './ErrorBoundary';
import { Html } from '@react-three/drei';
import * as THREE from 'three'
import { animateWithGsapTimeline } from '../utils/animantions';


function Model() {
    const [size, setSize] = useState('small');
    const [model , setModel] = useState({
        title : 'Iphone 15 Pro in Natural Titanium',
        color :['#8F8A81' , '#FFE7B9' ,'#6F6C64'],
        img : yellowImg
    })

    //camera control for model view
    const cameraControllSmall = useRef();
    const cameraControllLarge = useRef();

    //model
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    //rotation
    const [smallRotation , setSmallRotation] = useState(0);
    const [largeRotation , setLargeRotation] = useState(0);

    const tl = gsap.timeline();
    
    useEffect(() => {
        if(size === 'large'){
            animateWithGsapTimeline(tl , small , smallRotation , '#view1' , '#view2' ,{
                transform : 'translateX(-100%)',
                duration : 2
            })
        }
        if(size === 'small')
        {
            animateWithGsapTimeline(tl , large , largeRotation , '#view2' , '#view1' ,{
                transform : 'translateX(0)',
                duration : 2
            })
        }
    } ,[size])


    useGSAP(() => {
        gsap.to('#heading' ,{
            opacity: 1,
            y : 0,
            delay: 2,
        })
    },[])
  return (
    <section className='common-padding'>
        <div className='screen-max-width'>
            <h1 id="heading" className='section-heading'>
                Take a closer look.
            </h1>
            <div className='flex flex-col items-center mt-5'>
                <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        <ModelView 
                            index= {1}
                            groupRef= {small}
                            gsapType = "view1"
                            controlRef = {cameraControllSmall}
                            setRotationState= {setSmallRotation}
                            item = {model}
                            size = {size}
                             
                        />
                        <ModelView 
                            index= {2}
                            groupRef= {large}
                            gsapType = "view2"
                            controlRef = {cameraControllLarge}
                            setRotationState= {setLargeRotation}
                            item = {model}
                            size = {size}   
                        />

                    <ErrorBoundary>
                        <Canvas
                            className = "w-full h-full"
                            style = {{
                                position : 'fixed',
                                top : 0,
                                bottom : 0 ,
                                right : 0,
                                left : 0,
                                overflow : 'hidden'
                            }}
                            dpr={[1,2]}
                            eventSource = {document.getElementById('root')}
                            >
                            <View.Port />
                        </Canvas>
                    </ErrorBoundary>
                </div>
                <div className='mx-auto w-full'>
                        <p className='text-md  font-light text-center mb-10 '>{model.title}</p>
                    <div className='flex-container'>
                        <ul className='color-container '>
                            {models.map((item, i) => (
                                <li key={i} className='w-6 h-6 rounded-full mx-2'
                                    style={{
                                        backgroundColor : item.color[0]
                                    }}
                                    onClick={() => setModel(item)}
                                />
                            ))}
                        </ul>
                        <button className='size-btn-container'>
                            {sizes.map(({label , value}) => (
                                <span key={label} className='size-btn'
                                    style={{backgroundColor: size === value ? 'white' :' transparent', 
                                        color: size=== value?'black' : 'white'}}
                                        onClick={() => setSize(value)}
                                >
                                    {label}
                                </span>
                            ))}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </section>
        
    )
}

export default Model