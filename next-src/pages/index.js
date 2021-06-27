import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Emojion</title>
        <link rel="icon" href="/Assets/img/favicon.ico" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="emotion detection" />

        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.css" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.1/camera_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.1/control_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.2/drawing_utils.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/hands.js" crossorigin="anonymous"></script>
        
        <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/color-js/1.0.1/color.min.js" integrity="sha512-ODHUqBj0yOk4rj5ORt7EExbT4Jq+yQ5EbeQH2Ri3eMkCBIR9wgUOWXO5CYr37yl2pV1+YdXIPbAYgEKHyM/k8A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      </Head>
      <h1>hello</h1>
    </div>
  )
}
