const emotionImgDict = {
    anger:null,
    disgust:null,
    fear:null,
    happiness:null,
    neutral:null,
    sadness:null,
    surprise:null,
}

function emojiImgPrefetch(){
    for(key of Object.keys(emotionImgDict)){
        let imgSrc=`/Assets/img/emoji/${key}.png`;
        emotionImgDict[key]=new Image();
        emotionImgDict[key].src=imgSrc;

    }
}

emojiImgPrefetch();

function imgElementFactory(emotionType){
    return emotionImgDict[emotionType].cloneNode(true);
}

function imgNormalize(imgElement){
    imgElement.style.width='150px';

    imgElement.style.position='absolute';
    imgElement.style.margin='auto';
    imgElement.style.top='0px';
    imgElement.style.right='0px';
    imgElement.style.left='0px';
    imgElement.style.transform='translateY(-100%)';
}

const DROPSCALE = 1.8;
const DROPDURATION = 1.2;

function calcRollDeg(rollDistance,objWidth){
    let objPerimeter = objWidth * Math.PI;
    let rollDeg = 360 * (rollDistance / objPerimeter);
    return rollDeg;
}

function dropEmoji(emojiElement,cb){
    emojiElement.id = "currentEmoji";
    document.querySelector('body').appendChild(emojiElement);
    gsap.set("#currentEmoji", {y: "-100%"});
    let dropHeight = getHeight(document.querySelector('body')) - getHeight(emojiElement) * (1 + (DROPSCALE - 1) / 2);
    gsap.to(emojiElement, {
        duration: DROPDURATION, 
        y: `${dropHeight}px`,
        scale: DROPSCALE,
        ease: "bounce", // TODO: detach drop and debounce animation
        onStart: cb
    });
}

function rollOutEmoji(element,cb){
    let rollDistance = getWidth(document.querySelector('body'))/2 + getWidth(element)*DROPSCALE/2;
    gsap.to(element,{
                        duration: 2, 
                        rotation: calcRollDeg(rollDistance,getWidth(element)),
                        x: `${rollDistance}px`,
                        onComplete: cb
    })

}

function getHeight(element){
    let heightStr = getComputedStyle(element).height;
    return parseFloat(heightStr.substring(0,heightStr.length-2));
}

function getWidth(element){
    let widthStr = getComputedStyle(element).width;
    return parseFloat(widthStr.substring(0,widthStr.length-2));
}

function triggerEmojiAnimation(emojiType){
    let emojiElement = imgElementFactory(emojiType);
    imgNormalize(emojiElement);
    dropEmoji(emojiElement,onEmojiDropStart);

    function onEmojiDropStart(){
        setTimeout(
            ()=>{
                    rollOutEmoji(emojiElement,onEmojiRollOutComplete);
                },
            DROPDURATION * 0.3 *1000
        )
    }

    function onEmojiRollOutComplete(){
        emojiElement.remove();
    }
}

