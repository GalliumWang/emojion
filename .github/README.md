# Documentation

Online Demo: [https://emojion.galliumwang.com](https://emojion.galliumwang.com/)
Backend API endpoint: [https://api.gallliumwang.com/emojion](https://api.gallliumwang.com/emojion)

> origin: [https://github.com/GalliumWang/emojion](https://github.com/GalliumWang/emojion)
detached frontend repo: [https://github.com/GalliumWang/aws-amplify-emojion-frontend](https://github.com/GalliumWang/aws-amplify-emojion-frontend)
release page: [https://github.com/GalliumWang/emojion/releases](https://github.com/GalliumWang/emojion/releases)

## Description

emojion is a web app providing hands&emotion detection function, powered by mediapipe and face++, with customed emoji animation.

## Feathers

### Hands detection

![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/HandsDetection.png.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/HandsDetection.png.png)

### Emotion detection

- emotion list
    1. neutral
    2. anger
    3. happiness
    4. surprise.png
    5. disgust
    6. fear
    7. sadness
- example of type 1~4
    1. neutral

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/neutral.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/neutral.png)

    2. anger

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/anger.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/anger.png)

    3. happiness

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/_5__1.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/_5__1.png)

    4. surprise.png

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/surprise.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/surprise.png)

### Themes

- switch themes through left menu

    ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/6.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/6.png)

## Usage

- Please visit by latest chrome browser

## Project Architecture

### Backend

> *Runtime environment: nodejs 12.x
Deploy solution: aws lambda serverless function
Gateway: aws API gateway*

- Backend code
    - structure

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled.png)

    - return value format example

        ```json
        {
            "request_id":"1621925956,9cdc80a4-0b2c-4d28-83a1-a0e6ee7aa636",
            "time_used":340,
            "faces":[
                {
                    "face_token":"3f508ea88fc0e33550b595c6b65112e7",
                    "face_rectangle":{
                        "top":309,
                        "left":742,
                        "width":298,
                        "height":298
                    },
                    "attributes":{
                        "emotion":{
                            "anger":0.014,
                            "disgust":0.023,
                            "fear":0.031,
                            "happiness":98.895,
                            "neutral":0.496,
                            "sadness":0.047,
                            "surprise":0.495
                        }
                    }
                }
            ],
            "image_id":"4qywIKIDHLvfeV7UHBPzZg==",
            "face_num":1
        }
        ```

    - npm config

        ```json
        {
          "name": "emojion",
          "version": "1.0.0",
          "description": "",
          "main": "script.js",
          "dependencies": {
            "axios": "^0.21.1",
            "body-parser": "^1.19.0",
            "cookie-parser": "^1.4.5",
            "express": "^4.17.1",
            "form-data": "^4.0.0",
            "multer": "^1.4.2",
            "node-sass": "^6.0.0",
            "postcss-cli": "^8.3.1"
          },
          "devDependencies": {
            "autoprefixer": "^10.2.6",
            "postcss": "^8.3.0",
            "tailwindcss": "^2.1.2"
          },
          "scripts": {
            "build": "postcss static/src/css/style.css -o static/style.css",
            "sass": "node-sass --watch static/src/scss -o static/src/css"
            
          },
          "repository": {
            "type": "git",
            "url": "git+https://github.com/GalliumWang/emojion.git"
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
          "bugs": {
            "url": "https://github.com/GalliumWang/emojion/issues"
          },
          "homepage": "https://github.com/GalliumWang/emojion#readme"
        }
        ```

- Lambda function
    - overview

    ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%201.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%201.png)

    - code

    ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%202.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%202.png)

    - configuration

    ```yaml
    AWSTemplateFormatVersion: '2010-09-09'
    Transform: 'AWS::Serverless-2016-10-31'
    Description: >-
      emojion backend
    Resources:
      emojionbackend:
        Type: 'AWS::Serverless::Function'
        Properties:
          Handler: index.handler
          Runtime: nodejs12.x
          CodeUri: .
          Description: >-
            A simple backend (read/write to DynamoDB) with a RESTful API endpoint
            using Amazon API Gateway.
          MemorySize: 512
          Timeout: 10
          Role: >-
            arn:aws:iam::422059552343:role/service-role/emojion-backend-role-1hjslf9b
          Events:
            Api1:
              Type: Api
              Properties:
                Path: /emojion
                Method: ANY
          Tags:
            'lambda-console:blueprint': microservice-http-endpoint
    ```

    > Deploy package available on GitHub release page

- API gateway
    - endpoint: https://api.galliumwang.com/emojion
    - method: POST(other method will trigger runtime error)
    - CORS setting

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%203.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%203.png)

    - configuration

        ```json
        {
          "openapi" : "3.0.1",
          "info" : {
            "title" : "Sample API",
            "description" : "Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.",
            "version" : "0.1.9"
          },
          "servers" : [ {
            "url" : "https://api.galliumwang.com/{basePath}",
            "variables" : {
              "basePath" : {
                "default" : ""
              }
            },
            "x-amazon-apigateway-endpoint-configuration" : {
              "disableExecuteApiEndpoint" : true
            }
          } ],
          "paths" : {
            "/emojion" : {
              "x-amazon-apigateway-any-method" : {
                "responses" : {
                  "default" : {
                    "description" : "Default response for ANY /emojion"
                  }
                },
                "x-amazon-apigateway-integration" : {
                  "payloadFormatVersion" : "2.0",
                  "type" : "aws_proxy",
                  "httpMethod" : "POST",
                  "uri" : "arn:aws:apigateway:us-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-west-2:422059552343:function:emojion-backend/invocations",
                  "connectionType" : "INTERNET"
                }
              }
            }
          },
          "x-amazon-apigateway-cors" : {
            "allowMethods" : [ "*" ],
            "allowHeaders" : [ "*" ],
            "maxAge" : 0,
            "allowCredentials" : false,
            "allowOrigins" : [ "*" ]
          },
          "x-amazon-apigateway-importexport-version" : "1.0"
        }
        ```

### Frontend

> Framework: 🚫
Deploy solution: aws amplify
CDN: aws cloudfront

- Dev
    - javascript
        1. lodash(throttle)
        2. gsap(animation)
    - CSS
        1. tailwindcss
- Build
    - CSS

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%204.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%204.png)

- Deploy
    - deploy on aws amplify, connect to github repo [https://github.com/GalliumWang/aws-amplify-emojion-frontend](https://github.com/GalliumWang/aws-amplify-emojion-frontend)
    - custom domain: [emojion.galliumwang.com](http://emojion.galliumwang.com)
    - amplify config

        ![Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%205.png](Documentation%204aeb1f3d64eb4d5d98e35974293735b7/Untitled%205.png)

## Todo & Issue

### **Perf**

- severe lag when switch hands detection on/off
- reduce latency between emotion detection start and first return value

### **Todo**

- block drop animation before load event
- see todo tree
- use color js lib to dynamicaly change container border color
- camera authority alert
- update random drop direction for emoji animation

### Roadmap

- add doc for this project
- add local storage support for theme config
- refactor using vue to add support for dynamic container border color
- global layout need to be refacored
- deploy to amplify and lambda function
- add mobile support
- add backend storage support