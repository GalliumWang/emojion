const Color = net.brehaut.Color;

let themeBar = document.querySelector('#themeBar');

function updateComponentTheme(){
    let colorObject = Color(currentThemeColor);
    videoContainer.style.setProperty('border-color',colorObject.darkenByRatio(0.5).toCSS());
}

function updateUITheme(targetColor){
    root.style.setProperty('--bg-color', targetColor);
    updateComponentTheme();
}

function updateTheme(){
    localStorage.setItem('themeColor',currentThemeColor);
    updateUITheme(currentThemeColor);
}

function getThemeColorList(){
    let themeColorList = [];
    let themeInputList = [];
    let themeButtons = document.querySelectorAll("#themeBar > .themeButton");
    for(button of themeButtons){
        themeColorList.push(button.getElementsByTagName('span')[0].style['background-color']);
        themeInputList.push(button.getElementsByTagName('input')[0]);
    }
    return {themeColorList,themeInputList};
}

let {themeColorList,themeInputList} = getThemeColorList();
let currentThemeColor = localStorage.getItem("themeColor") == null ? themeColorList[0] : localStorage.getItem("themeColor");

themeInputList[themeColorList.findIndex((element) =>{
    return element == currentThemeColor;
})].checked = true; // select configered theme

let changeThemeEventProxy = (event) => {
    if(event.target.tagName != 'SPAN'){
        return;
    }
    let targetColor = event.target.style['background-color'];
    currentThemeColor = targetColor;
    console.log(111);
    updateTheme();
}

themeBar.addEventListener('click', changeThemeEventProxy);

updateTheme();