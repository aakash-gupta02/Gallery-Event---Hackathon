import { FaUserTie, FaUserGraduate, FaChalkboardTeacher, FaUserCog, FaImage, FaSearch, FaUserShield, FaUserCircle } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-bg-body py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Project Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-text-heading sm:text-5xl mb-4">
            Digital Office Event Gallery Platform
          </h1>
          <div className="bg-primary-light rounded-lg p-4 inline-block">
            <p className="text-text-body font-medium">
              Complexity: LOW | Timeline: 10 Days
            </p>
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-bg-surface rounded-lg shadow-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-text-heading mb-4">Project Background</h2>
          <p className="text-text-body mb-4">
            Organizations frequently host events that create lasting memories, but these moments are often scattered across various platforms. 
            Our solution provides a centralized, structured platform where employees can upload, browse, and celebrate their office events together.
          </p>
          
          <h2 className="text-2xl font-bold text-text-heading mt-6 mb-4">Key Objectives</h2>
          <ul className="list-disc pl-5 space-y-2 text-text-body">
            <li>Create a secure digital gallery for office events</li>
            <li>Enable authenticated media uploads and categorization</li>
            <li>Provide interactive features like liking and commenting</li>
            <li>Offer admin tools for content moderation</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="bg-bg-surface rounded-lg shadow-card overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-text-heading mb-6 flex items-center">
              <FaUserGraduate className="mr-2 text-primary" />
              Development Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Member 1 */}
              <div className="flex items-start space-x-4 p-4 hover:bg-bg-muted rounded-lg transition">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FaUserCog className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text-heading">Aakash Gupta</h3>
                  <p className="text-text-muted">Full Stack Developer</p>
                  <p className="mt-2 text-sm text-text-body">
                    <span className="font-semibold">Contributions:</span> Frontend development, Authentication system, UI/UX implementation
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="flex items-start space-x-4 p-4 hover:bg-bg-muted rounded-lg transition">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FaUserCog className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text-heading">Roshan Prajapati</h3>
                  <p className="text-text-muted">Backend Developer</p>
                  <p className="mt-2 text-sm text-text-body">
                    <span className="font-semibold">Contributions:</span> Server architecture, MySQL database, API development
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mentors Section */}
          <div className="border-t border-border p-8">
            <h2 className="text-2xl font-bold text-text-heading mb-6 flex items-center">
              <FaUserTie className="mr-2 text-primary" />
              Mentors & Support
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 hover:bg-bg-muted rounded-lg transition">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FaChalkboardTeacher className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text-heading">Mr. Ajay Swankar</h3>
                  <p className="text-text-muted">Faculty Mentor</p>
                  <p className="mt-2 text-sm text-text-body">
                    Provided technical guidance and project oversight
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 hover:bg-bg-muted rounded-lg transition">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary-light flex items-center justify-center">
                  <FaUserTie className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-text-heading">Ms. Rupali Pawar</h3>
                  <p className="text-text-muted">Center Manager</p>
                  <p className="mt-2 text-sm text-text-body">
                    Facilitated resources and institutional support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-bg-surface rounded-lg shadow-card overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-text-heading mb-6">Platform Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Functional Requirements */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-heading mb-4 flex items-center">
                  <FaUserCircle className="mr-2 text-primary" />
                  Functional Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                    <span className="text-text-body">User Authentication (Register/Login with admin permissions)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                    <span className="text-text-body">Event Media Upload (Create events, upload images/videos with tags)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                    <span className="text-text-body">Gallery Display (Event-wise albums, search/sort functionality)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                    <span className="text-text-body">Admin Panel (Content approval, deletion, moderation)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">5</span>
                    <span className="text-text-body">User Profiles (Personal uploads, liked events, activity tracking)</span>
                  </li>
                </ul>
              </div>

              {/* Non-Functional Requirements */}
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-text-heading mb-4 flex items-center">
                  <FaUserShield className="mr-2 text-primary" />
                  Technical Details
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                    <span className="text-text-body">Mobile-friendly responsive UI</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                    <span className="text-text-body">MySQL database implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                    <span className="text-text-body">Secure image storage and privacy controls</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
                    <span className="text-text-body">Performance optimization for scalability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary text-text-inverted rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">5</span>
                    <span className="text-text-body">Authentication-only content visibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="border-t border-border bg-bg-muted p-8">
            <h2 className="text-2xl font-bold text-text-heading mb-4">Project Deliverables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="list-disc pl-5 space-y-2 text-text-body">
                <li>Fully functional web application</li>
                <li>MySQL database schema</li>
                <li>GitHub repository with README</li>
              </ul>
              <ul className="list-disc pl-5 space-y-2 text-text-body">
                <li>Sample event albums for demonstration</li>
                <li>Project presentation/video demo</li>
                <li>Complete documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;