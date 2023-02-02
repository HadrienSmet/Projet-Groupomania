//Creates an animation when the user clicks on the button
//@Params { Type: Object, Type: String, Type: Number, Type: Number }
//The first param is the data provided by the event
//The second params defines wich container is going to be the father for the animation
//The two last params are teching us the position of the father in the DOM
export const signUpClickAnimation = (e, containerRef) => {
    let elemX =
        (window.innerWidth * 0.35 + 54) * 0.5 -
        176 / 2 +
        window.innerWidth * 0.11;
    let x = e.clientX;
    let y = e.clientY;

    let ripples = document.createElement("span");
    ripples.classList.add("ripples");
    ripples.style.left = x - elemX - 5 + "px";
    ripples.style.top = y - 361 + "px";
    containerRef.current.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
};
