import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> credentials
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech Computer Science &amp; Engineering</h4>
                <h5>Shri Ram Institute of Technology</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              Jabalpur, MP · Expected graduation. SGPA: 7.83 · CGPA: 6.58
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Fundamentals with IBM SkillsBuild</h4>
                <h5>Cisco Networking Academy / IBM</h5>
              </div>
              <h3>BADGE</h3>
            </div>
            <p>
              Foundations in artificial intelligence and practical machine
              learning concepts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certifications</h4>
                <h5>Cisco Networking Academy / Python Institute</h5>
              </div>
              <h3>CERTS</h3>
            </div>
            <p>
              Introduction to Cybersecurity, Python Essentials 1, and Operating
              Systems Basics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
