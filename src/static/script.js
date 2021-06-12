const COLOR_LIST = {
  handsContour:'#b881e2',
  handsJointContour: '#e8b06b',
  handsJoint: '#7021ad'
}

function enterScreenDisplayControl(show){
  if(show){
    document.querySelector('#enter-screen').style.removeProperty('display')
  }
  else{
    document.querySelector('#enter-screen').style.setProperty('display', 'none');
  }
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

function videoImageGetter(){
  var canvas = document.getElementById('videoImageCapturer');     
  var video = document.querySelector('video');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
  return canvas.toDataURL();
}

function onResults(results) {
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

let handsDetectionOn = false;
let emojiDropAnimationOn = false;

// Our input frames will come from here.
const videoElement =
    document.getElementsByClassName('input_video')[0];
const canvasElement =
    document.getElementsByClassName('output_canvas')[0];
const controlsElement =
    document.getElementsByClassName('control-panel')[0];
const canvasCtx =
    canvasElement.getContext('2d');
const fpsControl = 
    new FPS();
const lodingComponent =
    document.querySelector('.loading');

let hands,camera;
hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
}});  // for reuse after every stop

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
  hands.setOptions({
    maxNumHands: 2,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  })
  hands.onResults(onResults);

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

function startApp(){
  enterScreenDisplayControl(false);
  requireCameraPermission();
}

// function stopApp{
//   // clear content in video and canvas element
//   // remove control panel and make enter screen visible again
// }