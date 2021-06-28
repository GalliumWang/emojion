import styles from './Themebar.module.scss';
import Head from 'next/head';
import Themebutton from './Themebutton';

function Themebar() {
    return (
        <div id="themeBar" className={`${styles.menu} flex flex-col justify-start content-center space-y-4 border-2 py-4`}>
            <Head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/color-js/1.0.1/color.min.js" integrity="sha512-ODHUqBj0yOk4rj5ORt7EExbT4Jq+yQ5EbeQH2Ri3eMkCBIR9wgUOWXO5CYr37yl2pV1+YdXIPbAYgEKHyM/k8A==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
                <script defer src="/js/theme.js" />
            </Head>
            {/* the theme use event proxy,so the click event in theme title need to be stopPropagation*/}
            <h2 className="text-center hidden md:block md:text-2xl" onClick={(e) => e.stopPropagation()}>主题</h2>
            <Themebutton buttonId="theme1" color="rgb(161, 130, 118)"/>
            <Themebutton buttonId="theme2" color="rgb(60, 105, 151)"/>
            <Themebutton buttonId="theme3" color="rgb(221, 224, 189)"/>
            <Themebutton buttonId="theme4" color="rgb(221, 151, 135)"/>
            <Themebutton buttonId="theme5" color="rgb(244, 184, 134)"/>
        </div>
    )
}

export default Themebar
