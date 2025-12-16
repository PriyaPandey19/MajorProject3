import React,{useState, useEffect} from 'react';
import SectionInput from './SectionInput';
import ThreeDPortfolio from'./ThreeDPortfolio';
import '../index.css';
import {v4 as uuidv4} from 'uuid';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';



const API_BASE_URL = 'http://localhost:5000/api/portfolio';

const DEFAULT_CONFIG = {
    animationDuration: 2.5,
    colorTheme:'blue_steel',
    scaleFactor:1.0,
    rotationSpeed:1.0,
};

const PortfolioGenerator = ({user}) =>{
    const [userId, setUserId] = useState(user?.uid);
    const[portfolioItems, setPortfolioItems] = useState([]);
    const[selectedPortfolio, setSelectedPortfolio] = useState(0);
    const[sections, setSections] = useState([]);
    const defaultCategories = ['Skills','Projects','Hobbies','Education','Certifications','Experience'];
    const categories=[...new Set([...defaultCategories,  ...sections.map(section => section.category)])];
    const[projectTitle, setProjectTitle] = useState('');
    const[projectContent, setProjectContent] = useState('');
    const[newCategory, setNewCategory] = useState(categories[0]);
    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState(null);
    const[activeItem, setActiveItem] = useState(null);  
    const[filterCategory, setFilterCategory] = useState('All');
    const[currentConfig, setCurrentConfig] = useState(DEFAULT_CONFIG);
   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  
    

    const filteredItems = portfolioItems.filter(item => filterCategory ==='All' || item.category === filterCategory);
    const availableCategories = categories.filter(cat => !portfolioItems.some(item => item.category === cat));



     useEffect(() => {
        console.log("User prop:", user);
        console.log("UserId:", userId);
        console.log("PortfolioItems:", portfolioItems);
    }, [user, userId, portfolioItems]);


    useEffect(() => {
      if(user?.uid) setUserId(user.uid);
    },[user]);

   

    useEffect(() =>{
       const fetchUserPortfolio = async() => {
        if(!userId) return;
        try{
          const response = await fetch(`${API_BASE_URL}/user/${userId}`);
          if(!response.ok) throw new Error("Failed to fetch portfolio");
          const data = await response.json();
          if(data.length > 0){
             setPortfolioItems(data[0]);
            setProjectTitle(data[0].title);
            setProjectContent(data[0].projectContent);
            setSections(data[0].sections || []);
            setSelectedPortfolio(data[0].type || 0);
            setCurrentConfig(data[0].configData || DEFAULT_CONFIG);
          } else {
            // Initialize with empty item if no data
            setPortfolioItems([]);
            setActiveItem(null);
            setSections([]);
          }
        }catch(e){
          console.error(e);
          setActiveItem(null);
          setSections([]);
        }
       };
      fetchUserPortfolio();
    },[userId]);

    // Auto-save when portfolio template is changed
  
   



const generateConfigFromContent = (title, content, category) =>{
        const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
        const lengthFactor = Math.min(1.0 ,wordCount / 100.0) + 0.5;
        
        let newConfig ={
            animationDuration:Math.max(1.5, 4.0 - (lengthFactor *0.5)),
            scaleFactor:Math.min(1.5, 0.8 + (lengthFactor * 0.5)),
            rotationSpeed:title.length < 15 ? 1.5 : 1.0,
        };

        if(category === 'Backend API'|| content.toLowerCase().includes('database')){
            newConfig.colorTheme ='dark_matter';
        } else if(category === 'Personal' || content.toLowerCase().includes('hobby')){
             newConfig.colorTheme = 'sunset_glow';
        }else{
             newConfig.colorTheme = 'blue_steel';
        }
        // Ensure we are merging into a valid object
        return{...DEFAULT_CONFIG, ...currentConfig, ...newConfig}; 
    };


const fetchWithRetry = async (url, options = {}) => {
  let response = null;
  for (let i = 0; i < 3; i++) {
    try {
      response = await fetch(url, options);
      if (response.ok) return response;
    } catch (e) {
      if (i === 2) throw e;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  if (response && !response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  throw new Error('Network request failed after multiple retries.');
};

 const handleAddSection = (newSection) => {
  const sectionWithId = {
    ...newSection,
    _id: uuidv4()
  };

  const updatedSections = [...sections, sectionWithId];
  setSections(updatedSections);

  const combinedTitle = updatedSections.map(s => s.title).join(" ");
  const combinedContent = updatedSections.map(s => s.content).join(" ");

  setCurrentConfig(
    generateConfigFromContent(combinedTitle, combinedContent, "Combined")
  );

  setProjectTitle(combinedTitle);
  setProjectContent(combinedContent);
};





 const savePortfolio = async () => {
  if (!userId) {
    toast.error("Login required");
    return;
  }

  if (sections.length === 0) {
    toast.error("Add at least one section");
    return;
  }

  const payload = {
    userId,
    title: projectTitle || "My Portfolio",
    category: sections.length === 1 ? sections[0].category : "Combined",
    sections,
    configData: currentConfig || DEFAULT_CONFIG,
    projectContent,
    type: selectedPortfolio,
    portfolioId: activeItem?._id // 👈 ONLY THIS decides create vs edit
  };

  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const saved = await res.json();

  setActiveItem(saved);
  setPortfolioItems(prev =>
    prev.some(p => p._id === saved._id)
      ? prev.map(p => (p._id === saved._id ? saved : p))
      : [...prev, saved]
  );

  toast.success("Saved");
};




 const handleDeleteAll = async () => {
  if (!userId) {
    toast.error("Please log in first");
    return;
  }

  const result = await Swal.fire({
    title: '⚠️ Delete All Portfolio Items?',
    html: '<p style="color: #999; font-size: 16px;">This action <strong style="color: #ff6b6b;">cannot be undone</strong>. All your portfolio sections will be permanently deleted.</p>',
    icon: 'warning',
    background: '#1a1a2e',
    color: '#ffffff',
    confirmButtonColor: '#ff6b6b',
    cancelButtonColor: '#404060',
    confirmButtonText: '🗑️ Delete All',
    cancelButtonText: 'Cancel',
    showCancelButton: true,
    reverseButtons: true,
    customClass: {
      popup: 'rounded-2xl',
      confirmButton: 'font-semibold px-6 py-2 rounded-lg transition hover:shadow-lg',
      cancelButton: 'font-semibold px-6 py-2 rounded-lg transition'
    }
  });

  if (!result.isConfirmed) return;

  setIsLoading(true);
  setError(null);

  try {
    console.log("Attempting to delete all for userId:", userId);
    const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || errorBody.error || "Failed to delete all items.");
    }

    const deleteResult = await response.json();
    console.log("Bulk delete result:", deleteResult);

    setPortfolioItems([]);
    setSections([]);
    setActiveItem(null);
    setProjectTitle('');
    setProjectContent('');
    setCurrentConfig(DEFAULT_CONFIG);
    setFilterCategory('All');
    
    Swal.fire({
      title: '✅ Deleted Successfully!',
      text: `${deleteResult.deletedCount || 0} portfolio items have been removed.`,
      icon: 'success',
      background: '#1a1a2e',
      color: '#ffffff',
      confirmButtonColor: '#4CAF50',
      customClass: {
        popup: 'rounded-2xl'
      }
    });
  } catch (e) {
    console.error("Delete error:", e);
    setError(`Delete All failed: ${e.message}`);
    Swal.fire({
      title: '❌ Deletion Failed',
      text: e.message,
      icon: 'error',
      background: '#1a1a2e',
      color: '#ffffff',
      confirmButtonColor: '#ff6b6b',
      customClass: {
        popup: 'rounded-2xl'
      }
    });
  } finally {
    setIsLoading(false);
  }
};






 const handleChangePortfolio = () => {
    const TOTAL_TEMPLATES = 19;
    const nextIndex = (selectedPortfolio + 1) % TOTAL_TEMPLATES;
    setSelectedPortfolio(nextIndex);
    
    // Auto-save the new portfolio selection if there's an active item
    if (activeItem?._id) {
      toast.info("Portfolio template updated! Saving...");
      // The save will happen through the effect
    }
};


const buildPortfolioData = () => ({
  name: projectTitle || activeItem?.title || "My Portfolio",

  projects: sections
    .filter(s => s.category === "Projects")
    .map(s => ({
      id: s._id,
      title: s.title,
      description: s.content,
      tech: [],
      highlights: [],
      link: "#"
    })),

  experience: sections
    .filter(s => s.category === "Experience")
    .map(s => ({
      id: s._id,
      role: s.title,
      company: s.content,
      period: "N/A",
      achievements: []
    })),

  education: sections
    .filter(s => s.category === "Education")
    .map(s => ({
      id: s._id,
      degree: s.title,
      school: s.content,
      period: "N/A"
    })),

  skills: sections
    .filter(s => s.category === "Skills")
    .reduce((acc, s) => {
      acc[s.title || "Other"] =
        (s.content || "").split(",").map(v => v.trim());
      return acc;
    }, {}),

  hobbies: [],
  certifications: [],
  contact: {},
  footer: { text: "© 2024 Portfolio" }
});









    return (
      <>
      <ToastContainer position="top-right" autoClose={3000} />
  <div className="min-h-screen bg-black text-white px-10 py-4 font-sans">
    <h1 className="text-5xl font-extrabold leading-tight mb-4">
      Content-to-3D Portfolio {" "}
      <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 text-transparent bg-clip-text">Generator</span>
    </h1>

    <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-2xl">
      <strong>Goal:</strong> Input project or skill section content. The system converts content complexity into unique 3D animation parameters (speed, scale, color) shown in live preview.
    </p>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"> 
      {/* Left Panel */}
      <div className="lg:col-span-2 space-y-8">
        {/* Live Preview */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800 ">
          <h2 className="text-2xl font-bold text-white mb-4 flex justify-between items-center">
            Live 3D Visualization Preview

            <div className="flex gap-2 flex-col sm:flex-row">
            <button
              onClick={handleChangePortfolio}
              className="w-full sm:w-auto ml-0 sm:ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
            >
              Change Portfolio
            </button>
            
            <button
      onClick={() => setIsPreviewOpen(true)}
      className="w-full sm:w-auto bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition"
    >
      View Here
    </button>

            </div>
          
          </h2>

          <div className="h-96 overflow-y-auto rounded-lg bg-gray-800 border border-gray-700 scroll-smooth">
            <ThreeDPortfolio
              selectedPortfolio={selectedPortfolio}
              data={{
                name: projectTitle || activeItem?.title || "My Portfolio",
                email: "hello@example.com",
                phone: "+1 (555) 123-4567",
                location: "San Francisco CA",
                bio: "Portfolio Creator",
                projects: sections.length > 0 ? sections
                  .filter(s => s.category === 'Projects')
                  .map(s => ({
                    id: s._id || Math.random(),
                    title: s.title || "Project",
                    description: s.content || "Project description",
                    tech: [],
                    highlights: [],
                    link: "#",
                    image: ""
                  })) : [],
                education: sections
                  .filter(s => s.category === 'Education')
                  .map(s => ({
                    id: s._id || Math.random(),
                    degree: s.title || "Degree",
                    school: s.content || "School",
                    period: "N/A",
                    gpa: "N/A",
                    courses: []
                  })) || [],
                skills: sections
                  .filter(s => s.category === 'Skills')
                  .reduce((acc, s) => {
                    acc[s.title || 'Other'] = (s.content || "").split(',').map(skill => skill.trim()).filter(s => s);
                    return acc;
                  }, {}) || {},
                certifications: sections
                  .filter(s => s.category === 'Certifications')
                  .map(s => ({
                    id: s._id || Math.random(),
                    name: s.title || "Certification",
                    org: s.content || "Organization",
                    year: "N/A"
                  })) || [],
                hobbies: sections
                  .filter(s => s.category === 'Hobbies')
                  .map(s => ({
                    id: s._id || Math.random(),
                    title: s.title || "Hobby",
                    desc: s.content || "Description",
                    emoji: "🎯"
                  })) || [],
                experience: sections
                  .filter(s => s.category === 'Experience')
                  .map(s => ({
                    id: s._id || Math.random(),
                    role: s.title || "Role",
                    company: s.content || "Company",
                    location: "N/A",
                    period: "N/A",
                    achievements: []
                  })) || [],
                services: sections
                  .filter(s => s.category === 'Projects')
                  .map(s => ({
                    id: s._id || Math.random(),
                    title: s.title || "Service",
                    desc: s.content || "Service description"
                  })) || [],
                achievements: [
                  { number: "99%", label: "Client Satisfaction" },
                  { number: "50+", label: "Projects Completed" },
                  { number: "5+", label: "Years Experience" },
                  { number: "10+", label: "Team Members" }
                ],
                testimonials: [],
                contact: {
                  heading: "Let's Work Together",
                  message: "Have a project in mind? Let's create something amazing together.",
                  email: "hello@example.com",
                  phone: "+1 (555) 123-4567",
                  location: "San Francisco CA",
                  socials: ["Twitter", "LinkedIn", "GitHub"]
                },
                footer: {
                  text: "© 2024 Portfolio. Crafted with passion and precision."
                }
              }}
            />
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Active Item ID: <span className="font-mono text-gray-700">{activeItem?._id || 'UNSAVED (Live Content Analysis)'}</span>
          </p>



          {activeItem?.isPublic && activeItem?.publicUrl && (
            <div className="mt-4 bg-gray-800 rounded-xl border border-gray-700">
              <p className='text-sm text-gray-300 mb-1'>Public Portfolio URL:</p>

              <a
              href={activeItem.publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline break-all text-sm"
              >{activeItem.publicUrl}</a>

              <button
              onClick={() => {
                navigator.clipboard.writeText(activeItem.publicUrl);
                toast.success("Copied public link!");
              }}
              className="mt-3 px-3 py-1 bg-blue-600 text-white rounded-md text-xs hover:bg-blue-700"
              >Copy Link</button>
              </div>
          )}
        </div>

        {/* Section Input Form */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-900">
          <h2 className="text-2xl font-bold text-white mb-4">Add Portfolio Section</h2>
          <SectionInput categories={categories} onAddSection={handleAddSection} />
          <div className="mt-4 flex gap-4">
            <button
              onClick={savePortfolio}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-freen-700 transition"
              disabled={isLoading || sections.length === 0}
            >
              {isLoading ? 'Saving...' : 'Save Portfolio'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="lg:col-span-1">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl  text-white flex flex-col max-h-[80vh]">
          <h2 className="text-2xl font-bold text-white mb-4 flex justify-between items-center">
            Saved Portfolio Sections
            <button
              onClick={handleDeleteAll}
              className="text-sm font-medium text-red-400 hover:text-red-600 tarnsition"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete All'}
            </button>
          </h2>

          {/* Filter Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">Filter by Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="block w-full rounded-md  border border-gray-700 bg-gray-900 text-white placeholder-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="All">All Categories</option>
              {[...new Set(portfolioItems.map(item => item.category))].sort().map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Saved Items List */}
          <ul className="space-y-3 mt-4 flex-1 overflow-y-auto pr-2">
            {sections && sections.length > 0 ? (
              sections.filter(s => filterCategory === 'All' || s.category === filterCategory).map((section) => (
                <li
                  key={section._id || Math.random()}
                  className={`p-4 rounded-xl border-2 transition bg-gray-800 border-gray-700 hover:border-purple-500`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white truncate">{section.title}</h3>
                    <button
                      className="text-red-500 text-sm font-medium hover:text-red-700"
                      onClick={(e) => {
                        setSections(prev=> prev.filter(s => s._id !== section._id));
                        toast.success("Section removed");
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs font-bold text-indigo-400 bg-indigo-900 inline-block px-2 py-0.5 rounded-full mt-1">
                    {section.category}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {section.content?.substring(0, 80)}...
                  </p>
                </li>
              ))
            ) : (
              <li className="text-center text-gray-500 py-8">
                No sections added yet. Add sections below to get started!
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>



  {/* FULL SCREEN PREVIEW MODAL */}
{isPreviewOpen && (
  <div className="fixed inset-0 z-[9999] bg-black">
    
    {/* Top Bar */}
    <div className="absolute top-0 left-0 right-0 h-14 bg-gray-900 flex items-center justify-between px-6 border-b border-gray-700">
      <span className="text-sm text-gray-300">Portfolio Preview</span>
      <button
        onClick={() => setIsPreviewOpen(false)}
        className="text-red-400 hover:text-red-600 text-sm font-medium"
      >
        ✕ Close
      </button>
    </div>

    {/* Preview Content */}
    <div className="w-full h-full pt-14 overflow-auto">
      <ThreeDPortfolio
        selectedPortfolio={selectedPortfolio}
        data={{
          name: projectTitle || "My Portfolio",
          projects: sections
          .filter(s => s.category === "Projects")
          .map(s => ({
           id: s._id || Math.random(),
           title:s.title|| "Project",
           description:s.content || "Project description",
           tech:[],
           highlights:[],
           link:"#"
          })),
          skills:sections
          .filter(s => s.category === "Skills")
          .reduce((acc, s) => {
            acc[s.title || "Other"]= (s.content || "")
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);
            return acc;
          },{}),
          education: sections
          .filter(s => s.category === "Education")
          .map(s => ({
             id: s._id || Math.random(),
          degree: s.title || "Degree",
          school: s.content || "School",
          period: "N/A",
          gpa: "N/A",
          courses: []
          })),
          experience: sections
          .filter(s => s.category === "Experience")
          .map(s => ({
            id: s._id || Math.random(),
          role: s.title || "Role",
          company: s.content || "Company",
          location: "N/A",
          period: "N/A",
          achievements: []
          })),
          hobbies: sections
          .filter(s => s.category ==="Hobbies")
          .map(s => ({
            id: s._id || Math.random(),
          title: s.title || "Hobby",
          desc: s.content || "Description",
          })),
          certifications:sections
          .filter(s => s.category ==="Certifications")
          .map(s => ({
            id: s._id || Math.random(),
          name: s.title || "Certification",
          org: s.content || "Organization",
          year: "N/A"
          }))
          ,
          contact: {},
          footer: { text: "Preview Mode" }
        }}
        isPreview
      />
    </div>
  </div>
)}

 
  </>
);
}





export default PortfolioGenerator;