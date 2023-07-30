"use strict";

let eyesClosedThreshold = 0.45; // For 65% open eyes.
let timeThreshold = 0.1; // For 0.5 seconds.

let lastClosedTime,
  continuous = false,
  blink = false,
  messageSent = false; // <-- Added: To track if a message has been sent for the current blink

let alarm = document.getElementById("alarm");
let body = document.querySelector("body");

const makroIframe = document.getElementById("makroIframe");
let iframeUrl = "https://makro-run-threejs.web.app/game_build/index.html";

//entry point :
function main() {
  JEEFACETRANSFERAPI.init({
    canvasId: "canvas",
    NNCpath: "src/model/",
    callbackReady: function(errCode) {
      if (errCode) {
        console.log(
          "ERROR - cannot init JEEFACETRANSFERAPI. errCode =",
          errCode
        );
        errorCallback(errCode);
        return;
      }
      console.log("INFO : JEEFACETRANSFERAPI is ready !!!");
      successCallback();
    } //end callbackReady()
  });
} //end main()

function successCallback() {
  // Call next frame
  document.getElementById("full-page-loader").style.display = "none";
  nextFrame();
  // Add code after API is ready.
  notifyCameraReady();
}

function errorCallback(errorCode) {
  // Add code to handle the error
  alert("Cannot work without camera. Check if the camera is attached.");
}

function nextFrame() {
  let deltaTime = Date.now() - lastClosedTime;
  if (deltaTime > timeThreshold && continuous) {
    start_alarm();
    if (!messageSent) { // Only send message if not already sent for current blink
      console.log("Blink detected");
      let messageData = { value1: "blinkMessage", value2: true, value3: blink ? 1 : 0 };
      let jsonString = JSON.stringify(messageData);
      makroIframe.contentWindow.postMessage(jsonString, iframeUrl);
      messageSent = true; // Remember that a message has been sent
    }
    body.style.background = "#f00";
  } else {
    stop_alarm();
    body.style.background = "#fff";
  }

  if (JEEFACETRANSFERAPI.is_detected()) {
    let expressions = JEEFACETRANSFERAPI.get_morphTargetInfluences();

    if (
      expressions[8] >= eyesClosedThreshold && // For left and right eye
      expressions[9] >= eyesClosedThreshold
    ) {
      if (!continuous) lastClosedTime = Date.now();
      continuous = true;
      
    } else {
      continuous = false;
      blink = false;
      messageSent = false; // Reset message sent tracker when eyes are opened
    }

    // The API is detected
    // console.log("Detected");
  } else {
    // Tell the user that detection is off.
    continuous = false;
    // console.log("Not Detected");
  }
  // Replay frame
  requestAnimationFrame(nextFrame);
}

// Function to notify that the camera is ready
const notifyCameraReady = () => {
  let messageData = { status: 'cameraReady' };  
  let jsonString = JSON.stringify(messageData);
  makroIframe.contentWindow.postMessage(jsonString, iframeUrl);
};
