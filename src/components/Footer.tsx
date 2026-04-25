import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 mt-32">
      <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none" />
      <div className="container relative py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Crafting digital experiences that convert visitors into customers.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg glass flex items-center justify-center hover:shadow-glow hover:-translate-y-0.5 transition-all"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition">About</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-foreground transition">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Web Design</li>
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>E-commerce</li>
              <li>SEO Optimization</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Get in touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail size={14} /> hello@pixelcraft.studio</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +1 (555) 014‑2099</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /> 221B Design Ave, San Francisco</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Binapani Narratives. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">Privacy</a>
            <a href="#" className="hover:text-foreground transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
