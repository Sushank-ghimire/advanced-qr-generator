# QR Master - QR Code Generator & Reader

## 📌 Overview
**QR Master** is a comprehensive web application for generating and reading QR codes. It allows users to:
- Generate QR codes for various data types (URLs, Wi-Fi credentials, email, and custom text).
- Scan and decode QR codes using the device's camera.

This project leverages modern web technologies like HTML, JavaScript, and TailwindCSS. For QR code generation, it uses the [QR Server API](https://goqr.me/api/) and the [jsQR library](https://github.com/cozmo/jsQR) for QR code reading.

## 📁 Project Structure
```
project-folder/
├── index.html                # Main page for QR code generation
├── pages/
│   ├── ReadQr.html            # Page for QR code reading
├── scripts/
│   ├── script.js         # Script for generating QR codes
│   └── QrRead.js             # Script for reading QR codes
├── styles/
│   └── styles.css            # Custom styles (using TailwindCSS)
├── README.md                 # Documentation
```

## 🚀 Features
### QR Code Generator
- Generate QR codes for:
  - URLs
  - Email (with subject and body)
  - Wi-Fi credentials (SSID & password)
  - Custom text
- Download generated QR codes as images.

### QR Code Reader
- Scan QR codes using your device's camera.
- Automatically decode and display the content.

## 📦 Technologies Used
- **HTML**: Structure and layout of the web pages.
- **JavaScript**: Logic for QR code generation and reading.
- **TailwindCSS**: Styling the UI components.
- **jsQR Library**: For reading QR codes using the camera.
- **QR Server API**: For generating QR codes.

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed:
- A modern web browser (Chrome, Firefox, etc.)
- Node.js (for local development with a live server)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sushank-ghimire/advanced-qr-generator.git
   cd qr-master
   ```
2. Open `index.html` and `QrRead.html` directly in your browser.

### Usage
- **QR Code Generator**:
  - Open `index.html`.
  - Choose the type of QR code you want to generate.
  - Fill in the required fields and click "Generate".
  - Download the QR code image by clicking the "Download" button.

- **QR Code Reader**:
  - Open `QrRead.html`.
  - Click the "Start Scanning" button to start the camera.
  - Point your device's camera at the QR code.
  - The decoded content will be displayed on the screen.

## 🖥️ Code Walkthrough

### QR Code Generation (`QrRead.js`)
- **generateUrlQr()**: Generates a QR code for URLs.
- **generateTextQrCode()**: Generates a QR code for custom text.
- **generateEmailQrCode()**: Generates a QR code for email addresses with subject and body.
- **generateWifiQrCode()**: Generates a QR code for Wi-Fi credentials.
- **Download Functionality**: Allows users to download the generated QR code as a PNG image.

### QR Code Reading (`QrRead.js`)
- Uses the `getUserMedia()` API to access the device's camera.
- The `jsQR` library is used to scan and decode QR codes.
- Toggle functionality allows users to start/stop the camera.

### Example Code Snippet for QR Code Generation
```js
const generateUrlQr = () => {
  const urlValue = urlInput.value.trim();
  if (urlValue) {
    urlQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(urlValue)}`;
    urlQrDownload.classList.remove("hidden");
  } else {
    urlQrImage.src = "";
    urlQrDownload.classList.add("hidden");
  }
};
```

### Example Code Snippet for QR Code Reading
```js
const scanQRCode = () => {
  if (!scanning) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

  if (qrCode) {
    qrResult.textContent = `QR Code: ${qrCode.data}`;
    stopScanner();
  } else {
    requestAnimationFrame(scanQRCode);
  }
};
```

## 🔧 Troubleshooting
- Ensure your browser has permission to access the camera.
- The QR code reader only works on secure contexts (HTTPS or `localhost`).
- If the QR code is not detected, try adjusting the lighting or camera angle.

## 📋 License
This project is open-source and available under the MIT License.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/your-username/qr-master/issues) if you want to contribute.

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## 📞 Contact
- Author: Sushank Ghimire
- Email: ghimiresushank08@gmail.com
- GitHub: [Sushank-ghimire](https://github.com/Sushank-ghimire)
