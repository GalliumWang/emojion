import Head from 'next/head';
import Image from 'next/image';
import styles from './index.module.scss';
import Themebar from '/components/themebar';
import Videocontainer from '/components/videocontainer';
import placeholderImg from '/public/images/placeholder.png'

export default function Home({device}) {
  const headerStyle = {
    height: '80px'
  }
  const footerStyle = {
    height: '120px' 
  }
  const middleStyle = {
    height: '600px'
  }
  if(device === 'desktop') {
    return (
      <div className="flex flex-col justify-around content-center">
        <Head>
          <title>Emojion</title>
          
          <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js"></script>

          <script defer src="/js/home.js" />
        </Head>
        <div id="header" style={headerStyle} className="border-2 border-gray-500"></div>
        <div id="middle" style={middleStyle} className="flex flex-row justify-start md:justify-around items-center py-8">
          <div className="w-1/4 md:w-1/5 flex flex-row justify-around items-center" id={styles.leftMenu}>
            <Themebar/>
          </div>
          <div className="w-3/4 md:w-3/5 flex flex-row justify-around items-center" id={styles.videoArea}>
            <Videocontainer/>
          </div>
          <div className="hidden md:block md:w-1/5 flex flex-row justify-around items-center">
            <Image src={placeholderImg} alt="placeholder"/>
          </div>
        </div>
        <div id="footer" style={footerStyle} className="border-2 border-gray-500"></div>
      </div>
    )
  }
  else{
    return (
      <div className="modal pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-around">
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        {/* Add margin if you want to see some of the overlay behind the modal */}
        <div className="modal-content py-4 text-left px-6">
          
          {/* Title */}
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">请使用桌面端浏览器访问!</p>
          </div>
  
          {/* Body */}
          <p>为确保最佳使用体验，请使用桌面端浏览器访问该应用</p>
          
        </div>
      </div>
    </div>
    )
  }
}

function DesktopCheck(userAgent){
  return !/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

Home.getInitialProps = ({ req }) => {
  let userAgent = req.headers['user-agent'];
  let device;

  if(DesktopCheck(userAgent)){
    device = 'desktop';
  }
  else{
    device = 'mobile';
  }

  return {device: device};

}