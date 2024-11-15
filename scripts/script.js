// Advanced Qr Generator

// Generating Url Qr code function
const generateUrlQrCode = () => {
  // Url Qr Code
  const urlInput = document.getElementById("urlInput");
  const urlQrImage = document.getElementById("UrlQrImage");
  const urlQrDownload = document.getElementById("UrlQrDownload");

  const generateUrlQr = () => {
    const urlValue = urlInput.value.trim();
    if (urlValue) {
      if (urlValue.length <= 1) urlQrDownload.disabled = true;

      const urlQrDownload = document.getElementById("UrlQrDownload");

      urlQrDownload.classList.remove("hidden");
      urlQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        urlValue
      )}`;
    } else {
      urlQrImage.src = "";
      urlQrDownload.disabled = true;
    }
  };
  urlInput.addEventListener("input", generateUrlQr);

  // QR Code Download Functionality
  urlQrDownload.addEventListener("click", async () => {
    if (urlQrImage.src) {
      try {
        // Fetch the QR code image
        const response = await fetch(urlQrImage.src);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        // Create a temporary link to download the QR code
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "qr-code.png";
        document.body.appendChild(link);
        link.click();

        // Clean up
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Failed to download QR code:", error);
      }
    }
  });
};

// Generating Text Qr code
const generateTextQrCode = () => {
  const form = document.querySelector("#textForm");
  const textInput = document.querySelector("#textInput");
  const imageField = document.querySelector("#textQr");
  const textQrDownload = document.querySelector("#textQrDownload");

  // Handle the form submission event
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  });

  // Input event listener to generate QR code
  textInput.addEventListener("input", () => {
    const textValue = textInput.value.trim();

    if (textValue.length > 10) {
      // Display the QR code and enable the download button
      textQrDownload.classList.remove("hidden");
      imageField.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        textValue
      )}`;
      textQrDownload.disabled = false; // Enable the download button
    } else {
      // Hide QR image and disable the download button if text length is too short
      imageField.src = "";
      textQrDownload.classList.add("hidden");
      textQrDownload.disabled = true; // Disable the download button
    }
  });
  textQrDownload.addEventListener("click", async () => {
    try {
      // Fetch the QR code image
      const response = await fetch(imageField.src);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary link to download the QR code
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      throw Error(error.message);
    }
  });
};

// Generating Wifi Qr Code
const generateWifiQrCode = () => {
  const form = document.querySelector("#wifiForm");
  const downloadButton = document.querySelector("#wifiQrDownload");
  const password = document.querySelector("#wifiPass");
  const wifiId = document.querySelector("#wifiName");
  const qrImage = document.querySelector("#wifiQrImage");

  form.addEventListener("submit", (e) => e.preventDefault());
  // Event listener for changes in the form
  form.addEventListener("input", () => {
    const wifiName = wifiId.value.trim();
    const wifiPassword = password.value.trim();

    // Validate that both fields are filled
    if (wifiName && wifiPassword) {
      const wifiData = `WIFI:T:WPA;S:${wifiName};P:${wifiPassword};;`;

      // Set the QR code image
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        wifiData
      )}`;

      // Show the download button
      downloadButton.classList.remove("hidden");
      downloadButton.disabled = false; // Enable the download button
    } else {
      qrImage.src = "";
      downloadButton.classList.add("hidden");
      downloadButton.disabled = true; // Disable the download button
    }
  });

  // Qr Download
  downloadButton.addEventListener("click", async () => {
    try {
      const response = await fetch(qrImage.src);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      // Create a temporary link to download the QR code
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      throw Error(error.message);
    }
  });
};

const main = () => {
  const buttons = document.querySelectorAll("section div .button");
  const qrDivs = document.querySelectorAll(".QrGeneration");
  qrDivs.forEach((div) => div.classList.add("hidden"));

  if (buttons.length > 0) {
    buttons[0].classList.add("bg-blue-600");
    qrDivs[0].classList.remove("hidden");
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("bg-blue-600"));

      const targetId = button.getAttribute("data-target");

      // Hiding all the divs
      qrDivs.forEach((div) => div.classList.add("hidden"));

      // Add the active class to the clicked button
      button.classList.add("bg-blue-600");
      document.getElementById(targetId).classList.remove("hidden");
    });
  });
};

// Generating Email Qr Code
const generateEmailQrCode = () => {
  const form = document.querySelector("#emailForm");
  const emailId = document.querySelector("#emailId");
  const emailSub = document.querySelector("#emailSub");
  const emailTitle = document.querySelector("#emailTitle");
  const qrImage = document.querySelector("#emailQrImage");
  const qrDownload = document.querySelector("#emailQrDownload");

  // Prevent form submission
  form.addEventListener("submit", (e) => e.preventDefault());

  // Event listener for changes in the form
  form.addEventListener("input", () => {
    const email = emailId.value.trim();
    const subject = emailSub.value.trim();
    const body = emailTitle.value.trim();

    if (email && subject) {
      // Format the mailto link
      const emailData = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Set the QR code image for the email
      qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        emailData
      )}`;

      // Show the download button
      qrDownload.classList.remove("hidden");
      qrDownload.disabled = false; // Enable the download button
    } else {
      qrImage.src = "";
      qrDownload.classList.add("hidden");
      qrDownload.disabled = true; // Disable the download button
    }
  });

  qrDownload.addEventListener("click", async () => {
    try {
      const res = await fetch(qrImage.src);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      // creating a url
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } catch (error) {
      throw Error(error.message);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  main();
  generateUrlQrCode();
  generateWifiQrCode();
  generateTextQrCode();
  generateEmailQrCode();
});
