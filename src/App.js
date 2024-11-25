//1.install dependencies Done
//2.inport dependencies Done
//3.setup webcam canvas
//4.define references to those 
//5. load handpose
//6.Detect Function
//7.Drawing utilities from tensorflow
//Draw functions 



//import logo from './logo.svg';
import React,{useRef} from 'react';
import *  as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

import Webcam from 'react-webcam';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <div className="App">
      <Webcam
      ref={webcamRef}
      style={{
        position:'absolute',
        marginLeft:'auto',
        marginRight:'auto',
        right:0,
        left:0,
        textAlign:'center',
        width:640,
        height:480,
        zIndex:9,
        transform: 'scaleX(-1)' 
      }}
      />
      <canvas
      ref={canvasRef}
      style={{
        position:'absolute',
        marginLeft:'auto',
        marginRight:'auto',
        right:0,
        left:0,
        textAlign:'center',
        width:640,
        height:480,
        zIndex:9,
      }}
      />

    </div>
  );
}

export default App;
