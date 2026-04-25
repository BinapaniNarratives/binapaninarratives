import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

export type Category = "Business" | "E-commerce" | "Portfolio";

export const projects = [
  { id: "nova-analytics", title: "Nova Analytics", category: "Business" as Category, image: project1, description: "A real-time SaaS analytics dashboard with predictive insights." },
  { id: "lumen-fashion", title: "Lumen Fashion", category: "E-commerce" as Category, image: project2, description: "Premium fashion store with seamless checkout and AR try-on." },
  { id: "pulse-fitness", title: "Pulse Fitness", category: "Business" as Category, image: project3, description: "Mobile-first fitness platform with personalized programs." },
  { id: "atelier-folio", title: "Atelier Folio", category: "Portfolio" as Category, image: project4, description: "Award-winning portfolio for a design studio." },
  { id: "techlune", title: "Techlune", category: "Business" as Category, image: project5, description: "Marketing site for an AI-powered productivity startup." },
  { id: "restorde", title: "Restorde", category: "E-commerce" as Category, image: project6, description: "Booking & ordering platform for premium restaurants." },
];

export const team = [
  { name: "Ava Mitchell", role: "Founder & Creative Director", bio: "12+ years crafting brands that move people. Previously at IDEO and Pentagram.", image: team1 },
  { name: "Daniel Reyes", role: "Lead Engineer", bio: "Full-stack architect obsessed with performance budgets and accessibility.", image: team2 },
  { name: "Sophie Lin", role: "Head of UX", bio: "Researcher and designer turning complex problems into delightful flows.", image: team3 },
];

export const testimonials = [
  { name: "Emma Carter", role: "CEO, Nova Analytics", image: team1, quote: "Binapani Narratives delivered a site that increased our conversions by 184%. The process was smooth and the team is exceptional." },
  { name: "Marcus Chen", role: "Founder, Lumen", image: team2, quote: "Beautiful design, lightning-fast performance, and they truly understood our brand. We couldn't be happier." },
  { name: "Priya Shah", role: "CMO, Pulse Fitness", image: team3, quote: "From strategy to launch in six weeks. Our new platform is the best investment we've made this year." },
];
