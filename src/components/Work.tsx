import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward, MdClose } from "react-icons/md";
import { useState } from "react";

const projects = [
  {
    name: "Aegis Secure System",
    category: "Blockchain Security",
    tools: "Node.js, Web3.js, encrypted communication",
    image: "/images/aegis-secure-system.png",
    githubUrl: "https://github.com/ShashwatEv/Aegis-Secure-System",
    liveUrl: "",
    description:
      "End-to-end encrypted communication with decentralized cryptographic validation, immutable message verification, and heuristic payload inspections.",
  },
  {
    name: "Dhanvaanijya",
    category: "Applied ML",
    tools: "Python, MongoDB, predictive analytics",
    image: "/images/dhanvanijya.png",
    githubUrl: "https://github.com/ShashwatEv/Dhanvaanijya",
    liveUrl: "",
    description:
      "Stock analytics platform with time-series storage, personalized risk indices, price forecasts, and real-time sentiment scoring for community discussions.",
  },
  {
    name: "Commune-X",
    category: "Real-time Communication",
    tools: "Node.js, Redis, WebSockets",
    image: "/images/commune-x.png",
    githubUrl: "https://github.com/ShashwatEv/Commune-X",
    liveUrl: "",
    description:
      "Cross-platform anonymous communication network for web, Windows, and Android with persistent sessions and AI-assisted content moderation.",
  },
];

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [selectedProject, setSelectedProject] =
    useState<(typeof projects)[number] | null>(null);

  useGSAP(() => {
    if (window.innerWidth <= 1024) return;

  let translateX = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    const padding =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p className="work-description">{project.description}</p>
                <div className="work-links">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    data-cursor="disable"
                  >
                    Details <MdArrowOutward />
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                  >
                    GitHub <MdArrowOutward />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="disable"
                    >
                      Live Demo <MdArrowOutward />
                    </a>
                  )}
                </div>
              </div>
              <WorkImage
                image={project.image}
                alt={`${project.name} preview`}
                link={project.githubUrl}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedProject(null)}
        >
          <article
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="project-modal-close"
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedProject(null)}
            >
              <MdClose />
            </button>
            <img
              src={selectedProject.image}
              alt={`${selectedProject.name} project preview`}
            />
            <p className="project-modal-category">{selectedProject.category}</p>
            <h3 id="project-modal-title">{selectedProject.name}</h3>
            <p>{selectedProject.description}</p>
            <strong>Built with</strong>
            <p>{selectedProject.tools}</p>
            <div className="project-modal-links">
              <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                GitHub <MdArrowOutward />
              </a>
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                  Live Demo <MdArrowOutward />
                </a>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default Work;
