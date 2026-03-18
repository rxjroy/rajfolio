import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. in Computer Engineering</h4>
                <h5>Marwadi University</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Expected graduation in May 2026. Relevant Coursework: Data Structures & Algorithms, DBMS, Web Technologies, Artificial Intelligence, Software Engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Web Developer Intern</h4>
                <h5>Vectrium Ventures</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built a full-stack automation system using React.js and Node.js REST APIs, improving operational efficiency by 15%. Optimized RESTful API integrations and database queries, cutting production costs by 10%. Developed real-time maintenance tracking dashboards, reducing equipment downtime by 20%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
