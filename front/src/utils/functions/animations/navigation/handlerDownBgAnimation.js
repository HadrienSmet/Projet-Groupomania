import { showMeRod } from "./showMeRod";

//Handles the behavior of the background of the nav when the mouse leaves a link area
//@Params { Type: Object } --> The data provided by the event
//This function hides the background
//This function choose the right bg thanks to the class of the link targeted by the event
export const handlerDownBgAnimation = (
    e,
    animatedElemRef,
    firstBgRef,
    scdBgRef
) => {
    if (e.target.className === "firstChild") {
        firstBgRef.current.style.transform = "translate(0%, 100%)";
    }
    if (e.target.className === "lastChild") {
        scdBgRef.current.style.transform = "translate(0%, 100%)";
    }
    showMeRod(e, animatedElemRef);
};
