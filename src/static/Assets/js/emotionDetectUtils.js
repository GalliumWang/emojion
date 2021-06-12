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