//Handles the the behavior of the bar sticked to the nav's bottom when the mouse is hover the nav
//@Params { Type: Object } --> The data provided by the event
//The property 'left' is set to fit with the mouse position
export const handlerRodAnimation = (e) => {
    const animated = document.querySelector('.animation');
    
    let containerPos = window.innerWidth - 415;
    let rodPos = Math.min(e.clientX - containerPos, 333) ;

    animated.style.left = rodPos < 67 ? "67px" : rodPos  + "px" ;

};
//Handles the behavior of the bar sticked to the nav's bottom when the mouse leaves the nav
//@Params { Type: Object } --> The data provided by the event
//This function hides the bar  
export const removeRod = (e) => {
    const animated = document.querySelector('.animation');
    animated.style.transform = "translate(-50%, 100%)";
};
//Handles the behavior of the bar sticked to the nav's bottom when the mouse enter the nav's area
//@Params { Type: Object } --> The data provided by the event
//This function displays the bar 
export const showMeRod = (e) => {
    const animated = document.querySelector('.animation');
    animated.style.transform = "translate(-50%, 0%)";
};
//Handles the behavior of the background of the nav when the mouse enters a link area
//@Params { Type: Object } --> The data provided by the event
//This function displays the background 
//This function choose the right bg thanks to the class of the link targeted by the event
export const handlerUpBgAnimation = (e) => {
    const firstBg = document.querySelector("#firstChild");
    const secondBg = document.querySelector("#lastChild");

    if (e.target.className === 'firstChild') {
        firstBg.style.transform = 'translate(0%, 0%)';
    }
    if (e.target.className === 'lastChild') {
        secondBg.style.transform = 'translate(0%, 0%)';
    } 
    removeRod(e); 
};

//Handles the behavior of the background of the nav when the mouse leaves a link area
//@Params { Type: Object } --> The data provided by the event
//This function hides the background 
//This function choose the right bg thanks to the class of the link targeted by the event
export const handlerDownBgAnimation = (e) => {
    const firstBg = document.querySelector("#firstChild");
    const secondBg = document.querySelector("#lastChild");

    if (e.target.className === 'firstChild') {
        firstBg.style.transform = 'translate(0%, 100%)';
    }
    if (e.target.className === 'lastChild') {
        secondBg.style.transform = 'translate(0%, 100%)';
    } 
    showMeRod(e);
};

//Handles the animation on the click event
//@Params { Type: Object, Type: String }
// --> The first one is the data from the onClick event
// --> The second on is to define wich element is going to contain the animation
//We get the data from the event that teach us where we clicked
//Then we create new span on the DOM
//Their position is calculated by substracting the position of the element from the position where we clicked
//A setTimeout removes the span from the after 1s
export const postFormClickAnimation = (e, tag) => {
    let container = document.querySelector(tag);

    let x = e.clientX;
    let y = e.clientY;
    let rightPosX = e.target.offsetLeft + e.target.parentElement.offsetLeft + e.target.parentElement.parentElement.offsetLeft;
    let rightPosY = e.target.offsetHeight + e.target.parentElement.offsetHeight + e.target.parentElement.parentElement.offsetHeight;

    let ripples = document.createElement('span');
    ripples.classList.add('ripples');
    ripples.style.left = x - rightPosX  + 43 + "px";
    ripples.style.top = y - rightPosY - 94  + "px";
    container.appendChild(ripples);
    
    setTimeout(() => {
        ripples.remove();
    }, 1000);
};

//Creates an animation when the user clicks on the button
//@Params { Type: Object, Type: String, Type: Number, Type: Number }
//The first param is the data provided by the event
//The second params defines wich container is going to be the father for the animation
//The two last params are teching us the position of the father in the DOM
export const signInClickAnimation = (e, tag) => {
    let container = document.querySelector(tag)
    let x = e.clientX;
    let y = e.clientY;
    let rightPosX = e.target.offsetLeft + e.target.parentElement.offsetLeft + e.target.parentElement.parentElement.offsetLeft + e.target.parentElement.parentElement.parentElement.offsetLeft;
    let rightPosY = e.target.offsetHeight + e.target.parentElement.offsetHeight + e.target.parentElement.parentElement.offsetHeight;
    
    let ripples = document.createElement('span');
    ripples.classList.add('ripples');
    ripples.style.left = x - rightPosX + 10  + "px";
    ripples.style.top = y - rightPosY - 10  + "px";
    container.appendChild(ripples);
    
    setTimeout(() => {
        ripples.remove();
    }, 1000);
};

//Creates an animation when the user clicks on the button
//@Params { Type: Object, Type: String, Type: Number, Type: Number }
//The first param is the data provided by the event
//The second params defines wich container is going to be the father for the animation
//The two last params are teching us the position of the father in the DOM
export const signUpClickAnimation = (e, tag) => {
    console.log(e);
    let container = document.querySelector(tag)
    let elemX = ((((window.innerWidth * 0.35) + 54) * 0.5) - (176/2)) + (window.innerWidth * 0.11);
    let x = e.clientX;
    let y = e.clientY;

    let ripples = document.createElement('span');
    ripples.classList.add('ripples');
    ripples.style.left = x - elemX - 5 + "px";
    ripples.style.top = y - 361 + "px";
    container.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
};