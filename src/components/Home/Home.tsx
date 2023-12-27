"use client";
import React, { useEffect } from "react";
 
function App() {
  useEffect(() => {
    const initScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video = document.getElementById("barcode-scanner");
        video.srcObject = stream;
        video.play();

        window.Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: video,
            },
            decoder: {
              readers: ["ean_reader"],
            },
          },
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
            window.Quagga.start();
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    initScanner();

    // Cleanup function
    return () => {
      window.Quagga?.stop();
    };
  }, []);

  return (
    <div className="App">
      <h1>Barcode Scanner</h1>
      <video id="barcode-scanner" width="100%" height="100%" />
    </div>
  );
}

export default App;
