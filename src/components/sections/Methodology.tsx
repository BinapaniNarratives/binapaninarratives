import { FolderOpen, GraduationCap, MessageSquare, Zap } from "lucide-react";
import { SectionHeader } from "../SectionHeader";

const items = [
  {
    icon: FolderOpen,
    title: "Project-Based Learning",
    description:
      "ইউটিউবে শুধু টুলস পাওয়া যায়, আমরা আপনাকে দেবো রিয়েল ইন্ডাস্ট্রি প্রজেক্ট ফাইলস।",
  },
  {
    icon: GraduationCap,
    title: "Deep-Learning Module",
    description:
      "প্রিমিয়ার প্রো এবং আফটার ইফেক্টস-এর প্রতিটি টেকনিক হাতে-কলমে শেখানো হবে।",
  },
  {
    icon: MessageSquare,
    title: "Direct Feedback",
    description:
      "আপনার করা এডিটিং-এ মেন্টর সরাসরি ভুল ধরিয়ে দেবেন এবং কারেকশন করাবেন।",
  },
  {
    icon: Zap,
    title: "AI Optimization",
    description:
      "কিভাবে AI টুলস ব্যবহার করে আপনার এডিটিং স্পিড ৫ গুণ বাড়িয়ে দেবেন।",
  },
];

export const Methodology = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <SectionHeader
          eyebrow="Our Methodology"
          title={<>We Don't Just Teach, <br /><span className="text-gradient">We Train.</span></>}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {items.map((m) => (
            <div
              key={m.title}
              className="glass rounded-2xl p-6 glow-border transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary mb-4 shadow-glow">
                <m.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <figure className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-4 left-6 text-7xl font-display text-primary-glow/20 leading-none">
              "
            </div>
            <blockquote className="relative text-xl md:text-2xl font-display leading-snug pt-6">
              সফটওয়্যার জাস্ট একটা টুল।<br />
              মূল বিষয় হলো <span className="text-gradient">স্টোরিটেলিং</span>।
            </blockquote>
            <figcaption className="mt-6 text-sm text-primary-glow font-medium">
              — RedLab Training Principle
            </figcaption>
          </figure>

          <div className="glass rounded-2xl p-8 md:p-10 flex flex-col justify-center">
            <div className="text-5xl font-display font-bold text-gradient mb-4">01</div>
            <p className="text-lg md:text-xl font-display leading-snug">
              আমাদের ফোকাস শুধু এডিটিং না,<br />
              বরং <span className="text-gradient">প্রফেশনাল মেন্টালিটি</span> বিল্ড করা।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
