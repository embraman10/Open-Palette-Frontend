  
const colors = ["#5ba8ff", "#7c8286", "green", "red", "rgba(133,122,200)", 
"#f15025", "#c93f38", "#ffaabb", "#00b89f", "#b0b9c1"];

const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
  const randomNumber = getRandomNumber();
  // console.log(randomNumber);

  document.body.style.backgroundColor = colors[randomNumber];
  color.textContent = colors[randomNumber];
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}

function main(){
  fetchColors()
}

function fetchColors(){
  fetch("http://localhost:3000/background_color_changers")
  .then((resp) => resp.json())
  .then((colors) => {
    console.log(colors);;
  });
}

main()