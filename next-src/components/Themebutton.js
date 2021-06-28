import styles from './Themebutton.module.scss';

function Themebutton({buttonId,color}) { // TODO: add checked parameter
    return (
        <div className="flex items-center justify-center themeButton">
            <input id={buttonId} type="radio" name="themeRadio" className={`${styles.themeInput} hidden`} />
            <label htmlFor={buttonId} className="flex items-center cursor-pointer text-xl">
                <span style={{backgroundColor: color}} className="w-8 h-8 block rounded-full border border-grey flex-no-shrink"></span>
            </label>
        </div>
    )
}

export default Themebutton
