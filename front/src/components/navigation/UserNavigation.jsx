import { Link } from "react-router-dom";
import { showMeRod } from "../../utils/functions/animations/navigation/showMeRod";
import { handlerRodAnimation } from "../../utils/functions/animations/navigation/handleRodAnimation";
import { removeRod } from "../../utils/functions/animations/navigation/removeRod";
import { handlerUpBgAnimation } from "../../utils/functions/animations/navigation/handlerUpBgAnimation";
import { handlerDownBgAnimation } from "../../utils/functions/animations/navigation/handlerDownBgAnimation";

const UserNavigation = ({ animatedBarRef, firstBgRef, scdBgRef }) => {
    return (
        <nav>
            <ul
                onMouseMove={(e) => handlerRodAnimation(e, animatedBarRef)}
                onMouseEnter={(e) => showMeRod(e, animatedBarRef)}
                onMouseLeave={(e) => removeRod(e, animatedBarRef)}
            >
                <li
                    className="firstChild welcome-btn"
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
                        to="/"
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
                        Déconnexion
                    </Link>
                </li>
                <li
                    className="lastChild home-btn"
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
                    <a
                        href="#main-title"
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
                        Accueil
                    </a>
                </li>
                <div
                    ref={animatedBarRef}
                    className="animation start-home"
                ></div>
            </ul>
        </nav>
    );
};

export default UserNavigation;
