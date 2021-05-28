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

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
}});

hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
})
hands.onResults(onResults);

const camera = new Camera(videoElement, {
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