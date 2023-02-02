//Handles the behavior of the bar sticked to the nav's bottom when the mouse leaves the nav
//@Params { Type: Object } --> The data provided by the event
//This function hides the bar
export const removeRod = (e, animatedElemRef) => {
    animatedElemRef.current.style.transform = "translate(-50%, 100%)";
};
