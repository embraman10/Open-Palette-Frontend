let colorHexes = [];
let fontFamilies = ["Arial", "Times New Roman", "Verdana", "Helvetica", "Georgia", "Garamond", "Courier", "Impact", "Perpetua", "Cursive"];


function main() {
  fetchColors();
  fetchFontColors();
  fetchFonts();

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
        const paletteForm = document.getElementById('palette-form')
        // console.log(randomNumber);
        //console.log(cb)
        div.style.backgroundColor = colorHexes[randomNumber];
        color.textContent = colorHexes[randomNumber];
        paletteForm.bgColor.value = colorHexes[randomNumber];
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
      const fontColor = document.querySelector(".font-color");
      const h2 = document.getElementById("tester")

      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        // console.log(randomNumber);
        console.log(cb)
        const paletteForm = document.getElementById('palette-form')
        h2.style.color = colorHexes[randomNumber];
        fontColor.textContent = colorHexes[randomNumber];
        paletteForm.fontColor.value = colorHexes[randomNumber];
      });


      function getRandomNumber() {
        return Math.floor(Math.random() * colorHexes.length);
      }
    });
}

function fetchFonts() {
  // fetch("http://localhost:3000/font_changers")
  //   .then((resp) => resp.json())
  //   .then((fonts) => {
  //     fonts.forEach((font) => {
  //       fontFamilies.push(font.fontFamily);
  //     });
      //console.log(fontFamilies);
      const btn = document.getElementById("font-family-btn");
      const font = document.querySelector(".font");
      const h2 = document.getElementsByClassName("card-inner")
      
      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        // console.log(randomNumber);
        const paletteForm = document.getElementById('palette-form')

        h2[0].style.fontFamily = fontFamilies[randomNumber];
        paletteForm.font.value = fontFamilies[randomNumber];
        //console.log(h2[0])
        //font.textContent = fontFamilies[randomNumber];
      });

      function getRandomNumber() {
        return Math.floor(Math.random() * fontFamilies.length);
      }
    // });
}
main();

