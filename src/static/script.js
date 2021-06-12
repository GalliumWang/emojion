let Color = net.brehaut.Color;

function DesktopCheck(){
  return !/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function toggleModal () {
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  body.classList.toggle('modal-active')
}

function displayControl(element,show){ //FIXME: add support for both id and element variable
  element = document.querySelector(`#${element}`);
  if(show){
    element.classList.remove('hidden');
  }
  else{
    element.classList.add('hidden');
  }

}

const COLOR_LIST = {
  handsContour:'#b881e2',
  handsJointContour: '#e8b06b',
  handsJoint: '#7021ad'
}

let handsDetectionOn = false;
let emojiDropAnimationOn = false;

// Our input frames will come from here.
const videoElement =
    document.getElementsByClassName('input_video')[0];
const canvasElement =
    document.getElementsByClassName('output_canvas')[0];
const controlsElement =
    document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');

function videoImageGetter(){
  var canvas = document.getElementById('videoImageCapturer');     
  var video = document.querySelector('video');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
  return canvas.toDataURL();
}

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new FPS();

// TODO: optimize to hide loding logo dynamically
const lodingComponent = document.querySelector('.loading');

function onResults(results) {
  // Update the frame rate.

  // Draw the overlays.
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks && results.multiHandedness) {
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      const landmarks = results.multiHandLandmarks[index];

      // draw hands contour
      drawConnectors(
          canvasCtx, landmarks, HAND_CONNECTIONS,
          {color: COLOR_LIST.handsContour}),

      // draw hands joint
      drawLandmarks(canvasCtx, landmarks, {
        color: COLOR_LIST.handsJointContour,
        fillColor: COLOR_LIST.handsJoint,
        radius: 1
      });

    }
  }
}

function faceDetect(){
  const options = {
    method: "POST",
    headers: {'content-type': 'application/json'},
    mode: 'cors'
  };

  let body={
            base64Data:null
          }
  
  let currentImgBase64Data = videoImageGetter();
  currentImgBase64Data = currentImgBase64Data.substr(currentImgBase64Data.indexOf(",")+1);
  body.base64Data=currentImgBase64Data;
  options.body = JSON.stringify(body);
  return fetch('/api/face-plus-plus-emotion-detect', options).then(res=>{return res.json();});
}

async function getEmotionResult(){
  let faceDetectionResult = await faceDetect();
  if(faceDetectionResult.faces.length == 0){
    return null;
  }
  else{
    let emotionRatings = faceDetectionResult.faces[0].attributes.emotion;
    return Object.keys(emotionRatings).reduce((a, b) => emotionRatings[a] > emotionRatings[b] ? a : b);
  }
}

function detectEmotionAndShowEmoji(){
  getEmotionResult().then(res=>{
                                if(res){
                                  triggerEmojiAnimation(res)
                                }
                                else{
                                  console.log('no face detected');
                                }
                              });
}

let detectEmotionAndShowEmojiThrottled=_.throttle(detectEmotionAndShowEmoji, 3000);

let hands,camera;

let root = document.querySelector(':root');

function changeTheme(targetColor){
  root.style.setProperty('--bg-color', targetColor);
  updateContainerBorderColor();
}

let leftMenu = document.querySelector('#left-menu');
let container = document.querySelector('.container');

function updateContainerBorderColor(){
  let themeColor = root.style.getPropertyValue('--bg-color');
  let colorObject = Color(themeColor);
  container.style.setProperty('border-color',colorObject.darkenByRatio(0.5).toCSS());
}

function getMatchedLabelForRadio(labelId){
  return document.querySelector('label[for=' + labelId + ']');
}


// code excuted before load

let radios = document.querySelectorAll("input[type='radio'][name='radio']");

for(radio of radios){
  if(radio.checked == true){
    let matchedLabel = getMatchedLabelForRadio(radio.id);
    changeTheme(matchedLabel.firstElementChild.style['background-color']);
  }
}

let changeThemeEventProxy = (event) => {
  if(event.target.tagName != 'SPAN'){
    return;
  }
  let targetColor = event.target.style['background-color'];
  changeTheme(targetColor);
}

leftMenu.addEventListener('click', changeThemeEventProxy);

window.onload = (event) =>{
  console.log('loaded');

  if(!DesktopCheck()){
    leftMenu.style.setProperty('filter','blur(16px)');
    container.style.setProperty('filter','blur(16px)');
    let inputVideo = document.querySelector('.input_video');
    inputVideo.remove();
    toggleModal();
    return;
  }

  //FIXME: can't stop function after start
  hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
  }});
  
  hands.setOptions({
    maxNumHands: 2,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  })
  hands.onResults(onResults);

  requireCameraPermission();
}

function requireCameraPermission(){
  setTimeout(() => {
    displayControl('spinner',false);
    displayControl('camera-permission-alert',true);
  }, 2000);
  navigator.mediaDevices.getUserMedia({video: { width: 1280, height: 720 }})
  .then(function(stream) {
    startVideoAndControlPanel();
  })
  .catch(function(err) {
    let cameraPermissionAlert = document.querySelector('#camera-permission-alert');
    if(cameraPermissionAlert.innerHTML != '请使用带摄像头的设备访问或在浏览器中允许该应用的相机权限'){
      cameraPermissionAlert.innerHTML = '请使用带摄像头的设备访问或在浏览器中允许该应用的相机权限';
    }
    setTimeout(requireCameraPermission, 1000);
  });
}

function startVideoAndControlPanel(){
  camera = new Camera(videoElement, {
    onFrame: async () => {
      fpsControl.tick();
      if(lodingComponent.style.display !== "none"){
        lodingComponent.style.display = 'none';
      }
      if(handsDetectionOn){
        await hands.send({image: videoElement});
      }
      if(emojiDropAnimationOn){
        detectEmotionAndShowEmojiThrottled();
      }
    },
    width: 1280,
    height: 720
  });

  camera.start();
  
  // Present a control panel through which the user can manipulate the solution
  // options.
  new ControlPanel(controlsElement, {
        selfieMode: true,
        handsDetectionOn: false,
        emojiDropAnimation: false
      })
      .add([
        new StaticText({title: '设置'}),
        fpsControl,
        new Toggle({title: '镜像', field: 'selfieMode'}),
        new Toggle({title: '手部识别', field: 'handsDetectionOn'}),
        new Toggle({title: '表情动画😇', field: 'emojiDropAnimation'})
      ])
      .on(options => {
        handsDetectionOn = options.handsDetectionOn;
        emojiDropAnimationOn = options.emojiDropAnimation;
  
        // config both for mediapipe api and video input
        videoElement.classList.toggle('selfie', options.selfieMode);
        hands.setOptions({selfieMode: options.selfieMode});
      });
}