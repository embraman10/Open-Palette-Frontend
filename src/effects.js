
function main(){
    popUp();
    hello();
    openLogo();
    toggleShowCards();
    saveSuccess();
    // deletePal();
}


///////// ***** Welcome Popup ***** /////////
function popUp(){
    const modal = document.querySelector('#my-modal');
    document.addEventListener("DOMContentLoaded", function(event){
    //   console.log("hey i loaded")
      modal.style.display = 'flex'
    })
    const closeBtn = document.getElementById('pop-close-btn');
    closeBtn.addEventListener('click', function(){
      modal.style.display = 'none'
    });
    const letsGoBtn = document.getElementById('lets-go');
    letsGoBtn.addEventListener('click', function(){
      modal.style.display = 'none'
  })
};


///////// ***** Save Success Popup ***** /////////
function saveSuccess(){

    $("#save-btn").click(function(){
        $("#response").animate({
             height: '+=72px'
         }, 300);
       
       $('<div class="alert alert-success">' +
         '<button type="button" class="close" data-dismiss="alert">' +
         '&times;</button>Success! You have saved your palette! Check out your saved palettes!</div>').hide().appendTo('#response').fadeIn(1000);
       
        $(".alert").delay(3000).fadeOut(
       "normal",
       function(){
         $(this).remove();
       });
       
       
       $("#response").delay(4000).animate({
             height: '-=72px'
         }, 300);
     
     });
     
     $("#btn-error").click(function(){
       $("#response").animate({
             height: '+=72px'
         }, 300);
        $('<div class="alert alert-danger">' +
                 '<button type="button" class="close" data-dismiss="alert">' +
                 '&times;</button>Failed</div>').hide().appendTo('#response').fadeIn(1000);
       
       $(".alert").delay(3000).fadeOut(
       "normal",
       function(){
         $(this).remove();
       });
       
        $("#response").delay(4000).animate({
             height: '-=72px'
         }, 300);
     });    
}


///////// ***** Show/Hide Show Cards ***** /////////
function toggleShowCards(){
    let btn = document.getElementById("show-save-btn")
    let showContainer = document.getElementById("show-body");
    let showCard = true;
    document.addEventListener("DOMContentLoaded", function(event){
        //   console.log("hey i loaded")
          showContainer.style.display = 'none'
        })
    btn.addEventListener("click", function(){
        showCard = !showCard;
        const cardInner = document.getElementById("tester")
        cardInner.innerText = "Hello there good looking"
        if (showCard) {
            showContainer.style.display = "none"
        } else  {
            showContainer.style.display = "flex"
        } 

    })
}



///////// ***** Greeting Popup Text Animation***** /////////
function hello(){

    var textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    anime.timeline({loop: false})
      .add({
        targets: '.ml2 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i
    });  
}



///////// ***** Open Palette Header Logo ***** /////////
function openLogo(){
    document.addEventListener("DOMContentLoaded", function(event){
    anime.timeline({loop: false})
        .add({
            targets: '.ml8 .circle-white',
            scale: [0, 3],
            opacity: [1, 0],
            easing: "easeInOutExpo",
            rotateZ: 360,
            duration: 1100
        }).add({
            targets: '.ml8 .circle-container',
            scale: [0, 1],
            duration: 1100,
            easing: "easeInOutExpo",
            offset: '-=1000'
        }).add({
            targets: '.ml8 .circle-dark',
            scale: [0, 1],
            duration: 1100,
            easing: "easeOutExpo",
            offset: '-=600'
        }).add({
            targets: '.ml8 .letters-left',
            scale: [0, 1],
            duration: 1200,
            offset: '-=550'
        }).add({
            targets: '.ml8 .bang',
            scale: [0, 1],
            rotateZ: [45, 15],
            duration: 1200,
            offset: '-=1000'
        });

        anime({
        targets: '.ml8 .circle-dark-dashed',
        rotateZ: 360,
        duration: 8000,
        easing: "linear",
        loop: true
        });
    })
}

// function deletePal(){
//     const btn = document.getElementById("delete-btn");
//     const card = document.getElementById()
//     btn.addEventListener("click", function(event){
//         event.animate({
//             padding: "0px",
//             'margin-left':'-10px',
//             'font-size': "0px"
//         }, 500, function(e) {
//             e.remove
//         })
//     });
// }


main()