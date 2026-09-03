import { Mail, Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
      <h2 className="font-serif text-3xl md:text-5xl text-primary-foreground mb-6">
        Ready to Begin Your Journey?
      </h2>
      <p className="font-sans text-base md:text-lg text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto mb-10">
        Secure your place at the Young Global Leaders Winter Camp at Harvard University.
        <br />
        Limited seats available.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-14">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe8-WcdCzp_QSOaPtic5FHJnDfGqMt36i80LCvfJChPykmvIQ/viewform"
          target="_blank" rel="noopener noreferrer"
          className="px-10 py-4 bg-primary-foreground text-primary font-sans text-sm md:text-base font-semibold rounded-full hover:bg-primary-foreground/90 transition-all duration-300 min-w-[220px]"
        >
          Apply Now
        </a>
        <a
          href="https://calendly.com/learnwithleaders?utm_source=Harvard+Winter+Camp&utm_medium=Harvard+Winter+Camp&utm_id=Harvard+Winter+Camp"
          target="_blank" rel="noopener noreferrer"
          className="px-10 py-4 bg-primary-foreground text-primary font-sans text-sm md:text-base font-semibold rounded-full hover:bg-primary-foreground/90 transition-all duration-300 min-w-[220px]"
        >
          Book a Meeting
        </a>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 mb-10">
        <a href="mailto:team@learnwithleaders.com" className="flex items-center gap-2.5 font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
          <Mail className="w-4 h-4" />
          team@learnwithleaders.com
        </a>
        <a href="https://www.learnwithleaders.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-sans text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
          <Globe className="w-4 h-4" />
          www.learnwithleaders.com
        </a>
      </div>

      <div className="border-t border-primary-foreground/15 pt-6">
        <p className="text-primary-foreground/40 text-xs font-sans">© 2026 Learn with Leaders · All rights reserved</p>
      </div>
    </div>
  </footer>
);

export default Footer;
