"use client";
import React, { useEffect } from "react";

import Quagga from "quagga";

declare var window: any;

const IndexPage = () => {
  useEffect(() => {
    const initScanner = async () => {
      try {
        Quagga.init(
          {
            inputStream: {
              name: "Live",
              type: "LiveStream",
              target: document.querySelector("#barcode-scanner"),
            },
            decoder: {
              readers: ["code_128_reader"],
            },
          },
          function (err: any) {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
          }
        );
      } catch (error) {
        alert(error);
      }
    };

    initScanner();

    // Cleanup function
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <video id="barcode-scanner" width="100%" height="100%" playsInline />
      
    </div>
  );
};

export default IndexPage;
