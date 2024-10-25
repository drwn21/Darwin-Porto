import React, { useEffect, useState, useRef } from 'react';
import Starfield from 'react-starfield';

const TypingAnimationWithNavbar: React.FC = () => {
  const [displayedName, setDisplayedName] = useState<string>('');
  const [displayedTitle, setDisplayedTitle] = useState<string>('');
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('#home');

  const projectsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  
  const fullName = 'DARWIN ANATHAPINDIKA';
  const fullTitle = "I'm a Fullstack Developer";
  const typingSpeed = 150;
  const eraseSpeed = 75;
  const pauseDuration = 2000;

  useEffect(() => {
    let nameIndex = 0;
    let titleIndex = 0;
    let isTyping = true;
    let isTypingName = true;
    let timeoutId: NodeJS.Timeout;

    const animateText = () => {
      if (isTyping) {
        if (isTypingName) {
          if (nameIndex < fullName.length) {
            setDisplayedName(fullName.slice(0, nameIndex + 1));
            nameIndex++;
            timeoutId = setTimeout(animateText, typingSpeed);
          } else {
            isTypingName = false;
            timeoutId = setTimeout(animateText, pauseDuration);
          }
        } else {
          if (titleIndex < fullTitle.length) {
            setDisplayedTitle(fullTitle.slice(0, titleIndex + 1));
            titleIndex++;
            timeoutId = setTimeout(animateText, typingSpeed);
          } else {
            isTyping = false;
            timeoutId = setTimeout(animateText, pauseDuration);
          }
        }
      } else {
        if (!isTypingName) {
          if (titleIndex > 0) {
            setDisplayedTitle(fullTitle.slice(0, titleIndex - 1));
            titleIndex--;
            timeoutId = setTimeout(animateText, eraseSpeed);
          } else {
            isTypingName = true;
            timeoutId = setTimeout(animateText, pauseDuration);
          }
        } else {
          if (nameIndex > 0) {
            setDisplayedName(fullName.slice(0, nameIndex - 1));
            nameIndex--;
            timeoutId = setTimeout(animateText, eraseSpeed);
          } else {
            isTyping = true;
            isTypingName = true;
            timeoutId = setTimeout(animateText, pauseDuration);
          }
        }
      }
    };

    animateText();

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show navbar when scrolled past the home section
      setShowNavbar(scrollPosition > windowHeight * 0.9);
      
      // Update active section based on scroll position
      const sections = ['#home', '#projects', '#about'];
      const currentSection = sections.find(section => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 50 && rect.bottom >= 550;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger the handleScroll function on initial load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <header className={`fixed z-10 top-0 left-0 right-0 transition-all duration-300 ${showNavbar ? 'opacity-80 ' : 'opacity-0 pointer-events-none'}`}>
        <nav className="container mx-auto px-6 py-4 bg-black shadow-lg text-xl font-monaco font-medium pr-24">
          <ul className="flex justify-end space-x-12">
            <li>
              <a 
                href="#home" 
                className={`relative hover:text-white transition-all duration-300 ${activeSection === '#home' ? 'text-white' : 'text-gray-300'}`}
              >
                Home
                {/* Animated underline */}
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transition-transform duration-300 transform ${activeSection === '#home' ? 'scale-x-100' : 'scale-x-0'} hover:scale-x-100`}></span>
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className={`relative hover:text-white transition-all duration-300 ${activeSection === '#projects' ? 'text-white' : 'text-gray-300'}`}
              >
                Projects
                {/* Animated underline */}
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transition-transform duration-300 transform ${activeSection === '#projects' ? 'scale-x-100' : 'scale-x-0'} hover:scale-x-100`}></span>
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`relative hover:text-white transition-all duration-300 ${activeSection === '#about' ? 'text-white' : 'text-gray-300'}`}
              >
                About Me
                {/* Animated underline */}
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transition-transform duration-300 transform ${activeSection === '#about' ? 'scale-x-100' : 'scale-x-0'} hover:scale-x-100`}></span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-pixel mb-4 font-thin">
              {displayedName}
              {displayedName && <span className="inline-block w-0.5 h-8 bg-white animate-blink ml-1"></span>}
            </h1>
            <br />
            <h2 className="text-3xl font-monaco font-thin">
              {displayedTitle}
              {displayedTitle && <span className="inline-block w-0.5 h-6 bg-white animate-blink ml-1"></span>}
            </h2>
          </div>
        </section>

        <section id="projects" ref={projectsRef} className="min-h-screen flex flex-col items-center py-20 bg-black">
          <h2 className="text-3xl mb-12 font-pixel font-medium">PROJECTS</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 px-20 py-5">
            {/*First Project*/}
            
            <article className="card relative overflow-hidden rounded-[0.625rem] shadow-lg 
                    w-full w-[24.875rem] h-[28.125rem] 
                    filter grayscale hover:grayscale-0 
                    group hover:scale-105 
                    transition-all duration-500 ease-in-out">                
              <img
                  className="card__background absolute inset-0 object-cover w-full h-full group-hover:scale-130 transition-transform duration-500 ease-in"
                  src="/src/images/jcc-mockup.jpg"
                  alt="Jockey's Conference Center"
                  width="1920"
                  height="2193"
              />
              <div className="card__content absolute inset-x-0 bottom-0 h-[58%] flex flex-col justify-between p-5 pb-7 bg-gradient-to-t from-black via-black/30 to-transparent transform translate-y-[62%] group-hover:translate-y-0 transition-transform duration-500 ease-out group-hover:ease-in">
                  <div className="space-y-2">
                      <h2 className="font-worksans card__title relative text-2xl font-bold font-title text-white inline-block after:content-[''] after:absolute after:h-[0.3125rem] after:w-[calc(100%+1.25rem)] after:-bottom-3 after:-left-5 after:bg-brand after:opacity-0 after:scale-x-0 after:origin-right group-hover:after:opacity-100 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-all after:duration-500 after:ease-out group-hover:after:ease-in">Jockey Conference Center</h2>
                      <p className="text-sm text-justify card__description font-worksans text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                          This project involves designing a website for renting ballrooms at Jockey's Conference Center. The site includes pages such as HomePage, Event, and Pricelist, as well as a Submission Form for renters to submit their personal information.
                      </p>
                      <p className="font-semibold font-worksans text-sm text-justify card__description font-worksans text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000 ">Role : Fullstack Developer</p>
                      <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                          <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                  <polyline points="13 2 13 9 20 9"></polyline>
                              </svg>
                              <span className="text-white text-sm">HTML</span>
                          </div>
                          <div className="flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"></path>
                                  <path d="M4 6h16"></path>
                                  <path d="M4 10h16"></path>
                                  <path d="M4 14h16"></path>
                                  <path d="M4 18h16"></path>
                              </svg>
                              <span className="text-white text-sm">CSS</span>
                          </div>
                      </div>
                  </div>
              </div>
          </article>
            

            {/* Second Project */}
            <article className="card relative overflow-hidden rounded-[0.625rem] shadow-lg 
                    w-full w-[24.875rem] h-[28.125rem] 
                    filter grayscale hover:grayscale-0 
                    group hover:scale-105 
                    transition-all duration-500 ease-in-out">                
              <img
                className="card__background absolute inset-0 object-cover w-full h-full group-hover:scale-130 transition-transform duration-500 ease-in"
                src="/src/images/dooit-2-mockup.jpg"
                alt="DOOIT"
                width="1920"
                height="2193"
              />
              <div className="card__content absolute inset-x-0 bottom-0 h-[63%] flex flex-col justify-between p-5 pb-7 bg-gradient-to-t from-black via-black/30 to-transparent transform translate-y-[62%] group-hover:translate-y-0 transition-transform duration-500 ease-out group-hover:ease-in">
                <div className="space-y-2">
                  <a 
                    href="https://aol-se-1bcc3.web.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h2 className="card__title relative text-2xl font-bold font-worksans font-title text-white inline-block after:content-[''] after:absolute after:h-[0.3125rem] after:w-[calc(100%+1.25rem)] after:-bottom-3 after:-left-5 after:bg-brand after:opacity-0 after:scale-x-0 after:origin-right group-hover:after:opacity-100 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-all after:duration-500 after:ease-out group-hover:after:ease-in">
                      DOOIT
                    </h2>
                  </a>
                  <p className="card__description font-worksans text-justify text-sm text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    DOOIT is a platform offering modules in Finance, Entrepreneurship, and Self-Improvement. Subscribers gain access to E-Books from renowned authors. 
                    The site also features a forum for users to share insights on topics like money and time management.
                    
                  </p>
                  <p className='font-semibold font-worksans text-sm text-justify card__description font-worksans text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000'>Role : Backend Developer</p>
                  
                  <div className="flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    {/* React Logo */}
                    <div className="w-6 h-6">
                      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB">
                        <circle cx="0" cy="0" r="2.05" />
                        <g stroke="#61DAFB" strokeWidth="1" fill="none">
                          <ellipse rx="11" ry="4.2" />
                          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                      </svg>
                    </div>
                    
                    {/* Firebase Logo */}
                    <div className="w-6 h-8">
                      <svg viewBox="0 0 32 32">
                        <path
                          d="M19.62 11.558l-3.203 2.98-2.972-5.995 1.538-3.448c.4-.7 1.024-.692 1.414 0z"
                          fill="#FFA000"
                        />
                        <path
                          d="M13.445 8.543l2.972 5.995-11.97 11.135z"
                          fill="#F57F17"
                        />
                        <path
                          d="M23.123 7.003c.572-.55 1.164-.362 1.315.417l3.116 18.105-10.328 6.2c-.36.2-1.32.286-1.32.286s-.874-.104-1.207-.3L4.447 25.673z"
                          fill="#FFCA28"
                        />
                        <path
                          d="M13.445 8.543l-8.997 17.13L8.455.638c.148-.78.592-.855.988-.167z"
                          fill="#FFA000"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Third Project */}
            <article className="card relative overflow-hidden rounded-[0.625rem] shadow-lg 
                    w-full w-[24.875rem] h-[28.125rem] 
                    filter grayscale hover:grayscale-0 
                    group hover:scale-105 
                    transition-all duration-500 ease-in-out">                
                  <img
                  className="card__background absolute inset-0 object-cover w-full h-full group-hover:scale-130 transition-transform duration-500 ease-in"
                  src="/src/images/summe-mockup.jpg"
                  alt="SumMe"
                  width="1920"
                  height="2193"
                />
                <div className="card__content absolute inset-x-0 bottom-0 h-[68%] flex flex-col justify-between p-5 pb-7 bg-gradient-to-t from-black via-black/30 to-transparent transform translate-y-[62%] group-hover:translate-y-0 transition-transform duration-500 ease-out group-hover:ease-in">
                  <div className="space-y-2">
                  <a 
                    href="https://github.com/drwn21/SumMe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h2 className="card__title relative text-2xl font-bold font-worksans font-title text-white inline-block after:content-[''] after:absolute after:h-[0.3125rem] after:w-[calc(100%+1.25rem)] after:-bottom-3 after:-left-5 after:bg-brand after:opacity-0 after:scale-x-0 after:origin-right group-hover:after:opacity-100 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-all after:duration-500 after:ease-out group-hover:after:ease-in">
                      SumMe
                    </h2>
                  </a>
                    
                    <p className="text-sm text-justify card__description font-text text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    Sum-Me is an application designed to summarize lengthy texts or materials into concise, easily understandable versions. After the text is summarized, users have the option to translate it into a language of their choice. Additionally, 
                    the app includes a camera feature for scanning books, and users can also upload files, such as PDFs, to be summarized.
                    </p>
                    <p className="card__description font-worksans text-justify font-semibold text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">Role : Frontend Developer</p>
                  <div className="pl-1 flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="4" r="4" fill="#F24E1E"/>
                    <circle cx="12" cy="12" r="4" fill="#A259FF"/>
                    <circle cx="12" cy="20" r="4" fill="#1ABCFE"/>
                    <circle cx="4" cy="12" r="4" fill="#0ACF83"/>
                    <circle cx="20" cy="12" r="4" fill="#FF7262"/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 255">
                  <defs>
                    <linearGradient id="gradient-1" x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%">
                      <stop offset="0%" stop-color="#387EB8"/>
                      <stop offset="100%" stop-color="#366994"/>
                    </linearGradient>
                    <linearGradient id="gradient-2" x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%">
                      <stop offset="0%" stop-color="#FFE052"/>
                      <stop offset="100%" stop-color="#FFC331"/>
                    </linearGradient>
                  </defs>
                  <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#gradient-1)"/>
                  <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#gradient-2)"/>
                </svg>
                </div>
                  </div>
                </div>
              </article>

          </div>
          
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 px-20 pt-20">
            {/*Fourth Project*/}
            <div>
            <article className="card relative overflow-hidden rounded-[0.625rem] shadow-lg 
                    w-full w-[24.875rem] h-[28.125rem] 
                    filter grayscale hover:grayscale-0 
                    group hover:scale-105 
                    transition-all duration-500 ease-in-out">                
                  <img
                  className="card__background absolute inset-0 object-cover w-full h-full group-hover:scale-130 transition-transform duration-500 ease-in"
                  src="/src/images/wastenot-mockup.jpg"
                  alt="WasteNot"
                  width="1920"
                  height="2193"
                />
                <div className="card__content absolute inset-x-0 bottom-0 h-[75%] flex flex-col justify-between p-5 pb-7 bg-gradient-to-t from-black via-black/30 to-transparent transform translate-y-[62%] group-hover:translate-y-0 transition-transform duration-500 ease-out group-hover:ease-in">
                  <div className="space-y-2">
                    <h2 className="card__title relative text-2xl font-bold font-title text-white inline-block after:content-[''] after:absolute after:h-[0.3125rem] after:w-[calc(100%+1.25rem)] after:-bottom-3 after:-left-5 after:bg-brand after:opacity-0 after:scale-x-0 after:origin-right group-hover:after:opacity-100 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-all after:duration-500 after:ease-out group-hover:after:ease-in">WasteNot</h2>
                    <p className="text-sm text-justify card__description font-text text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    WasteNot is a website that helps restaurants manage leftover food or ingredients that are still usable but would 
                    otherwise be thrown away. We act as a bridge, connecting restaurants with organizations or individuals who can use these leftovers. 
                    Based on SDG's number 2 our goal is to reduce Food Hunger and promote sustainability by ensuring surplus food finds a purpose instead of being wasted.
                    </p>
                    <p className="card__description font-worksans text-justify font-semibold text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">Role : Frontend Developer</p>
                    <div className="pl-1 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    <svg 
                      viewBox="0 0 50 52" 
                      width="24" height="24"
                      aria-label="Laravel Logo"
                    >
                      <path 
                        d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-21.483L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z" 
                        className="fill-[#FF2D20]"
                      />
                    </svg>
                    <div className="w-12 h-12 pt-3">
                      <img src="/src/images/php-icon.png" alt="" />
                    </div>
                    <svg 
                    viewBox="0 0 256 154" 
                    width="24" height="24"
                    aria-label="Tailwind CSS Logo"  
                  >
                    <defs>
                      <linearGradient id="tailwind-gradient" x1="-2.778%" y1="32%" x2="100%" y2="67.556%">
                        <stop stopColor="#2298BD" offset="0%"/>
                        <stop stopColor="#0ED7B5" offset="100%"/>
                      </linearGradient>
                    </defs>
                    <path 
                      d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z" 
                      fill="url(#tailwind-gradient)"
                    />
                  </svg>
                </div>
                  </div>
                </div>
              </article>
            </div>

            {/*Fifth Project */}
            <div>
            <article className="card relative overflow-hidden rounded-[0.625rem] shadow-lg 
                    w-full w-[24.875rem] h-[28.125rem] 
                    filter grayscale hover:grayscale-0 
                    group hover:scale-105 
                    transition-all duration-500 ease-in-out">                
                  <img
                  className="card__background absolute inset-0 object-cover w-full h-full group-hover:scale-130 transition-transform duration-500 ease-in"
                  src="/src/images/planease.jpg"
                  alt="PlanEase"
                  width="1920"
                  height="2193"
                />
                <div className="card__content absolute inset-x-0 bottom-0 h-[78%] flex flex-col justify-between p-5 pb-7 bg-gradient-to-t from-black via-black/30 to-transparent transform translate-y-[62%] group-hover:translate-y-0 transition-transform duration-500 ease-out group-hover:ease-in">
                  <div className="space-y-2">
                    <a 
                      href="https://www.planease.xyz/home" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h2 className="card__title relative text-2xl font-bold font-worksans font-title text-white inline-block after:content-[''] after:absolute after:h-[0.3125rem] after:w-[calc(100%+1.25rem)] after:-bottom-3 after:-left-5 after:bg-brand after:opacity-0 after:scale-x-0 after:origin-right group-hover:after:opacity-100 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-all after:duration-500 after:ease-out group-hover:after:ease-in">
                        PlanEase
                      </h2>
                    </a>
                    <p className="text-sm text-justify card__description font-text text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    PlanEase is an automatic task planner developed to assist individuals who face difficulties in organizing their schedules. The platform is designed to address common issues such as missed deadlines due to poor time management and the stress caused by overwhelming workloads. By offering a streamlined approach to task planning, 
                    PlanEase helps users prioritize their tasks efficiently, ensuring timely submissions and reducing stress levels associated with heavy workloads.
                    </p>
                    <p className="card__description font-worksans text-justify font-semibold text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">Role : Frontend Developer</p>
                    <div className="flex items-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    {/* React Logo */}
                    <div className="w-6 h-6">
                      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB">
                        <circle cx="0" cy="0" r="2.05" />
                        <g stroke="#61DAFB" strokeWidth="1" fill="none">
                          <ellipse rx="11" ry="4.2" />
                          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                        </g>
                      </svg>
                    </div>
                    
                    {/* Firebase Logo */}
                    <div className="w-6 h-8">
                      <svg viewBox="0 0 32 32">
                        <path
                          d="M19.62 11.558l-3.203 2.98-2.972-5.995 1.538-3.448c.4-.7 1.024-.692 1.414 0z"
                          fill="#FFA000"
                        />
                        <path
                          d="M13.445 8.543l2.972 5.995-11.97 11.135z"
                          fill="#F57F17"
                        />
                        <path
                          d="M23.123 7.003c.572-.55 1.164-.362 1.315.417l3.116 18.105-10.328 6.2c-.36.2-1.32.286-1.32.286s-.874-.104-1.207-.3L4.447 25.673z"
                          fill="#FFCA28"
                        />
                        <path
                          d="M13.445 8.543l-8.997 17.13L8.455.638c.148-.78.592-.855.988-.167z"
                          fill="#FFA000"
                        />
                      </svg>
                    </div>
                  </div>
                    
                  </div>
                </div>
              </article>
            </div>

            {/*Sixth Project */}
            <div>
            <article className="card relative overflow-hidden rounded-[0.625rem] shadow-lg 
                    w-full w-[24.875rem] h-[28.125rem] 
                    filter grayscale hover:grayscale-0 
                    group hover:scale-105 
                    transition-all duration-500 ease-in-out">                
                  <img
                  className="card__background absolute inset-0 object-cover w-full h-full group-hover:scale-130 transition-transform duration-500 ease-in"
                  src="/src/images/comingsoon.jpg"
                  alt="Coming Soon"
                  width="1920"
                  height="2193"
                />
                <div className="card__content absolute inset-x-0 bottom-0 h-[42%] flex flex-col justify-between p-5 pb-7 bg-gradient-to-t from-black via-black/30 to-transparent transform translate-y-[62%] group-hover:translate-y-0 transition-transform duration-500 ease-out group-hover:ease-in">
                  <div className="space-y-2 flex flex-col text-center">
                    <h2 className="text-center card__title relative text-2xl font-bold font-title text-white inline-block after:content-[''] after:absolute after:h-[0.3125rem] after:w-[calc(100%+1.25rem)] after:-bottom-3 after:-left-5 after:bg-brand after:opacity-0 after:scale-x-0 after:origin-right group-hover:after:opacity-100 group-hover:after:scale-x-100 group-hover:after:origin-left after:transition-all after:duration-500 after:ease-out group-hover:after:ease-in">Coming Soon...</h2>
                    <p className="card__description font-text text-base leading-relaxed text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:delay-1000">
                    </p>
                    
                  </div>
                </div>
              </article>
            </div>

          </div>
        </section>
      
        
        <section id="about" ref={aboutRef} className="min-h-screen bg-black text-white py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-pixel">ABOUT ME</h2>
          </div>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="px-56 pt-5">
            <article className="card w-[80vw] max-w-[32vw] h-[32vw] relative overflow-hidden rounded-xl shadow-lg group hover:scale-105 transition-transform duration-500 ease-in">
              <img
                className="card__background absolute inset-0 object-cover w-full h-full group-hover:scale-130 transition-transform duration-500 ease-in"
                src="/src/images/Foto2.jpg"
                alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                width="1920"
                height="2193"
              />
              <div className="card relative w-[80vw] max-w-[32vw] h-[32vw] overflow-hidden rounded-lg shadow-lg group">
                <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-pixel text-white text-2xl pt-72 group-hover:opacity-0 transition-opacity duration-300 text-shadow-lg-gray">
                    CONTACT ME
                  </span>
                </div>
                <div className="card__content pt-80 absolute inset-0 flex flex-col justify-center items-center p-5 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="card__icons flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    <a href="https://www.linkedin.com/in/darwin-anathapindika-8230b2241" className="rounded-xl socialContainer w-[52px] h-[52px] bg-[#2c2c2c] flex items-center justify-center overflow-hidden transition duration-300 hover:bg-[#0072b1] active:scale-90">
                      <svg className="socialSvg w-[17px] fill-white group-hover:animate-slide-in-top" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
                    </a>
                    
                    <a href="https://github.com/drwn21?tab=repositories" className="rounded-xl socialContainer w-[52px] h-[52px] bg-[#2c2c2c] flex items-center justify-center overflow-hidden transition duration-300 hover:bg-[#171515] active:scale-90">
                      <svg className="socialSvg w-[17px] fill-white group-hover:animate-slide-in-top" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                    </a>

                    <a href="https://www.instagram.com/darwinanatha_/?next=%2F" className="rounded-xl socialContainer w-[52px] h-[52px] bg-[#2c2c2c] flex items-center justify-center overflow-hidden transition duration-300 hover:bg-[#E4405F] active:scale-90">
                      <svg className="socialSvg w-[17px] fill-white group-hover:animate-slide-in-top" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                    </a>

                    <a href="https://www.facebook.com/darwin.anathapindika" className="rounded-xl socialContainer w-[52px] h-[52px] bg-[#2c2c2c] flex items-center justify-center overflow-hidden transition duration-300 hover:bg-[#1877F2] active:scale-90">
                      <svg className="socialSvg w-[17px] fill-white group-hover:animate-slide-in-top" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>
           </div>
            <div className="text-left px-4">
              <p className="text-xl leading-relaxed font-monaco pt-5 text-justify pr-56 ">
              I am a student majoring in Computer Science at BINUS University. I have created several websites and acted as a Front End and Backend Developer.
              <br />
              <br />
              I am able to work well together in a team and it has been proven that several of the projects I have created were projects carried out in a team.
              <br />
              <br />
              I can think creatively and also wisely in making decisions in important situations. I also master several programming languages.
              </p>
              <br />
            </div>
          </div>
    </section>
    </main>
    <footer className="bg-gradient-to-b from-black to-neutral-900	text-white">
     
      <div className="max-w-7xl align-center mx-auto pb-8 pt-8">        
          <div className=" text-center space-y-3">
            <h3 className="text-xl font-semibold text-white font-worksans">MY PORTOFOLIO</h3>
          </div>                 
      </div>
      <div className="border-gray-800">
        <div className="mx-auto px-4 pb-6">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Darwin Anathapindika. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default TypingAnimationWithNavbar;
