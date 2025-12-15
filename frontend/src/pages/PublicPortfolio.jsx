import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Portfolio from "../components/Portfolio";
import Portfolio2 from "../components/Portfolio2";
import Portfolio3 from "../components/Portfolio3";
import Portfolio4 from "../components/Portfolio4";
import Portfolio5 from "../components/Portfolio5";
import Portfolio6 from "../components/Portfolio6";
import Portfolio7 from "../components/Portfolio7";
import Portfolio8 from "../components/Portfolio8";
import Portfolio9 from "../components/Portfolio9";
import Portfolio10 from "../components/Portfolio10";
import Portfolio11 from "../components/Portfolio11";
import Portfolio12 from "../components/Portfolio12";
import Portfolio13 from "../components/Portfolio13";
import Portfolio14 from "../components/Portfolio14";
import Portfolio15 from "../components/Portfolio15";
import Portfolio16 from "../components/Portfolio16";
import Portfolio17 from "../components/Portfolio17";
import Portfolio18 from "../components/Portfolio18";
import Portfolio19 from "../components/Portfolio19";
import { portfolioData } from "../components/portfolioData";

const portfolioComponents = [
  Portfolio, Portfolio2, Portfolio3, Portfolio4, Portfolio5,
  Portfolio6, Portfolio7, Portfolio8, Portfolio9, Portfolio10,
  Portfolio11, Portfolio12, Portfolio13, Portfolio14, Portfolio15,
  Portfolio16, Portfolio17, Portfolio18, Portfolio19
];

const PublicPortfolio = () => {
  const { id } = useParams();
  const [mergedData, setMergedData] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(0);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/portfolio/public/${id}`);
        const data = await res.json();

        if (data.success) {
          const sections = data.portfolio.sections || [];
          const portfolioType = data.portfolio.type || 0;

          setSelectedPortfolio(portfolioType);

          const merged = {
            ...portfolioData,

            projects: sections
              .filter(s => s.category === "Projects")
              .map(s => ({
                title: s.title,
                description: s.content,
                tech: [],
                highlights: [],
                link: "#"
              })),

            education: sections
              .filter(s => s.category === "Education")
              .map(s => ({
                degree: s.title,
                school: s.content,
                period: "N/A",
                gpa: "N/A",
                courses: []
              })),

            skills: sections
              .filter(s => s.category === "Skills")
              .reduce((acc, s) => {
                acc[s.title] = s.content.split(",").map(skill => skill.trim());
                return acc;
              }, {}),

            certifications: sections
              .filter(s => s.category === "Certifications")
              .map(s => ({
                name: s.title,
                org: s.content,
                year: "N/A"
              })),

            hobbies: sections
              .filter(s => s.category === "Hobbies")
              .map(s => ({
                title: s.title,
                desc: s.content,
                emoji: "🎯"
              })),

            experience: sections
              .filter(s => s.category === "Experience")
              .map(s => ({
                role: s.title,
                company: s.content,
                location: "N/A",
                period: "N/A",
                achievements: []
              })),

            contact: portfolioData.contact,
            footer: portfolioData.footer,
          };

          setMergedData(merged);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (!mergedData) return <p className="text-center mt-20">Loading portfolio...</p>;

  const PortfolioComponent = portfolioComponents[selectedPortfolio] || Portfolio;

  const handleDownload = () => {
    const portfolioCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mergedData.name || 'Portfolio'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #000; color: #fff; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 3rem; margin: 20px 0; background: linear-gradient(to right, #00d4ff, #0099ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    h2 { font-size: 2rem; margin: 30px 0 20px; border-bottom: 2px solid #0099ff; padding-bottom: 10px; }
    .section { margin: 40px 0; }
    .skill-group { margin: 20px 0; }
    .skill-item { display: inline-block; background: #0099ff; color: #000; padding: 8px 16px; margin: 5px; border-radius: 5px; font-weight: bold; }
    .project { background: #1a1a1a; padding: 20px; margin: 15px 0; border-left: 4px solid #0099ff; border-radius: 5px; }
    .project h3 { color: #00d4ff; margin-bottom: 10px; }
    button { background: #0099ff; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-top: 20px; }
    button:hover { background: #0077cc; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${mergedData.name}</h1>
    <p>${mergedData.bio || ''}</p>
    
    ${mergedData.skills ? `
      <div class="section">
        <h2>Skills</h2>
        ${Object.entries(mergedData.skills).map(([category, skills]) => `
          <div class="skill-group">
            <h3>${category}</h3>
            ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
          </div>
        `).join('')}
      </div>
    ` : ''}
    
    ${mergedData.projects && mergedData.projects.length > 0 ? `
      <div class="section">
        <h2>Projects</h2>
        ${mergedData.projects.map(project => `
          <div class="project">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}
    
    ${mergedData.experience && mergedData.experience.length > 0 ? `
      <div class="section">
        <h2>Experience</h2>
        ${mergedData.experience.map(exp => `
          <div class="project">
            <h3>${exp.role} at ${exp.company}</h3>
            <p>${exp.location} | ${exp.period}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}
    
    ${mergedData.education && mergedData.education.length > 0 ? `
      <div class="section">
        <h2>Education</h2>
        ${mergedData.education.map(edu => `
          <div class="project">
            <h3>${edu.degree}</h3>
            <p>${edu.school}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}
  </div>
</body>
</html>
    `.trim();

    const blob = new Blob([portfolioCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mergedData.name || 'portfolio'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          📥 Download Code
        </button>
      </div>
      <PortfolioComponent data={mergedData} inPreview={false} />
    </div>
  );
};

export default PublicPortfolio;
