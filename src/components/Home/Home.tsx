"use client";
import React, { useEffect } from "react";
declare var window: any;
const Quagga = require("quagga").default; // Common JS (important: default)

const IndexPage = () => {
  useEffect(() => {
    const initScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        const video: any = document.getElementById("barcode-scanner");
        video.srcObject = stream;
        video.play();

        Quagga.init(
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
          (err: any) => {
            if (err) {
              alert(err);
              return;
            }
            Quagga.onDetected(handleBarcodeDetected);
            Quagga.start();
          }
        );
      } catch (error) {
        alert(error);
      }
    };

    const handleBarcodeDetected = (result: any) => {
      const code = result.codeResult.code;
      alert("Barcode detected: " + code);
      // Aquí puedes realizar acciones con el código de barras, como mostrarlo en la interfaz de usuario.
      // Por ejemplo, podrías usar el estado de React para almacenar y mostrar el código de barras:
      // setBarcode(code);
    };

    initScanner();

    // Cleanup function
    return () => {
      window.Quagga.stop();
    };
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <video id="barcode-scanner" width="100%" height="100%" playsInline />
      {/* Puedes mostrar los datos del código de barras en la interfaz de usuario si es necesario. */}
      {/* <p>Último código de barras escaneado: {barcode}</p> */}
    </div>
  );
};

export default IndexPage;
