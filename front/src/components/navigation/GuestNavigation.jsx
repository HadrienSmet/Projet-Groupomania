import { Link } from "react-router-dom";
import { showMeRod } from "../../utils/functions/animations/navigation/showMeRod";
import { handlerRodAnimation } from "../../utils/functions/animations/navigation/handleRodAnimation";
import { removeRod } from "../../utils/functions/animations/navigation/removeRod";
import { handlerUpBgAnimation } from "../../utils/functions/animations/navigation/handlerUpBgAnimation";
import { handlerDownBgAnimation } from "../../utils/functions/animations/navigation/handlerDownBgAnimation";

const GuestNavigation = ({ animatedBarRef, firstBgRef, scdBgRef }) => {
    return (
        <nav>
            <ul
                onMouseMove={(e) => handlerRodAnimation(e, animatedBarRef)}
                onMouseEnter={(e) => showMeRod(e, animatedBarRef)}
                onMouseLeave={(e) => removeRod(e, animatedBarRef)}
            >
                <li
                    className="firstChild"
                    onMouseEnter={(e) =>
                        handlerUpBgAnimation(
                            e,
                            animatedBarRef,
                            firstBgRef,
                            scdBgRef
                        )
                    }
                    onMouseLeave={(e) =>
                        handlerDownBgAnimation(
                            e,
                            animatedBarRef,
                            firstBgRef,
                            scdBgRef
                        )
                    }
                >
                    <span
                        ref={firstBgRef}
                        className="animated-bg"
                        id="firstChild"
                    ></span>
                    <Link
                        to="/signup"
                        className="firstChild"
                        onMouseEnter={(e) =>
                            handlerUpBgAnimation(
                                e,
                                animatedBarRef,
                                firstBgRef,
                                scdBgRef
                            )
                        }
                        onMouseLeave={(e) =>
                            handlerDownBgAnimation(
                                e,
                                animatedBarRef,
                                firstBgRef,
                                scdBgRef
                            )
                        }
                    >
                        Inscription
                    </Link>
                </li>
                <li
                    className="lastChild"
                    onMouseEnter={(e) =>
                        handlerUpBgAnimation(
                            e,
                            animatedBarRef,
                            firstBgRef,
                            scdBgRef
                        )
                    }
                    onMouseLeave={(e) =>
                        handlerDownBgAnimation(
                            e,
                            animatedBarRef,
                            firstBgRef,
                            scdBgRef
                        )
                    }
                >
                    <span
                        ref={scdBgRef}
                        className="animated-bg"
                        id="lastChild"
                    ></span>
                    <Link
                        to="/signin"
                        className="lastChild"
                        onMouseEnter={(e) =>
                            handlerUpBgAnimation(
                                e,
                                animatedBarRef,
                                firstBgRef,
                                scdBgRef
                            )
                        }
                        onMouseLeave={(e) =>
                            handlerDownBgAnimation(
                                e,
                                animatedBarRef,
                                firstBgRef,
                                scdBgRef
                            )
                        }
                    >
                        Connexion
                    </Link>
                </li>
                <div
                    ref={animatedBarRef}
                    className="animation start-home"
                ></div>
            </ul>
        </nav>
    );
};

export default GuestNavigation;
