'use client'
import Quagga from "quagga";
import { useEffect } from "react";

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

        Quagga.init({
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: video,
            ...deviceId,
          },
          decoder: {
            readers: ['ean_reader'],
          },
        }, (err: any) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.onDetected(handleBarcodeDetected);
          Quagga.start();
        });
      } catch (error) {
        console.error(error);
      }
    };

    const handleBarcodeDetected = (result: any) => {
      const code = result.codeResult.code;
      alert('Barcode detected: + code' );
      // Aquí puedes realizar acciones con el código de barras, como mostrarlo en la interfaz de usuario.
      // Por ejemplo, podrías usar el estado de React para almacenar y mostrar el código de barras:
      // setBarcode(code);
    };

    initScanner();

    // Cleanup function
    return () => {
      Quagga.stop();
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
