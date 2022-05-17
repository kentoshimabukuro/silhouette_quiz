const url =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/820.png";

function setImage() {
  const img = new Image();
  img.onload = () => {
    const canvas = document.getElementById("sample");
    const context = canvas.getContext("2d");
    canvas.setAttribute("width", img.width);
    canvas.setAttribute("height", img.height);
    context.drawImage(img, 0, 0);

    // overlayImage();
  };

  img.src = url;
}

function overlayImage() {
  const canvas = document.getElementById("sample");
  const context = canvas.getContext("2d");

  const overlay = context.createImageData(canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      let r = x;
      let g = y;
      let b = 0;

      if (overlay.data[(x + y * canvas.width) * 4 + 3] > 0) {
        overlay.data[(x + y * canvas.width) * 4] = 0; // Red
        overlay.data[(x + y * canvas.width) * 4 + 1] = 0; //Green
        overlay.data[(x + y * canvas.width) * 4 + 2] = 0; // Blue
        // overlay.data[(x + y * canvas.width) * 4 + 3] = 255;
      }
    }
  }

  context.putImageData(overlay, 0, 0);
}

setImage();
