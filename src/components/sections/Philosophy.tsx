import { SectionHeader } from "../SectionHeader";

export const Philosophy = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-40 pointer-events-none" />
      <div className="container relative">
        <SectionHeader
          eyebrow="The RedLab Philosophy"
          title={<>Edit Like a <span className="text-gradient">Wizard.</span></>}
          description="Rhythm  •  Impact  •  Pacing"
        />

        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            একজন দক্ষ এডিটর শুধু ক্লিপ একটার পর একটা সাজায় না। সে তৈরি করে উত্তেজনা,
            স্বস্তি, ছন্দ আর অনুভূতি। কারণ এডিটিং শুধু টেকনিক্যাল কাজ নয় — এটি এক ধরনের
            ভিজ্যুয়াল গল্প বলার শিল্প।
          </p>

          <figure className="glass rounded-2xl p-8 md:p-10 glow-border">
            <blockquote className="text-xl md:text-2xl font-display italic leading-snug">
              "Editing is not just tools; it's about strategic storytelling and human judgment."
            </blockquote>
            <figcaption className="mt-4 text-sm text-primary-glow font-medium">
              — Rowshan Taieen (Founder)
            </figcaption>
          </figure>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            আমরা তৈরি করছি বাংলাদেশের নেক্সট জেনারেশন ভিডিও এডিটর এবং কন্টেন্ট
            ক্রিয়েটরদের। <span className="text-foreground font-medium">No shortcuts. Only industry standard workflow.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
