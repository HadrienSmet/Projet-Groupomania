//Handles the the behavior of the bar sticked to the nav's bottom when the mouse is hover the nav
//@Params { Type: Object } --> The data provided by the event
//The property 'left' is set to fit with the mouse position
export const handlerRodAnimation = (e, animationRef) => {
    let containerPos = window.innerWidth - 415;
    let rodPos = Math.min(e.clientX - containerPos, 333);

    animationRef.current.style.left = rodPos < 67 ? "67px" : rodPos + "px";
};
