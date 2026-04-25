import { Sparkles, Map, Box, Type, Cpu, Film } from "lucide-react";
import { SectionHeader } from "../SectionHeader";

export const services = [
  {
    icon: Sparkles,
    title: "After Effects Mastery",
    badge: "Core",
    description: "বেসিক টুলস নয়, শিখবেন ইন্ডাস্ট্রি স্ট্যান্ডার্ড মোশন গ্রাফিক্স এবং কম্পোজিটিং।",
  },
  {
    icon: Map,
    title: "Cinematic Map Animation",
    badge: "Exclusive",
    description: "Geolayers ব্যবহার করে ইন্টারন্যাশনাল লেভেলের ম্যাপ এনিমেশন টেকনিক।",
  },
  {
    icon: Box,
    title: "Advanced 3D & Tracking",
    badge: "Pro",
    description: "Camera tracking, 3D space, এবং Roto brush-এর মতো অ্যাডভান্সড ফিচার।",
  },
  {
    icon: Type,
    title: "Kinetic Typography",
    badge: "Viral",
    description: "ভিউয়ার রিটেনশন বাড়াতে স্ক্রিনজুড়ে ডাইনামিক টেক্সট এনিমেশনের ব্যবহার।",
  },
  {
    icon: Cpu,
    title: "AI Integrated Workflow",
    badge: "Modern",
    description: "AI টুলস ব্যবহার করে প্রোডাকশন টাইম কমিয়ে আনুন এবং আউটপুট বাড়ান।",
  },
  {
    icon: Film,
    title: "Visual Storytelling",
    badge: "Strategic",
    description: "স্ক্রিপ্ট থেকে ফাইনাল কাট—কিভাবে একটি স্টোরিলাইন বিল্ড করতে হয়।",
  },
];

export const Services = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Curriculum Pillars"
          title={<>What Makes Us <span className="text-gradient">Different?</span></>}
          description="Six pillars that turn beginners into industry-ready editors."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative glass rounded-2xl p-7 glow-border transition-all hover:-translate-y-1 hover:shadow-elegant"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                  <s.icon size={22} className="text-primary-foreground" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider glass text-primary-glow">
                  {s.badge}
                </span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
