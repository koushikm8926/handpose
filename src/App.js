//1.install dependencies Done
//2.inport dependencies Done
//3.setup webcam canvas Done
//4.define references to those  Done
//5. load handpose Done
//6.Detect Function
//7.Drawing utilities from tensorflow
//8.Draw functions

//import logo from './logo.svg';

import React, { useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

import Webcam from "react-webcam";
import "./App.css";

import { drawHand } from "./utilities";
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded");

    //loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  runHandpose();

  const detect = async (net) => {
    //check if the data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //get the video properties
      const video  = webcamRef.current.video;
      const videoWidth =webcamRef.current.video.videoWidth;
      const videoHeight=  webcamRef.current.video.videoHeight;

      //set video height and width
      webcamRef.current.video.width=videoWidth;
      webcamRef.current.video.height=videoHeight;

      //Set Canvas height and width
      canvasRef.current.width= videoWidth;
      canvasRef.current.height=videoHeight;

      //make detections
      const hand = await net.estimateHands(video);
      console.log(hand)

      //draw mesh
      const ctx= canvasRef.current.getContext("2d")
      drawHand(hand,ctx);
    }
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        position: "relative", // For absolute positioning of child elements
      }}
    >
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          right: 0,
          left: 0,
          textAlign: "center",
          width: 640,
          height: 480,
          zIndex: 9,
          transform: "scaleX(-1)",
          borderRadius: "20px",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          right: 0,
          left: 0,
          textAlign: "center",
          width: 640,
          height: 480,
          zIndex: 10,
        }}
      />
    </div>
  );
}

export default App;
