//Handles the the behavior of the bar sticked to the nav's bottom when the mouse is hover the nav
//@Params { Type: Object } --> The data provided by the event
//The property 'left' is set to fit with the mouse position
export const handlerRodAnimation = (e) => {
    const animated = document.querySelector('.animation');
    let rodPos = e.clientX < 1028 ? 0 : e.clientX - 1028;

    animated.style.left = Math.min(rodPos, 250)  + "px" ;

};
//Handles the behavior of the bar sticked to the nav's bottom when the mouse leaves the nav
//@Params { Type: Object } --> The data provided by the event
//This function hides the bar  
export const removeRod = (e) => {
    const animated = document.querySelector('.animation');
    animated.style.transform = "translateY(100%)";
};
//Handles the behavior of the bar sticked to the nav's bottom when the mouse enter the nav's area
//@Params { Type: Object } --> The data provided by the event
//This function displays the bar 
export const showMeRod = (e) => {
    const animated = document.querySelector('.animation');
    animated.style.transform = "translateY(0%)";
};
//Handles the behavior of the background of the nav when the mouse enters a link area
//@Params { Type: Object } --> The data provided by the event
//This function displays the background 
//This function choose the right bg thanks to the class of the link targeted by the event
export const handlerUpBgAnimation = (e) => {
    const firstBg = document.querySelector("#firstChild");
    const secondBg = document.querySelector("#lastChild");

    if (e.target.className === 'firstChild') {
        firstBg.style.transform = 'translate(-12.5%, 0%)';
    }
    if (e.target.className === 'lastChild') {
        secondBg.style.transform = 'translate(-12.5%, 0%)';
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
        firstBg.style.transform = 'translate(-12.5%, 100%)';
    }
    if (e.target.className === 'lastChild') {
        secondBg.style.transform = 'translate(-12.5%, 100%)';
    } 
    showMeRod(e);
};