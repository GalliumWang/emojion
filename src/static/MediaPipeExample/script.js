const COLOR_LIST = {
  handsContour:'#b881e2',
  handsJointContour: '#e8b06b',
  handsJoint: '#7021ad'
}

let handsDetectionOn = false;

// Our input frames will come from here.
const videoElement =
    document.getElementsByClassName('input_video')[0];
const canvasElement =
    document.getElementsByClassName('output_canvas')[0];
const controlsElement =
    document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');

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
  },
  width: 1280,
  height: 720
});
camera.start();

// Present a control panel through which the user can manipulate the solution
// options.
new ControlPanel(controlsElement, {
      selfieMode: true,
      handsDetectionOn: false
    })
    .add([
      new StaticText({title: '设置'}),
      fpsControl,
      new Toggle({title: '镜像', field: 'selfieMode'}),
      new Toggle({title: '手部识别', field: 'handsDetectionOn'})
    ])
    .on(options => {
      handsDetectionOn = options.handsDetectionOn;
      videoElement.classList.toggle('selfie', options.selfieMode);
    });