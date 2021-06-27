function Themebutton({buttonId,color}) {
    return (
        <div className="flex items-center justify-center">
            <input id={buttonId} type="radio" name="radio" className="hidden" defaultChecked />
            <label htmlFor={buttonId} className="flex items-center cursor-pointer text-xl">
            <span style={{backgroundColor: color}} className="w-8 h-8 block rounded-full border border-grey flex-no-shrink"></span>
        </label>
    </div>
    )
}

export default Themebutton
