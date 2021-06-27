import styles from './Themebar.module.css';

function Themebar() {
    return (
        <div className={`${styles.menu} flex flex-col justify-start content-center`}>
            {/* the theme use event proxy,so the click event in theme title need to be stopPropagation*/}
            <h2 className="text-center hidden md:block md:text-2xl my-3" onClick={(e) => e.stopPropagation()}>主题</h2>
            <div className="flex items-center justify-center my-1.5">
                <input id="radio1" type="radio" name="radio" className="hidden" defaultChecked />
                <label htmlFor="radio1" className="flex items-center cursor-pointer text-xl">
                <span style={{backgroundColor: "#A18276"}} className="w-8 h-8 block rounded-full border border-grey flex-no-shrink"></span>
                </label>
            </div>
            <div className="flex items-center justify-center my-1.5">
                <input id="radio2" type="radio" name="radio" className="hidden" />
                <label htmlFor="radio2" className="flex items-center cursor-pointer text-xl">
                <span style={{backgroundColor: "#3C6997"}} className="w-8 h-8 block rounded-full border border-grey flex-no-shrink"></span>
                </label>
            </div>
            <div className="flex items-center justify-center my-1.5">
                <input id="radio3" type="radio" name="radio" className="hidden" />
                <label htmlFor="radio3" className="flex items-center cursor-pointer text-xl">
                <span style={{backgroundColor: "#DDE0BD"}} className="w-8 h-8 block rounded-full border border-grey flex-no-shrink"></span>
                </label>
            </div>
            <div className="flex items-center justify-center my-1.5">
                <input id="radio4" type="radio" name="radio" className="hidden" />
                <label htmlFor="radio4" className="flex items-center cursor-pointer text-xl">
                <span style={{backgroundColor: "#DD9787"}} className="w-8 h-8 block rounded-full border border-grey flex-no-shrink"></span>
                </label>
            </div>
            <div className="flex items-center justify-center my-1.5">
                <input id="radio5" type="radio" name="radio" className="hidden" />
                <label htmlFor="radio5" className="flex items-center cursor-pointer text-xl">
                <span style={{backgroundColor: "#F4B886"}} className="w-8 h-8 block rounded-full border border-grey flex-no-shrink"></span>
                </label>
            </div>
        </div>
    )
}

export default Themebar
