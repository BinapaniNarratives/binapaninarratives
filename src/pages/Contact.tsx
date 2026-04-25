import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <Layout>
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-60 -z-10" />
        <div className="container text-center max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium glass mb-4 text-primary-glow">Contact</span>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            Let's start <span className="text-gradient">something great</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a project in mind? Send us a note and we'll get back within 24 hours.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 glass rounded-2xl p-8 md:p-10">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="jane@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="New website project" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required rows={6} placeholder="Tell us about your project, goals, and timeline…" />
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Sending…" : <>Send message <Send size={16} /></>}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl p-7 space-y-4">
              <h3 className="font-display font-semibold text-lg">Reach us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center"><Mail size={14} className="text-primary-foreground" /></span>
                  hello@pixelcraft.studio
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center"><Phone size={14} className="text-primary-foreground" /></span>
                  +1 (555) 014‑2099
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center"><MapPin size={14} className="text-primary-foreground" /></span>
                  221B Design Ave, San Francisco
                </li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-7">
              <h3 className="font-display font-semibold text-lg mb-4">Follow us</h3>
              <div className="flex gap-3">
                {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="h-10 w-10 rounded-lg glass flex items-center justify-center hover:shadow-glow hover:-translate-y-0.5 transition-all" aria-label="Social link">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl overflow-hidden h-64">
              <iframe
                title="Binapani Narratives location"
                src="https://www.google.com/maps?q=San+Francisco&output=embed"
                className="w-full h-full grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
