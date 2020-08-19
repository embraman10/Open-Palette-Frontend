let colorHexes = [];
let fontFamilies = [
  "Arial",
  "Times New Roman",
  "Verdana",
  "Helvetica",
  "Georgia",
  "Garamond",
  "Courier",
  "Impact",
  "Perpetua",
  "Cursive",
];
document.addEventListener("click", handleSave);



function main() {
  fetchColors();
  fetchFontColors();
  fetchFonts();
  fetchPalettes();
  // clearPalette();
}




///////// ***** Change Background Color ***** /////////
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

      const div = document.getElementById("cb");

      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        const paletteForm = document.getElementById("palette-form");
        // console.log(randomNumber);
        //console.log(cb)
        div.style.backgroundColor = colorHexes[randomNumber];
        // color.textContent = colorHexes[randomNumber];
        paletteForm.bgColor.value = colorHexes[randomNumber];
      });

      function getRandomNumber() {
        return Math.floor(Math.random() * colorHexes.length);
      }
    });
}



///////// ***** Change Font Color ***** /////////
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
      const h2 = document.getElementById("tester");

      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        // console.log(randomNumber);
        console.log(cb);
        const paletteForm = document.getElementById("palette-form");
        h2.style.color = colorHexes[randomNumber];
        // fontColor.textContent = colorHexes[randomNumber];
        paletteForm.fontColor.value = colorHexes[randomNumber];
      });

      function getRandomNumber() {
        return Math.floor(Math.random() * colorHexes.length);
      }
    });
}



///////// ***** Change Font Family ***** /////////
function fetchFonts() {

  const btn = document.getElementById("font-family-btn");
  const font = document.querySelector(".font");
  const h2 = document.getElementsByClassName("card-inner");

  btn.addEventListener("click", function () {
    const randomNumber = getRandomNumber();
    console.log(cb);
    // console.log(randomNumber);
    const paletteForm = document.getElementById("palette-form");
    

    h2[0].style.fontFamily = fontFamilies[randomNumber];
    paletteForm.font.value = fontFamilies[randomNumber];
    //console.log(h2[0])

    //font.textContent = fontFamilies[randomNumber];
  });

  function getRandomNumber() {
    return Math.floor(Math.random() * fontFamilies.length);
  }
  
}



/////// ***** Clear Demo Palette ***** /////////
function clearPalette(){
  const cardForm = document.getElementById("palette-form");
  const cardBody = document.getElementById("cb");
  const btn = document.getElementById("color-btn")

  const test = fetchColors()
  const clearBtn = document.getElementById("clr-btn");
  clearBtn.addEventListener("click", function(){
    cardForm.reset()
    cardBody.removeEventListener("click", fetchColors, false)
  });
  // cardBody.removeEventListener("")
}



///////// ***** Show Palettes ***** /////////
function fetchPalettes() {
  fetch("http://localhost:4000/Palettes")
    .then((resp) => resp.json())
    .then((palletes) => {
      palletes.forEach(renderPalletes);
    });
}


function renderPalletes(pallete) {
  const showPanel = document.getElementById("show-body");
  showPanel.innerHTML += `     <div class="saved-card-body" data-id="${pallete.id}" style="background-color: ${pallete.background_color}">
                            <h2 data-id="${pallete.id}" style="font-family: ${pallete.font_family}; color: ${pallete.font_color}">Tester Here</h2>
                            <div>
                            <h2> background color : <span class="color">${pallete.background_color}</span></h2>
                            </div>
                            <div>
                            <h2> font color : <span class="font-color">${pallete.font_color}</span></h2>
                            </div>
                            <div>
                            <h2> font : <span class="font-family">${pallete.font_family}</span></h2>
                            </div>
                            <button type="button" data-id="${pallete.id}" id="edit-btn" class="btn btn-outline-warning">Edit this Card</button><br><br>
                            <button type="button" data-id="${pallete.id}" id="save-btn" class="btn btn-outline-success">Save My Card</button><br><br>
                            <button type="button" data-id="${pallete.id}" id="delete-btn" class="btn btn-outline-danger">Delete</button>
                            </div>`;
  const footer = document.getElementById("temp-id")
  footer.addEventListener('click', handleCrud)
}


function handleCrud(e){
  e.preventDefault();
  //console.log(e.target.dataset.id)
  if (e.target.id === "edit-btn"){
    editPalette(e)
  } else if (e.target.id === "save-btn"){
    console.log('I am this cards specific save button')
  } else if (e.target.id === "delete-btn"){
    deletePalette(e)
  }



function deletePalette(e){
  const paletteId = e.target.dataset.id
  fetch(`http://localhost:4000/Palettes/${paletteId}`, { method: 'DELETE' })
  .then(resp => resp.json())
  .then(data => {
    if (data.error) {
      alert('Something is amiss!')
    } else {
      e.target.parentNode.remove()
    }
})
}
}


// function editPalette(e){
//   const paletteId = document.querySelector("pallete.id")
//   let updatePalette = {
//     background_color: paletteId.bgColor.value,
//     font_color: paletteId.fontColor.value,
//     font_family: paletteId.font.value
//   }
//   //console.log(updatePalette)
//   fetch("http://localhost:4000/Palettes", {
//     method: 'PATCH',
//     headers: {"content-type": 'application/json',
//             accepts: 'application/json'
//   },
//   body: JSON.stringify(updatePalette)

//   })
//   .then(res => res.json())
//   .then(pallete => {
//     renderPalletes(pallete)
//   })
// }



function handleSave(e){
  e.preventDefault();
  if (e.target.id === "save-btn"){
    //console.log('I am the save button')
    submitPalette(e)
  }
}

function submitPalette(e){
  const paletteForm = document.getElementById("palette-form");
  let newPallete = {
    background_color: paletteForm.bgColor.value,
    font_color: paletteForm.fontColor.value,
    font_family: paletteForm.font.value
  }
  //console.log(newPallete)
  fetch("http://localhost:4000/Palettes", {
    method: 'POST',
    headers: {"content-type": 'application/json',
            accepts: 'application/json'
  },
  body: JSON.stringify(newPallete)

  })
  .then(res => res.json())
  .then(pallete => {
    renderPalletes(pallete)
  })
}




///////// ***** Initializer ***** /////////
main();
