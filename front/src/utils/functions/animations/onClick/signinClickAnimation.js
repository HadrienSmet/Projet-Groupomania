//Creates an animation when the user clicks on the button
//@Params { Type: Object, Type: String, Type: Number, Type: Number }
//The first param is the data provided by the event
//The second params defines wich container is going to be the father for the animation
//The two last params are teching us the position of the father in the DOM
export const signInClickAnimation = (e, containerRef) => {
    let x = e.clientX;
    let y = e.clientY;
    let rightPosX =
        e.target.offsetLeft +
        e.target.parentElement.offsetLeft +
        e.target.parentElement.parentElement.offsetLeft +
        e.target.parentElement.parentElement.parentElement.offsetLeft;
    let rightPosY =
        e.target.offsetHeight +
        e.target.parentElement.offsetHeight +
        e.target.parentElement.parentElement.offsetHeight;

    let ripples = document.createElement("span");
    ripples.classList.add("ripples");
    ripples.style.left = x - rightPosX + 10 + "px";
    ripples.style.top = y - rightPosY - 10 + "px";
    containerRef.current.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
};
