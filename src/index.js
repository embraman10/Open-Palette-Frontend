let colorHexes = [];
let fontFamilies = [];


function main() {
  fetchColors();
  fetchFontColors();
  // fetchFonts();

}

function fetchColors() {
  fetch("http://localhost:3000/background_color_changers")
    .then((resp) => resp.json())
    .then((colors) => {
      colors.forEach((color) => {
        colorHexes.push(color.colorHex);
      });
      //console.log(colorHexes);
      const btn = document.getElementById("color-btn");
      const color = document.querySelector(".color");

      const div = document.getElementById("cb")

      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        // console.log(randomNumber);
        console.log(cb)
        div.style.backgroundColor = colorHexes[randomNumber];
        color.textContent = colorHexes[randomNumber];
      });

      function getRandomNumber() {
        return Math.floor(Math.random() * colorHexes.length);
      }
    });
}



function fetchFontColors() {
  fetch("http://localhost:3000/background_color_changers")
    .then((resp) => resp.json())
    .then((colors) => {
      colors.forEach((color) => {
        colorHexes.push(color.colorHex);
      });
      //console.log(colorHexes);
      const btn = document.getElementById("font-color-btn");
      const color = document.querySelector(".color");
      const h2 = document.getElementById("tester")

      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        // console.log(randomNumber);
        console.log(cb)
        h2.style.color = colorHexes[randomNumber];
        color.textContent = colorHexes[randomNumber];
      });


      function getRandomNumber() {
        return Math.floor(Math.random() * colorHexes.length);
      }
    });
}

function fetchFonts() {
  fetch("http://localhost:3000/font_changers")
    .then((resp) => resp.json())
    .then((fonts) => {
      fonts.forEach((font) => {
        fontFamilies.push(font.fontFamily);
      });
      //console.log(fontFamilies);
      const btn = document.getElementById("font-btn");
      const font = document.querySelector(".font");
      
      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        // console.log(randomNumber);

        document.getElementById("fontFamily").style.fontFamily = fontFamilies[randomNumber];
        //font.textContent = fontFamilies[randomNumber];
      });

      function getRandomNumber() {
        return Math.floor(Math.random() * fontFamilies.length);
      }
    });
}
main();

