import Head from 'next/head'
import React from 'react'
import styles from './Videocontainer.module.scss'

function Videocontainer() {
    return (
        <React.Fragment>
            <Head>
                <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.css" crossOrigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.2/drawing_utils.js" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/hands.js" crossOrigin="anonymous"></script>
                
                <script defer src="/js/videoControl.js" />
            </Head>
            <div className={`${styles.videoContainer} border-8 box-content`} id="videoContainer">
                <video className={`${styles.inputVideo} absolute w-full h-full`}/>
                <canvas className={`${styles.outputPanvas} absolute w-full h-full`} />
                <div className={`${styles.controlPanel} absolute w-full h-full`}></div>

                <div className={`absolute w-full h-full flex items-center justify-around`}>
                    <div className={`${styles.spinner} absolute`}/>
                    <div className="hidden text-2xl" id="cameraPermissionAlert">
                        请允许相机权限
                    </div>
                </div>
                <div id={styles.enterScreen} className="absolute w-full h-full flex items-center justify-around">
                    <a onClick="startApp()" id="enterButton" className="border-2 border-blue-500 rounded-full font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white">
                    启动应用
                    </a>
                </div>

            </div>

            <canvas className="hidden" id="videoImageCapturer" />
        </React.Fragment>
    )
}

export default Videocontainer
