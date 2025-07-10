import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSearch, FiCalendar, FiImage, FiHeart, FiShare2, FiUser, FiLogOut, FiSettings, FiAward, FiUsers, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const OfficeGalleryLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to see logged out state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      title: "Annual Conference 2023",
      category: "event",
      likes: 124,
      date: "2023-11-15",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Team Building Retreat",
      category: "event",
      likes: 89,
      date: "2023-09-22",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Product Launch",
      category: "event",
      likes: 156,
      date: "2023-07-10",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Office Renovation",
      category: "office",
      likes: 72,
      date: "2023-05-18",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Holiday Party",
      category: "social",
      likes: 203,
      date: "2022-12-15",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "New Team Members",
      category: "people",
      likes: 68,
      date: "2023-03-05",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
  ];

  // Filter gallery items based on active filter
  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      quote: "The Office Gallery has transformed how we document and share our company events. It's become an invaluable part of our culture.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "HR Manager",
      quote: "Our employee engagement has increased significantly since implementing this platform. It helps everyone feel connected.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Team Lead",
      quote: "I love being able to look back at all our team's milestones and achievements. It's like a visual history of our growth.",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-bg-body font-sans text-text-body">
      {/* Navigation */}
      <nav className="bg-bg-surface shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FiImage className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-text-heading">OfficeGallery</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="#" className="border-primary text-text-heading inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-text-body hover:border-gray-300 hover:text-text-heading inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Gallery
                </a>
                <a href="#" className="border-transparent text-text-body hover:border-gray-300 hover:text-text-heading inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Events
                </a>
                <a href="#" className="border-transparent text-text-body hover:border-gray-300 hover:text-text-heading inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-text-inverted bg-primary hover:bg-primary-hover">
                  <FiSearch className="mr-2" />
                  Search
                </button>
              </div>
              {isLoggedIn ? (
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="bg-bg-muted rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="User profile"
                    />
                  </button>
                  
                  {/* Profile dropdown */}
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-bg-surface ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <a href="#" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-muted flex items-center">
                        <FiUser className="mr-2" /> Your Profile
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-muted flex items-center">
                        <FiSettings className="mr-2" /> Settings
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-text-body hover:bg-bg-muted flex items-center">
                        <FiLogOut className="mr-2" /> Sign out
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  <a href="#" className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary border-primary hover:bg-primary-light">
                    Login
                  </a>
                  <a href="#" className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-text-inverted bg-primary hover:bg-primary-hover">
                    Sign Up
                  </a>
                </div>
              )}
              <div className="-mr-2 flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-text-heading hover:bg-bg-muted focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  <FiMenu className="block h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-bg-surface">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiImage className="h-8 w-8 text-primary" />
                  <span className="ml-2 text-xl font-bold text-text-heading">OfficeGallery</span>
                </div>
                <div className="-mr-2">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-text-heading hover:bg-bg-muted focus:outline-none"
                  >
                    <span className="sr-only">Close menu</span>
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <a
                    href="#"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-bg-muted"
                  >
                    <span className="ml-3 text-base font-medium text-text-heading">Home</span>
                  </a>
                  <a
                    href="#"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-bg-muted"
                  >
                    <span className="ml-3 text-base font-medium text-text-heading">Gallery</span>
                  </a>
                  <a
                    href="#"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-bg-muted"
                  >
                    <span className="ml-3 text-base font-medium text-text-heading">Events</span>
                  </a>
                  <a
                    href="#"
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-bg-muted"
                  >
                    <span className="ml-3 text-base font-medium text-text-heading">About</span>
                  </a>
                </nav>
              </div>
              {isLoggedIn ? (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        alt="User profile"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-text-heading">John Doe</div>
                      <div className="text-sm font-medium text-text-muted">john@example.com</div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-1">
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-text-body hover:bg-bg-muted"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-text-body hover:bg-bg-muted"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-text-body hover:bg-bg-muted"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-primary border-primary hover:bg-primary-light"
                    >
                      Login
                    </a>
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-text-inverted bg-primary hover:bg-primary-hover"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-bg-surface sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-text-heading sm:text-5xl md:text-6xl">
                  <span className="block">Capture & Celebrate</span>
                  <span className="block text-primary">Your Office Moments</span>
                </h1>
                <p className="mt-3 text-base text-text-body sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Preserve your company's memories, events, and milestones in one beautiful, organized gallery. Share, relive, and connect through your shared experiences.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-text-inverted bg-primary hover:bg-primary-hover md:py-4 md:text-lg md:px-10"
                    >
                      Explore Gallery
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary-light hover:bg-bg-muted md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
            alt="Office event"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-heading sm:text-4xl">
              A better way to document your workplace
            </p>
            <p className="mt-4 max-w-2xl text-xl text-text-body lg:mx-auto">
              Our platform is designed to help you capture, organize, and share your company's important moments.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-primary">
                  <FiImage className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-text-heading">Beautiful Galleries</h3>
                  <p className="mt-2 text-base text-text-body">
                    Create stunning visual collections of your events, projects, and milestones with our easy-to-use interface.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-primary">
                  <FiUsers className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-text-heading">Team Collaboration</h3>
                  <p className="mt-2 text-base text-text-body">
                    Multiple contributors can upload and organize content, making it a true team effort.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-primary">
                  <FiCalendar className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-text-heading">Event Management</h3>
                  <p className="mt-2 text-base text-text-body">
                    Plan upcoming events and automatically collect photos and videos in dedicated galleries.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-primary">
                  <FiTrendingUp className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-text-heading">Engagement Analytics</h3>
                  <p className="mt-2 text-base text-text-body">
                    See which content resonates most with your team with our built-in engagement metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-12 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Gallery</h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-heading sm:text-4xl">
              Recent Memories
            </h3>
            <p className="mt-4 max-w-2xl text-xl text-text-body mx-auto">
              Browse through our latest events and office moments
            </p>
          </div>

          {/* Filter buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'all' ? 'bg-primary text-text-inverted' : 'bg-bg-muted text-text-body hover:bg-border'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('event')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'event' ? 'bg-primary text-text-inverted' : 'bg-bg-muted text-text-body hover:bg-border'}`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveFilter('office')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'office' ? 'bg-primary text-text-inverted' : 'bg-bg-muted text-text-body hover:bg-border'}`}
            >
              Office
            </button>
            <button
              onClick={() => setActiveFilter('social')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'social' ? 'bg-primary text-text-inverted' : 'bg-bg-muted text-text-body hover:bg-border'}`}
            >
              Social
            </button>
            <button
              onClick={() => setActiveFilter('people')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === 'people' ? 'bg-primary text-text-inverted' : 'bg-bg-muted text-text-body hover:bg-border'}`}
            >
              People
            </button>
          </div>

          {/* Gallery grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative bg-bg-surface rounded-lg overflow-hidden shadow-card hover:shadow-md transition-shadow duration-300">
                <img
                  className="w-full h-60 object-cover"
                  src={item.image}
                  alt={item.title}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-text-heading">{item.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex items-center text-sm text-text-muted">
                      <FiCalendar className="mr-1" />
                      {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="flex items-center text-sm text-text-muted">
                      <FiHeart className="mr-1" />
                      {item.likes}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-primary hover:bg-primary-hover text-text-inverted rounded-full p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <FiShare2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-text-inverted bg-primary hover:bg-primary-hover"
            >
              View All Galleries
              <svg className="ml-3 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-text-inverted sm:text-5xl">1,200+</p>
              <p className="mt-2 text-base font-medium text-primary-light">Events Documented</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-text-inverted sm:text-5xl">15K+</p>
              <p className="mt-2 text-base font-medium text-primary-light">Photos Shared</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-text-inverted sm:text-5xl">500+</p>
              <p className="mt-2 text-base font-medium text-primary-light">Happy Teams</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-text-inverted sm:text-5xl">24/7</p>
              <p className="mt-2 text-base font-medium text-primary-light">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-12 bg-bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Testimonials</h2>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-heading sm:text-4xl">
              What our users say
            </h3>
          </div>

          <div className="mt-10 relative overflow-hidden">
            <div className="relative h-80">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <div className="h-full flex items-center justify-center">
                    <div className="max-w-md mx-auto bg-bg-surface rounded-xl shadow-card overflow-hidden md:max-w-2xl p-8">
                      <div className="flex items-center">
                        <img className="h-16 w-16 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                        <div className="ml-4">
                          <div className="text-lg font-medium text-text-heading">{testimonial.name}</div>
                          <div className="text-text-muted">{testimonial.role}</div>
                        </div>
                      </div>
                      <blockquote className="mt-4">
                        <p className="text-lg text-text-body">"{testimonial.quote}"</p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-border'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-bg-surface">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-text-heading sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-primary">Start documenting your office memories today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-text-inverted bg-primary hover:bg-primary-hover"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-bg-surface hover:bg-bg-muted"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">FAQs</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-heading sm:text-4xl">
              Frequently asked questions
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
              <div>
                <dt className="text-lg leading-6 font-medium text-text-heading">
                  How do I upload photos to the gallery?
                </dt>
                <dd className="mt-2 text-base text-text-body">
                  You can upload photos directly through our web interface or mobile app. Simply navigate to the desired gallery and click the "Upload" button. Our system supports batch uploads for convenience.
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-text-heading">
                  Can I control who sees my content?
                </dt>
                <dd className="mt-2 text-base text-text-body">
                  Absolutely! We offer granular privacy controls. You can set galleries to be public, private, or visible only to specific teams or individuals within your organization.
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-text-heading">
                  Is there a limit to how much I can upload?
                </dt>
                <dd className="mt-2 text-base text-text-body">
                  Our basic plan includes 50GB of storage, with options to upgrade if needed. We also offer unlimited storage on our enterprise plan for larger organizations.
                </dd>
              </div>

              <div>
                <dt className="text-lg leading-6 font-medium text-text-heading">
                  How secure is my data?
                </dt>
                <dd className="mt-2 text-base text-text-body">
                  Security is our top priority. All data is encrypted both in transit and at rest. We use industry-standard protocols and regularly audit our systems to ensure your data remains safe.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-bg-surface">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-text-heading tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-heading tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-heading tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-heading tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-text-body hover:text-primary">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:order-2 space-x-6">
                <a href="#" className="text-text-muted hover:text-text-body">
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-text-muted hover:text-text-body">
                  <span className="sr-only">Twitter</span>
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-text-muted hover:text-text-body">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-text-muted hover:text-text-body">
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="h-6 w-6" />
                </a>
              </div>
              <div className="mt-8 md:mt-0 md:order-1">
                <p className="text-center text-base text-text-muted">
                  &copy; {new Date().getFullYear()} OfficeGallery. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OfficeGalleryLanding;