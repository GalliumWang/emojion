import styles from './Themebar.module.css';
import Themebutton from './Themebutton';

function Themebar() {
    return (
        <div className={`${styles.menu} flex flex-col justify-start content-center space-y-4 border-2 py-4`}>
            {/* the theme use event proxy,so the click event in theme title need to be stopPropagation*/}
            <h2 className="text-center hidden md:block md:text-2xl" onClick={(e) => e.stopPropagation()}>主题</h2>
            <Themebutton buttonId="radio1" color="#A18276"/>
            <Themebutton buttonId="radio2" color="#3C6997"/>
            <Themebutton buttonId="radio3" color="#DDE0BD"/>
            <Themebutton buttonId="radio4" color="#DD9787"/>
            <Themebutton buttonId="radio5" color="#F4B886"/>
        </div>
    )
}

export default Themebar
