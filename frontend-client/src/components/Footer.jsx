import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-bg-surface border-t border-border py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-text-heading mb-2">Office Gallery</h3>
          <p className="text-text-body">
            Celebrate your team, culture, and events — visually and socially.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-md font-semibold text-text-heading mb-2">Quick Links</h4>
          <ul className="space-y-1 text-text-muted">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li><a href="/events" className="hover:text-primary">Events</a></li>
            <li><a href="/upload" className="hover:text-primary">Upload</a></li>
            <li><a href="/login" className="hover:text-primary">Login</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h4 className="text-md font-semibold text-text-heading mb-2">Connect</h4>
          <div className="flex items-center gap-4 text-text-muted">
            <a href="mailto:contact@officegallery.com" className="hover:text-primary">
              <FaEnvelope size={18} />
            </a>
            <a href="https://github.com/aakash-gupta02" target="_blank" className="hover:text-primary">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-primary">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-text-muted mt-8">
        © {new Date().getFullYear()} Office Gallery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
