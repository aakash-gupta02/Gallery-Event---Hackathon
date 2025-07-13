import { FaUserShield, FaUpload, FaImages, FaThumbsUp, FaComments } from "react-icons/fa";
import { MdAdminPanelSettings, MdSearch } from "react-icons/md";
import { FiMenu, FiX, FiSearch, FiCalendar, FiImage, FiHeart, FiShare2, FiUser, FiLogOut, FiSettings, FiAward, FiUsers, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useRef } from "react";




const FeaturesSection = () => {

  const FeatureRef = useRef(null);


  return (
   <div ref={FeatureRef} className="py-12 bg-bg-muted">
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
  );
};

export default FeaturesSection;
