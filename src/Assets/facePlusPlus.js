// face++ 情绪识别API返回情绪字段到中文的映射字典
let emotion_E2C_map={anger:"愤怒",disgust:"厌恶",fear:"恐惧",happiness:"高兴",neutral:"平静",sadness:"伤心",surprise:"惊讶"}

let facePlusPlusAPIKey={key:"ZmxfZ41YiSfPb0hAkNpsOfIinZi8wyrq",secret:"F91UFsIs7-VxTzvUo1ZW3TfoNOhyYlWE"};

async function facePlusPlusEmotionDetect(imgBASE64){
    let API_URL='https://api-cn.faceplusplus.com/facepp/v3/detect';

    // TODO: add exception catch
    let response = await axios.post(API_URL, {
        api_key: facePlusPlusAPIKey.key,
        api_secret: facePlusPlusAPIKey.secret,
        image_base64: imgBASE64,
        return_attributes: 'emotion'
      })

    return response;
}