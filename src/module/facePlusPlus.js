const { default: axios } = require("axios");
const FormData = require('form-data');

let facePlusPlusAPIKey={key:"ZmxfZ41YiSfPb0hAkNpsOfIinZi8wyrq",secret:"F91UFsIs7-VxTzvUo1ZW3TfoNOhyYlWE"};

async function facePlusPlusEmotionDetect(imgBASE64){
    let API_URL='https://api-cn.faceplusplus.com/facepp/v3/detect';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    try {
      let requestParameters = new FormData();
      requestParameters.append('api_key', facePlusPlusAPIKey.key);
      requestParameters.append('api_secret', facePlusPlusAPIKey.secret);
      requestParameters.append('image_base64', imgBASE64);
      requestParameters.append('return_attributes', 'emotion');

      let response = await axios({
        method: "post",
        url: API_URL,
        data: requestParameters.getBuffer(),
        headers: requestParameters.getHeaders(),
      })

      // format: see facePlusPlusExampleData.json
      let result=response.data;
      return result;
    } catch (error) {
      return error;
    }

}

exports.facePlusPlusEmotionDetect = facePlusPlusEmotionDetect;