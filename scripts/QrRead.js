document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("qrVideo");
  const scanButton = document.getElementById("scanButton");
  const qrResult = document.getElementById("qrResult");

  let scanning = false;
  let videoStream;

  // Function to start the camera and scan for QR codes
  const startScanner = async () => {
    try {
      // Access the user's camera
      videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      video.srcObject = videoStream;

      // Wait until the video metadata is loaded
      video.onloadedmetadata = () => {
        scanning = true;
        scanQRCode(); // Start scanning
      };
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Function to scan for QR codes
  const scanQRCode = () => {
    if (!scanning) return;

    // Only proceed if the video has a valid width and height
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      requestAnimationFrame(scanQRCode);
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Decode the QR code using jsQR
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

    if (qrCode) {
      qrResult.textContent = `QR Code: ${qrCode.data}`;
      qrResult.classList.add("text-green-400");

      // Stop scanning and close the video stream
      stopScanner();
    } else {
      requestAnimationFrame(scanQRCode); // Keep scanning
    }
  };

  // Function to stop the scanner
  const stopScanner = () => {
    scanning = false;
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
    }
  };

  // Event listener for the scan button
  scanButton.addEventListener("click", () => {
    qrResult.textContent = ""; // Clear previous result
    startScanner();
  });

  // Event listener for the scan button
  scanButton.addEventListener("click", () => {
    qrResult.textContent = ""; // Clear previous result
    startScanner();
  });
});
