"use client";
import React, { useEffect } from "react";

import Quagga from "quagga";

declare var window: any;

const IndexPage = () => {
  useEffect(() => {
    const initScanner = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');

        // Selecciona la cámara trasera si está disponible
        const rearCamera = videoDevices.find((device) => device.label.includes('back'));
        const deviceId = rearCamera ? { deviceId: { exact: rearCamera.deviceId } } : {};

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { ...deviceId, facingMode: 'environment' },
        });

        const video: any = document.getElementById('barcode-scanner');
        video.srcObject = stream;
        video.play();

        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: video,
              ...deviceId,
            },
            decoder: {
              readers: ["code_128_reader"],
            },
          },
          function (err: any) {
            if (err) {
             alert(err);
              return;
            }
            alert("Initialization finished. Ready to start");
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
