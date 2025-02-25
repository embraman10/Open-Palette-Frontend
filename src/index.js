///////// ***** Variables ***** /////////
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


///////// ***** Initializer Function ***** /////////
function main() {
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
      const clearBtn = document.getElementById("clr-btn");

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
      clearBtn.addEventListener("click", function () {
        const paletteForm = document.getElementById("palette-form");
        div.style.backgroundColor = "";
        paletteForm.reset();
      });
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
      const clearBtn = document.getElementById("clr-btn");

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

      clearBtn.addEventListener("click", function () {
        h2.style.color = "";
      });
    });
}


///////// ***** Change Font Family ***** /////////
function fetchFonts() {
  const btn = document.getElementById("font-family-btn");
  const font = document.querySelector(".font");
  const h2 = document.getElementsByClassName("card-inner");
  const clearBtn = document.getElementById("clr-btn");

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
  clearBtn.addEventListener("click", function () {
    h2[0].style.fontFamily = "";
  });
}


///////// ***** Calls Saved Palettes ***** /////////
function fetchPalettes() {
  fetch("http://localhost:3000/user_palettes")
    .then((resp) => resp.json())
    .then((palettes) => {
      palettes.forEach(renderPalettes);
    });
}


///////// ***** Render Show Palettes ***** /////////
function renderPalettes(palette) {
  const showPanel = document.getElementById("show-body");

  showPanel.innerHTML += `  
      <div class="card-body" data-id="${palette.id}" style="background-color: ${palette.background_color}">
        <h1 data-id="${palette.id}" style="font-family: ${palette.font_family}; color: ${palette.font_color}">Hello there good looking</h1>
      <div>
        
      </div>
      <div>
        
      </div>
      <div>
    
      </div><br>
      <button type="button" data-id="${palette.id}" id="edit-btn" class="btn btn-warning ">Edit</button>
      <button type="button" data-id="${palette.id}" id="delete-btn" class="btn btn-danger">Delete</button>
      
      </div>`;

  const footer = document.getElementById("show-body");
  footer.addEventListener("click", handleCrud);

  document.addEventListener("DOMContentLoaded", function(){
  //   console.log("hey i loaded")
    showPanel.style.display = 'none'
  })
}



///////// ***** Edit/Delete Show Card Functions ***** /////////
function handleCrud(e) {
  e.preventDefault();
  //console.log(e.target.dataset.id)
  if (e.target.id === "edit-btn") {
    //console.log("I am this cards specific edit button");
    editPalette(e);
  } else if (e.target.id === "delete-btn") {
    //console.log("I am this cards specific delete button");
    deletePalette(e);
  }


  ///////// ***** Calling Saved Palette for Editing ***** /////////
  function editPalette(e) {
    //console.log(e.target.parentNode)
    const paletteForm = document.getElementById("palette-form");
    const paletteId = e.target.dataset.id;
    const h2 = document.getElementsByClassName("card-inner");
    const div = document.getElementById("cb");
    const h2Font = document.getElementById("tester");
    const newBtnSpace = document.getElementById("save-changes-button-space")

    fetch(`http://localhost:3000/user_palettes/${paletteId}`)
      .then((res) => res.json())
      .then((palette) => {
        //console.log(palette)
        (paletteForm.font.value = palette.font_family),
          (paletteForm.fontColor.value = palette.font_color),
          (paletteForm.bgColor.value = palette.background_color),
          (paletteForm.dataset.id = palette.id),
          (h2[0].style.fontFamily = palette.font_family),
          (div.style.backgroundColor = palette.background_color),
          (h2Font.style.color = palette.font_color);
          newBtnSpace.innerHTML += `<button type="button" data-id="${palette.id} style="margin-top: 20px;" id="save-changes-btn" class="btn btn-dark">Save Changes</button>`
      });
  }


  ///////// ***** Delete Saved Palette ***** /////////
  function deletePalette(e) {
    const paletteId = e.target.dataset.id;
    console.log(e.target.dataset.id);
    fetch(`http://localhost:3000/user_palettes/${paletteId}`, {
      method: "DELETE",
    })
      .then((resp) => console.log(resp))
      .then((data) => {
        e.target.parentNode.remove();
      });
  }
}


///////// ***** Saves Edit/Delete Show Palettes ***** /////////
function handleSave(e) {
  e.preventDefault();
  if (e.target.id === "save-btn") {
    //console.log('I am the save button')
    submitPalette(e);
  } else if (e.target.id === "save-changes-btn"){
    //console.log("I am the Save Changes Button!")
    editedPalette(e)
  }
}


///////// ***** Patching Edited Show Palette ***** /////////
function editedPalette(e){
  e.preventDefault()
  const paletteId = e.target.dataset.id;
  //console.log(paletteId)
  const paletteForm = document.getElementById("palette-form");
  let newPalette = {
    background_color: paletteForm.bgColor.value,
    font_color: paletteForm.fontColor.value,
    font_family: paletteForm.font.value,
    user_id: 24,
  };
  //console.log(newPalette)
  fetch(`http://localhost:3000/user_palettes/${paletteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPalette),
    })
    .then((res) => res.json())
    .then((palette) => {
      const foundPalette = document.querySelectorAll(`div[data-id="${palette.id}"]`);

      //console.log(foundPalette[0].children[0].style.color)
      foundPalette[0].style.backgroundColor = palette.background_color
      foundPalette[0].children[0].style.fontFamily = palette.font_family
      foundPalette[0].children[0].style.color = palette.font_color
      const newBtnSpace = document.getElementById("save-changes-button-space")
      newBtnSpace.innerHTML = ""

    });
}


///////// ***** Saves Created Palette ***** /////////
function submitPalette(e) {
  const paletteForm = document.getElementById("palette-form");
  let newPalette = {
    background_color: paletteForm.bgColor.value,
    font_color: paletteForm.fontColor.value,
    font_family: paletteForm.font.value,
    user_id: 24,
  };
  //console.log(newPalette)
  fetch("http://localhost:3000/user_palettes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPalette),
  })
    .then((res) => res.json())
    .then((palette) => {
      renderPalettes(palette);
    });
}



/* ======================================================================
  User Log In Test
====================================================================== */
// Loop through Array of Objects
var objPeople = [
	{ // Object @ 0 index
		username: "Kenny Penny",
		password: "codify"
	},
	{ // Object @ 1 index
		username: "matt",
		password: "academy"
	},
	{ // Object @ 2 index
		username: "chris",
		password: "forever"
  },
]

function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if(username == objPeople[i].username && password == objPeople[i].password) {
      console.log(username + ", you are now logged in!")
      const cardInner = document.getElementById("tester")
      cardInner.innerText = username + ", you are now logged in!"
			// stop the function if this is found to be true
			return
		}
	}
	console.log("incorrect username or password")
}
main();
