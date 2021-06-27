import Head from 'next/head';
import Themebar from '/components/themebar';
import Videocontainer from '/components/videocontainer';

export default function Home() {
  const headerStyle = {
    height: '80px'
  }
  const footerStyle = {
    height: '120px' 
  }
  const middleStyle = {
    height: '600px'
  }
  return (
    <div className="flex flex-col justify-center content-center">
      <Head>
        <title>Emojion</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.css" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.2/drawing_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/hands.js" crossorigin="anonymous"></script>
        
        <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/color-js/1.0.1/color.min.js" integrity="sha512-ODHUqBj0yOk4rj5ORt7EExbT4Jq+yQ5EbeQH2Ri3eMkCBIR9wgUOWXO5CYr37yl2pV1+YdXIPbAYgEKHyM/k8A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      </Head>
      <div id="header" style={headerStyle} className="border-2 border-gray-500"></div>
      <div id="middle" style={middleStyle} className="flex flex-row justify-around items-center py-8">
        <div className="w-1/5 flex flex-row justify-around items-center" style={{minWidth: '100px'}}>
          <Themebar/>
        </div>
        <div className="w-3/5 flex flex-row justify-around items-center" style={{minWidth: '300px'}}>
          <Videocontainer/>
        </div>
        <div className="w-1/5 flex flex-row justify-around items-center" style={{minWidth: '100px'}}>
          hello
        </div>
      </div>
      <div id="footer" style={footerStyle} className="border-2 border-gray-500"></div>
    </div>
  )
}
