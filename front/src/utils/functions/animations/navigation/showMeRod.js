//Handles the behavior of the bar sticked to the nav's bottom when the mouse enter the nav's area
//@Params { Type: Object } --> The data provided by the event
//This function displays the bar
export const showMeRod = (e, animatedElemRef) => {
    animatedElemRef.current.style.transform = "translate(-50%, 0%)";
};
