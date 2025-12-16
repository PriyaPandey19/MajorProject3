import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import googleIcon from "../assets/google-icon.png";
import Navbar from "../components/Navbar";
import mockup from "../assets/mockup.png";
import appsGrid from "../assets/apps-grid.png";
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const HomePage = ({ user, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const mainVideoRef = useRef(null);

  const tags = [
    { icon: "fa-brands fa-figma", label: "Figma" },
    { icon: "fa-brands fa-github", label: "GitHub" },
    { icon: "fa-brands fa-react", label: "React" },
    { icon: "fa-brands fa-node", label: "Node.js" },
    { icon: "fa-solid fa-code", label: "API" },
    { icon: "fa-brands fa-css3", label: "CSS" },
    { icon: "fa-solid fa-cube", label: "3D Models" },
    { icon: "fa-solid fa-globe", label: "WebGL" },
    { icon: "fa-solid fa-briefcase", label: "Portfolio" },
  ];

  useEffect(() => {
    const startTimes = [0, 3, 6, 9, 12, 15];
    if (!videoRefs.current || videoRefs.current.length === 0) return;

    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.addEventListener("loadedmetadata", () => {
          video.currentTime = startTimes[index] || 0;
          video.play().catch(() => {});
        });
      }
    });

    if(mainVideoRef.current){
      mainVideoRef.current.play().catch(()=> {
        console.log("Browser blocked auto-play for video")
      })
    }
  }, []);


  const logos = [
    "comcast",
    "comcatBusiness",
    "dept",
    "Epic-Games",
    "sony",
    "tcclogo",
    "random"
  ]

 

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />

      <div className="min-h-screen bg-black text-white px-10 pt-0 pb-20 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* left section */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-white">3D Portfolio</span>
            <span className="text-purple-400">.com</span>
          </h2>

          <div className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-xl text-sm mb-6 inline-flex items-center gap-2">
            <span className="text-gray-300">🔥 Trending</span>
          </div>

          <p className="text-lg mb-4">
            Showcase the future of Portfolio with immersive visuals.
          </p>

          <h1 className="text-6xl font-extrabold leading-tight mb-4">
            Build a portfolio that{" "}
            <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              stands out
            </span>
          </h1>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Turn your work into an interactive experience using modern 3D visuals.
            Impress recruiters, clients, and collaborators with a next-gen portfolio.
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 flex-1 flex items-center h-14">
              <i className="fa-regular fa-envelope"></i>
              <input
                type="email"
                placeholder="john.doe@email.com"
                className="bg-transparent w-full text-gray-300 focus:outline-none ml-2"
              />
            </div>

            <button className="h-14 px-8 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 hover:opacity-90 transition font-semibold rounded-xl">
              Get Started
             <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <button 
            onClick={() => handleGoogleLogin()}
            className="w-full bg-gray-900 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition flex items-center justify-center gap-2">
            <img src={googleIcon} className="w-5 h-5" alt="Google Icon" />
            Continue with Google
          </button>
        </div>

        {/* right video grid */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`bg-gray-900 overflow-hidden rounded-2xl shadow-lg border border-gray-800 hover:scale-105 transition ${
                i % 2 === 1 ? "mt-8" : ""
              }`}
              style={{ height: "150px" }}
            >
              <video
                ref={(el) => (videoRefs.current[i] = el)}
                src="/videos/myvideo.mp4"
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Feature card section */}
      <div className="w-full bg-black -mt-30 px-10">
        <div className="flex flex-col lg:flex-row justify-between items-center text-white gap-4 lg:gap-16">
          <div className="w-full lg:max-w-3xl lg:flex-shrink-0">
            <img
              src={mockup}
              alt="Portfolio Mockup"
              className="w-full hover:drop-shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-300"
            />
          </div>

          <div className="flex-1 py-10">
            <h3 className="text-4xl font-extrabold mb-4">Visualize the Impact</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our immersive 3D environment lets your audience interact directly with your projects, providing a depth of experience unmatched by traditional, flat portfolios. Recruiters spend only seconds reviewing applications—make those seconds count with a powerful visual statement.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-purple-400 text-xl">✨</span>
                Interactive Viewing: Allows for object manipulation and detailed exploration.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400 text-xl">🎯</span>
                High Retention: Memorable presentations lead to better job opportunities.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400 text-xl">⚙️</span>
                No Code Required: Simple drag-and-drop building tools.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Two feature cards */}
      <div  id="features" className="w-full px-10 py-20 bg-black text-white">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-10">
          {/* LEFT CARD */}
          <div className="bg-[#0c0c0c] w-full md:w-[430px] md:ml-[139px] min-h-[410px] flex flex-col justify-between border border-gray-800 rounded-2xl p-10 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:scale-[1.01] transition-all">
            <div className="flex-grow">
              <h2 className="text-4xl font-bold mb-4">Sync your tokens</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Specify is natively compatible with Figma, Github, Notion, Raycast and many more.
                Our REST API and CLI help you connect even more.
              </p>
              <button className="flex items-center gap-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                Discover all available apps
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            
            <div className=" relative -mx-10 -mb-10 -mt-2">
              <div className="absolute top-0 left-0 w-full h-0 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none rounded-t-xl"/>
            <img  
              src={appsGrid}
              className="w-full mt-10 rounded-xl object-cover h-48"
              alt="Apps Grid"
            />
            </div>
           
          </div>

          {/* RIGHT CARD */}
          <div className="bg-[#0c0c0c] w-full md:w-[430px] min-h-[410px] flex flex-col justify-between border border-gray-800 rounded-2xl p-10 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:scale-[1.01] transition-all">
            <div className="flex-grow">
              <h2 className="text-4xl font-extrabold mb-4">Customize outputs</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Specify’s open source parsers help you generate design tokens and assets that match your company standards.
              </p>
              <button className="flex items-center gap-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
                Discover all parsers
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            <div className="space-y-4 mt-10 -mx-10">
               <div className="marquee-row overflow-hidden">
               
                <div className="marquee-right flex gap-4 whitespace-nowrap animate-marquee-reverse">
                  {[...tags, ...tags, ...tags].map((tag, i) => (
                    <span
                      key={`r-${i}`}
                      className="px-4 py-2 bg-[#161616] border border-gray-700 rounded-xl text-sm text-gray-200 flex items-center gap-1"
                    >
                      <i className={tag.icon}></i>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="marquee-row overflow-hidden">
                
                <div className="marquee-left flex gap-4 whitespace-nowrap animate-marquee">
                  {[...tags, ...tags].map((tag, i) => (
                    <span
                      key={`1-${i}`}
                      className="px-4 py-2 bg-[#161616] border border-gray-700 rounded-xl text-sm text-gray-200 flex items-center gap-1"
                    >
                      <i className={tag.icon}></i>
                      {tag.label}
                    </span>
                  ))}
              
               </div>

              </div>

              <div className="marquee-row overflow-hidden">
               
                <div className="marquee-right flex gap-4 whitespace-nowrap animate-marquee-reverse">
                  {[...tags, ...tags,...tags].map((tag, i) => (
                    <span
                      key={`r-${i}`}
                      className="px-4 py-2 bg-[#161616] border border-gray-700 rounded-xl text-sm text-gray-200 flex items-center gap-1"
                    >
                      <i className={tag.icon}></i>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-black px-10 py-10 overflow-hidden">
        <h3 className="text-white mb-9  text-4xl font-bold">Trusted by leading brands</h3>
        <div className="animate-scroll-x flex gap-20 whitespace-nowrap w-[300%]">
          {[...logos,...logos,...logos].map((name, i) => (
            <img  
            key={i}
            src={`/logos/${name}.png`}
            alt={`${name} logo`}
            className="h-12 w-auto object-contain"
            />
          ))}
        </div>
      </div>


      

       <div id="blog" className="w-full bg-[#0a0a0a] text-white px-10 py-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Why Our Portfolio Generator Works</h2>

        {/* The main FLEX ROW container */}
        <div className="flex flex-col lg:flex-row gap-10 max-w-screen-xl mx-auto items-start">
          
          {/* 1. LEFT COLUMN (Cards) - We make this the first child */}
          <div className="w-full lg:w-1/2 space-y-6 ">
            {/* Card 1: We did the hard work for you */}
            <div className="bg-black p-6 rounded-xl shadow-lg hover:scale-[1.01] transition-all">
              <div className="text-yellow-400 text-3xl mb-4">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-800 bg-clip-text text-transparent">We did the hard work for you</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stop Wasting designing portfolio from scratch.Our generator gives you beautiful, responsive layouts inspired by top brands-ready to customixe and deploy instantly.
              </p>
            </div>

            {/* Card 2: Tailored to your style */}
            <div className="bg-black p-6 rounded-xl shadow-lg hover:scale-[1.01] transition-all">
              <div className="text-yellow-400 text-3xl mb-4">
                <i className="fa-solid fa-sliders"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Tailored to your style</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Choose from dark themes. gradient sccents, and interactive card layout. Whether you're designer, develpoer,or student, your portfolio will reflect your unique identity.
              </p>
            </div>

            {/* Card 3: Launch-ready in minutes */}
            <div className="bg-black p-6 rounded-xl shadow-lg hover:scale-[1.01] transition-all">
              <div className="text-yellow-400 text-3xl mb-4">
                <i className="fa-solid fa-rocket"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Launch-ready in minutes</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No setup headaches.Just plug in your content, preview your layout, and publish, Our generator handles the structure, responsiveness, and polish-so you can focus on your work.
              </p>
            </div>
          </div>
         
          {/* 2. RIGHT COLUMN (Video Placeholder) - We make this the second child */}
          <div className="w-full lg:w-1/3 mt-10 lg:mt-40 lg:ml-20 flex items-center justify-center">
            <div className="relative w-full aspect-video p-4 bg-gradient-to-br from-pink-600 to-purple-800 rounded-3xl shadow-2xl">
             <video
              ref={mainVideoRef}
src="/videos/my-portfolio-video.mp4"
              loop
              muted
              playsInline
              autoPlay
              className="absolute inset-4 rounded-2xl w-full h-full object-cover transition-all duration-300 hover:scale-[1.05] hover:-translate-x-3 hover:-translate-y-3" 
></video>
            </div>
          </div>
        </div>
      </div>

     <div className="w-full bg-[#0a0a0a] text-white px-10 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Why Video Works for SaaS Portfolio?
      </h2>

      <p className="text-gray-400 leading-relaxed text-lg mb-16 max-w-2xl mx-auto text-center">
        Video content builds trust, educate users, and drives engagment like no other format.
        SaaS businesses are embracing video to Showcase product value, onboard users,  and convert leads faster.
      </p>

      
      <div className="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-center">
        <div>
          <h3 className="bg-gradient-to-r from-green-300 to-teal-300 text-transparent bg-clip-text text-6xl font-extrabold">
            202%
          </h3>
          <p className="text-xl font-semibold mb-2 text-white">Video Consumption Rate</p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[300px] mx-auto">
            More people are watching videos online than ever before.Consumption has more than doubled since 2018.
          </p>
        </div>

         <div className="text-center relative">
        <div className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 w-px h-40 bg-gray-700">
                  </div>
        

       
            <h3 className="bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text text-6xl font-extrabold ">
                87% 
            </h3>
            <p className="text-xl font-semibold mb-2 text-white">Marketers Report Positive ROI</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[300px] mx-auto">
                Video drives traffic, boost sales, and simplifies education - making it a top-performing content type.
            </p>
        </div>

    </div>
      </div>


  <footer className="relative w-full pt-20 pb-12 bg-black overflow-hidden">

 
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,255,200,0.25)_0%,_rgba(120,0,255,0.25)_40%,_rgba(90,0,50,0.3)_60%,_rgba(0,0,0,1)_100%)] opacity-80"></div>


  <div className="relative z-10 max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-white">

    {/* Brand */}
    <div>
      <h2 className="text-xl font-semibold">Portfolio</h2>
      <p className="text-purple-300">Generator.ai</p>

      <p className="text-gray-400 mt-4 leading-relaxed">
        Build beautiful, modern portfolios instantly with our AI-powered portfolio generator.
      </p>
    </div>

    {/* Company */}
    <div>
      <h3 className="text-gray-300 font-semibold mb-3">Company</h3>
      <ul className="space-y-2 text-gray-400">
        <li className="hover:text-white">Features</li>
        <li className="hover:text-white">Blog</li>
        <li className="hover:text-white">Terms</li>
        <li className="hover:text-white">Privacy</li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-gray-300 font-semibold mb-3">Support</h3>
      <ul className="space-y-2 text-gray-400">
        <li className="hover:text-white">Contact Us</li>
        <li className="hover:text-white">Help Center</li>
      </ul>
    </div>

    {/* About */}
    <div>
      <h3 className="text-gray-300 font-semibold mb-3">About</h3>
      <p className="text-gray-400">
        Powered by <span className="text-purple-300">AI</span>.  
        Create modern portfolios in minutes.
      </p>
    </div>

  </div>
</footer>



      
     




    
    </>
  );
};

export default HomePage;
