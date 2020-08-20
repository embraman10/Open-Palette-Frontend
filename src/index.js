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
  // popUp();
  fetchColors();
  fetchFontColors();
  fetchFonts();
  fetchPalettes();
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
      const clearBtn = document.getElementById("clr-btn")

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
      clearBtn.addEventListener("click", function(){
        const paletteForm = document.getElementById("palette-form");
        div.style.backgroundColor = ""
        paletteForm.reset()
      })
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
      const clearBtn = document.getElementById("clr-btn")

      btn.addEventListener("click", function () {
        const randomNumber = getRandomNumber();
        // console.log(randomNumber);
        //console.log(cb);
        const paletteForm = document.getElementById("palette-form");
        h2.style.color = colorHexes[randomNumber];
        // fontColor.textContent = colorHexes[randomNumber];
        paletteForm.fontColor.value = colorHexes[randomNumber];
      });

      function getRandomNumber() {
        return Math.floor(Math.random() * colorHexes.length);
      }

      clearBtn.addEventListener("click", function(){
        h2.style.color = ""
      })
    });
}

///////// ***** Change Font Family ***** /////////
function fetchFonts() {
  const btn = document.getElementById("font-family-btn");
  const font = document.querySelector(".font");
  const h2 = document.getElementsByClassName("card-inner");
  const clearBtn = document.getElementById("clr-btn")

  btn.addEventListener("click", function () {
    const randomNumber = getRandomNumber();
    //console.log(cb);
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
  clearBtn.addEventListener("click", function(){
    h2[0].style.fontFamily = ""
  })
}


///////// ***** Saving Palette ***** /////////

function fetchPalettes() {
  fetch("http://localhost:3000/user_palettes")
    .then(resp => resp.json())
    .then((palettes) => {
      palettes.forEach(renderPalettes);
    });
}

function renderPalettes(palette) {
  const showPanel = document.getElementById("show-body");
  //console.log(palette)
  showPanel.innerHTML += `  
  <div class="index-container">
  <div class="card-deck mb-3 text-center">
  <div class="card mb-4 shadow-sm">
  <div class="card-body" data-id="${palette.id}" style="background-color: ${palette.background_color}">
                            <h2 data-id="${palette.id}" style="font-family: ${palette.font_family}; color: ${palette.font_color}">${palette.user.name}</h2>
                            <div>
                            <h2> background color : <span id="${palette.id}" class="color">${palette.background_color}</span></h2>
                            </div>
                            <div>
                            <h2> font color : <span class="font-color">${palette.font_color}</span></h2>
                            </div>
                            <div>
                            <h2> font : <span class="font-family">${palette.font_family}</span></h2>
                            </div>
                            <br>
                            <button type="button" data-id="${palette.id}" id="edit-btn" class="btn btn-warning">Edit this Card</button><br><br>
                            <button type="button" data-id="${palette.id}" id="delete-btn" class="btn btn-danger">Delete</button>
                            </div></div></div></div>`;
  const footer = document.getElementById("show-body");
  footer.addEventListener("click", handleCrud);
}

function handleCrud(e) {
  e.preventDefault();
  //console.log(e.target.dataset.id)
  if (e.target.id === "edit-btn") {
    //console.log("I am this cards specific edit button");
    editPalette(e)
  }
  else if (e.target.id === "delete-btn") {
    //console.log("I am this cards specific delete button");
    deletePalette(e);
  }

  // function savePalette(e){

  // }


function editPalette(e){
  //console.log(e.target.parentNode) 
  const paletteForm = document.getElementById("palette-form");
  const paletteId = e.target.dataset.id;
  const h2 = document.getElementsByClassName("card-inner");
  const div = document.getElementById("cb");
  const h2Font = document.getElementById("tester");

  //console.log(id)
  fetch(`http://localhost:3000/user_palettes/${paletteId}`)
  .then(res => res.json())
  .then(palette => {
    //console.log(palette)
    paletteForm.font.value = palette.font_family,
    paletteForm.fontColor.value = palette.font_color,
    paletteForm.bgColor.value = palette.background_color,

    h2[0].style.fontFamily = palette.font_family,
    div.style.backgroundColor = palette.background_color,
    h2Font.style.color = palette.font_color

    // //paletteForm.dataset.id = dog.id
  })
}

  function deletePalette(e) {
    const paletteId = e.target.dataset.id;
    console.log(e.target.dataset.id)
    fetch(`http://localhost:3000/user_palettes/${paletteId}`, { method: "DELETE" })
      .then(resp => console.log(resp))
      .then(data => {
          e.target.parentNode.remove();
      });
  }
}

function handleSave(e) {
  e.preventDefault();
  if (e.target.id === "save-btn") {
    //console.log('I am the save button')
    submitPalette(e);
  }
}



function submitPalette(e) {
  const paletteForm = document.getElementById("palette-form");
  let newPalette = {
    background_color: paletteForm.bgColor.value,
    font_color: paletteForm.fontColor.value,
    font_family: paletteForm.font.value,
    user_id: 24
  };
  //console.log(newPalette)
  fetch("http://localhost:3000/user_palettes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPalette),
  })
    .then(res => res.json())
    .then((palette) => {
      renderPalettes(palette);
    });

}



// function popUp(){
//   const modal = document.querySelector('#my-modal');
//   document.addEventListener("DOMContentLoaded", function(event){
//     console.log("hey i loaded")
//     modal.style.display = 'block'
//   })
//   const closeBtn = document.querySelector('.close');
//   closeBtn.addEventListener('click', function(){
//     modal.style.display = 'none'
//   });
//   const letsGoBtn = document.getElementById('lets-go');
//   letsGoBtn.addEventListener('click', function(){
//     modal.style.display = 'none'
// })
// }


///////// ***** Initializer ***** /////////
main();
