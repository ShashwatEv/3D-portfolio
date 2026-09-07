import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import "./styles/Navbar.css";
import { MdClose, MdMenu } from "react-icons/md";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    const navHandlers: Array<{
      element: HTMLAnchorElement;
      handler: (event: MouseEvent) => void;
    }> = [];
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handleClick = (e: MouseEvent) => {
        setIsMenuOpen(false);
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = element.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      };
      element.addEventListener("click", handleClick);
      navHandlers.push({ element, handler: handleClick });
    });
    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      navHandlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className={`header ${isMenuOpen ? "menu-open" : ""}`}>
        <a href="/#" className="navbar-title" data-cursor="disable">
          SSC
        </a>
        <a
          href="mailto:shashwatop89@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          shashwatop89@gmail.com
        </a>
        <button
          className="navbar-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
