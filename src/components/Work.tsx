import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "LinkLite",
    category: "Full Stack URL Shortener",
    tools: "React 19, TypeScript, Vite, Tailwind CSS v4, Node.js, Express.js, MongoDB, Redis",
    image: "/images/linklite.png",
    github: "https://github.com/rxjroy/linklite",
  },
  {
    title: "MERN Stack Job Portal",
    category: "Recruitment Platform",
    tools: "MongoDB, Express.js, React.js, Node.js, JWT, RBAC",
    image: "/images/jobportal.png",
    github: "https://github.com/rxjroy/mernstack-jobportal-clientside",
  },
  {
    title: "Hate Speech Detection Model",
    category: "AI/ML",
    tools: "Python, Scikit-learn, TensorFlow, PyTorch, NLP",
    image: "/images/hatespeech.png",
    github: "https://github.com/rxjroy/Hate-Speech-Detection",
  },
  {
    title: "Diabetes & Cardio Threat Detector Model",
    category: "AI/ML",
    tools: "Python, Scikit-learn, TensorFlow, PyTorch, NLP",
    image: "/images/diabetes.png",
    github: "https://github.com/rxjroy/diabetes-and-cardio-threat-detector",
  },
  {
    title: "Design Folio With Integrated Chat Assistant",
    category: "Web App",
    tools: "Html , CSS , JavaScript",
    image: "/images/designfolio.png",
    github: "https://github.com/rxjroy/hor1zen-design-folio",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <a
          href="https://github.com/rxjroy"
          target="_blank"
          className="work-subtext"
          data-cursor="disable"
        >
          For more works click on me.
        </a>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <a
                          href={project.github}
                          target="_blank"
                          className="view-project-button"
                          data-cursor="disable"
                        >
                          View Project
                        </a>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
