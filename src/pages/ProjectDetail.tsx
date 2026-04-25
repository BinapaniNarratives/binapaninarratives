import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/site";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const idx = projects.findIndex((p) => p.id === id);
  const next = projects[(idx + 1) % projects.length];

  if (!project) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Project not found</h1>
          <Button asChild variant="hero"><Link to="/portfolio">Back to portfolio</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-60 -z-10" />
        <div className="container">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition">
            <ArrowLeft size={16} /> All projects
          </Link>
          <div className="max-w-3xl">
            <p className="text-primary-glow text-sm font-medium mb-3">{project.category}</p>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-5">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="rounded-3xl overflow-hidden glass shadow-elegant">
            <img src={project.image} alt={project.title} width={1920} height={1080} className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Client</h3>
            <p className="font-medium">{project.title}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Services</h3>
            <ul className="space-y-1">
              {["UI/UX Design", "Web Development", "SEO Optimization"].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-primary-glow" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-3">Results</h3>
            <p className="text-2xl font-display font-bold text-gradient">+184% conversion</p>
            <p className="text-sm text-muted-foreground mt-1">within 90 days of launch</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="glass rounded-2xl p-8 md:p-10 prose prose-invert max-w-none">
            <h2 className="text-2xl font-display font-bold mb-4">The challenge</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {project.title} came to us with a clear brand vision but a website that didn't reflect their ambition.
              Bounce rates were high and the team needed a faster way to publish new content.
            </p>
            <h2 className="text-2xl font-display font-bold mb-4">Our approach</h2>
            <p className="text-muted-foreground leading-relaxed">
              We rebuilt the site from the ground up with a custom design system, a headless CMS,
              and an obsession with performance. Every interaction was prototyped, tested, and refined.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container flex justify-end">
          <Button asChild variant="glass" size="lg">
            <Link to={`/portfolio/${next.id}`}>Next project: {next.title} <ArrowRight size={16} /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
