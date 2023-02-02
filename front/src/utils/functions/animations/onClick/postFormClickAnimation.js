//Handles the animation on the click event
//@Params { Type: Object, Type: String }
// --> The first one is the data from the onClick event
// --> The second on is to define wich element is going to contain the animation
//We get the data from the event that teach us where we clicked
//Then we create new span on the DOM
//Their position is calculated by substracting the position of the element from the position where we clicked
//A setTimeout removes the span from the after 1s
export const postFormClickAnimation = (e, labelRef) => {
    let x = e.clientX;
    let y = e.clientY;
    let rightPosX =
        e.target.offsetLeft +
        e.target.parentElement.offsetLeft +
        e.target.parentElement.parentElement.offsetLeft;
    let rightPosY =
        e.target.offsetHeight +
        e.target.parentElement.offsetHeight +
        e.target.parentElement.parentElement.offsetHeight;

    let ripples = document.createElement("span");
    ripples.classList.add("ripples");
    ripples.style.left = x - rightPosX + 43 + "px";
    ripples.style.top = y - rightPosY - 94 + "px";
    labelRef.current.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
};
