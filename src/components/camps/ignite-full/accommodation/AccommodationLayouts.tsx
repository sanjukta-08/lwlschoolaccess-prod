import { motion } from "framer-motion";
import { accomData as D } from "./accomData";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

/* Reusable body block (shared across most layouts) */
const Body = ({ compact = false }: { compact?: boolean }) => (
  <div className={compact ? "space-y-4" : "space-y-5"}>
    <p className="font-body text-base md:text-lg text-foreground leading-relaxed">{D.lead}</p>
    {D.paras.map((p, i) => (
      <p key={i} className="font-body text-[15px] text-foreground/75 leading-relaxed">{p}</p>
    ))}
    <p className="font-body text-[15px] text-foreground font-semibold">{D.closing}</p>
  </div>
);

const CheckBox = () => (
  <div className="bg-cambridge-cream/60 rounded-sm p-5 border-l-4 border-cambridge-rust">
    <p className="text-[10px] tracking-[0.25em] uppercase font-body font-bold text-cambridge-rust mb-2">Check-in & Check-out</p>
    <p className="font-body text-sm text-foreground">Check-in: <span className="font-bold">{D.checkIn}</span></p>
    <p className="font-body text-sm text-foreground">Check-out: <span className="font-bold">{D.checkOut}</span></p>
  </div>
);

const Features = () => (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {D.features.map((f) => (
      <li key={f.text} className="flex items-center gap-3 p-3 bg-card border border-foreground/10 rounded-sm">
        <div className="w-9 h-9 rounded-sm bg-cambridge-cream flex items-center justify-center shrink-0">
          <f.icon size={16} className="text-cambridge-rust" />
        </div>
        <span className="font-body text-sm text-foreground">{f.text}</span>
      </li>
    ))}
  </ul>
);

/* ============================================================ */
/* 1. CINEMATIC HERO — full-bleed image, title overlaid bottom  */
/* ============================================================ */
export const Accom1Hero = () => (
  <div>
    <div className="relative h-[460px] md:h-[560px] overflow-hidden rounded-sm">
      <img src={D.hero} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <motion.div {...fade} className="absolute bottom-8 left-8 right-8">
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] font-body font-bold text-cambridge-cream mb-3">{D.eyebrow}</p>
        <h2 className="font-display font-bold text-white leading-[0.95]" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
          {D.title1} <span className="italic text-cambridge-rust">{D.title2}</span>
        </h2>
      </motion.div>
    </div>
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 mt-12">
      <div><Body /><div className="mt-6"><CheckBox /></div></div>
      <div><img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm mb-6" /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 2. SPLIT VERTICAL — half image, half headline                */
/* ============================================================ */
export const Accom2Split = () => (
  <div>
    <div className="grid lg:grid-cols-2 rounded-sm overflow-hidden bg-cambridge-cream/50">
      <div className="relative min-h-[420px]">
        <img src={D.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <motion.div {...fade} className="p-8 md:p-12 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.4em] font-body font-bold text-cambridge-rust mb-4">{D.eyebrow}</p>
        <h2 className="font-display font-bold text-foreground leading-[0.95] mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          {D.title1}<br /><span className="italic text-cambridge-rust">{D.title2}</span>
        </h2>
        <p className="font-body text-sm text-foreground/65 tracking-[0.15em] uppercase">{D.address}</p>
      </motion.div>
    </div>
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 mt-12">
      <div><Body /><div className="mt-6"><CheckBox /></div></div>
      <div><img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm mb-6" /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 3. MAGAZINE MASTHEAD — huge top type, image below            */
/* ============================================================ */
export const Accom3Masthead = () => (
  <div>
    <motion.div {...fade} className="text-center pb-8 border-b-2 border-foreground">
      <p className="text-xs uppercase tracking-[0.5em] font-body font-bold text-cambridge-rust mb-3">Est. 1326 · {D.eyebrow}</p>
      <h2 className="font-display font-bold text-foreground leading-[0.85] tracking-[-0.03em]" style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}>
        {D.title2}
      </h2>
      <p className="font-display italic text-foreground/60 text-lg mt-3">{D.title1.toLowerCase()} the second-oldest college at Cambridge</p>
    </motion.div>
    <div className="grid lg:grid-cols-3 gap-6 mt-8">
      <img src={D.hero} alt="" className="lg:col-span-2 w-full aspect-[16/10] object-cover rounded-sm" />
      <img src={D.room} alt="" className="w-full aspect-[16/10] lg:aspect-auto object-cover rounded-sm" />
    </div>
    <div className="grid lg:grid-cols-2 gap-10 mt-12">
      <Body />
      <div className="space-y-5"><CheckBox /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 4. CENTERED EDITORIAL — quiet, centered, image figure below  */
/* ============================================================ */
export const Accom4Centered = () => (
  <div>
    <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-10">
      <p className="text-xs uppercase tracking-[0.4em] font-body font-bold text-cambridge-rust mb-4">{D.eyebrow}</p>
      <h2 className="font-display font-bold text-foreground leading-[0.95]" style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}>
        {D.title1} <span className="italic text-cambridge-rust">{D.title2}</span>
      </h2>
      <div className="h-px w-20 bg-cambridge-rust/60 mx-auto my-6" />
      <p className="font-display italic text-foreground/70 text-lg md:text-xl leading-snug">"{D.lead}"</p>
    </motion.div>
    <img src={D.hero} alt="" className="w-full aspect-[21/9] object-cover rounded-sm mb-12" />
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
      <div className="space-y-5">
        {D.paras.map((p, i) => <p key={i} className="font-body text-[15px] text-foreground/75 leading-relaxed">{p}</p>)}
        <p className="font-body text-foreground font-semibold">{D.closing}</p>
        <CheckBox />
      </div>
      <div><img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm mb-6" /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 5. ASYMMETRIC FRAME — image with rust frame, headline beside */
/* ============================================================ */
export const Accom5Asymmetric = () => (
  <div>
    <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
      <motion.div {...fade} className="lg:col-span-5 lg:order-2">
        <p className="text-xs uppercase tracking-[0.4em] font-body font-bold text-cambridge-rust mb-3">{D.eyebrow} · Est. 1326</p>
        <h2 className="font-display font-bold text-foreground leading-[0.9]" style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}>
          {D.title1}<br /><span className="italic text-cambridge-rust">{D.title2}</span>
        </h2>
        <p className="font-body text-sm text-foreground/60 mt-4 tracking-[0.1em] uppercase">{D.address}</p>
      </motion.div>
      <div className="lg:col-span-7 lg:order-1 relative">
        <div className="absolute -inset-3 border-2 border-cambridge-rust rounded-sm hidden md:block" />
        <img src={D.hero} alt="" className="relative w-full aspect-[4/3] object-cover rounded-sm" />
      </div>
    </div>
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
      <div><Body /><div className="mt-6"><CheckBox /></div></div>
      <div><img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm mb-6" /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 6. DIPTYCH — two images stacked with text strip between      */
/* ============================================================ */
export const Accom6Diptych = () => (
  <div>
    <div className="grid md:grid-cols-2 gap-2 mb-1">
      <img src={D.hero} alt="" className="w-full aspect-[4/3] object-cover rounded-sm" />
      <img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm" />
    </div>
    <motion.div {...fade} className="bg-cambridge-rust text-white px-6 md:px-10 py-8 md:py-10 my-2 rounded-sm">
      <div className="grid md:grid-cols-[auto_1fr] gap-6 items-center">
        <p className="text-xs uppercase tracking-[0.4em] font-body font-bold text-cambridge-cream">{D.eyebrow}</p>
        <h2 className="font-display font-bold leading-[0.95]" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
          {D.title1} <span className="italic">{D.title2}</span>
        </h2>
      </div>
    </motion.div>
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 mt-8">
      <Body />
      <div className="space-y-5"><CheckBox /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 7. STAMP HEADER — rust badge + serif headline + image strip  */
/* ============================================================ */
export const Accom7Stamp = () => (
  <div>
    <motion.div {...fade} className="flex flex-col md:flex-row md:items-end gap-6 mb-8 pb-6 border-b border-foreground/15">
      <div className="inline-flex items-center justify-center w-32 h-32 border-4 border-cambridge-rust text-cambridge-rust shrink-0 rotate-[-4deg]">
        <div className="text-center">
          <p className="font-display font-bold text-3xl leading-none">1326</p>
          <p className="font-body text-[9px] uppercase tracking-[0.2em] mt-1">Founded</p>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.4em] font-body font-bold text-cambridge-rust mb-3">{D.eyebrow}</p>
        <h2 className="font-display font-bold text-foreground leading-[0.9]" style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}>
          {D.title1} <span className="italic text-cambridge-rust">{D.title2}</span>
        </h2>
        <p className="font-body text-sm text-foreground/60 mt-2 tracking-[0.1em] uppercase">{D.address}</p>
      </div>
    </motion.div>
    <div className="grid grid-cols-3 gap-2 mb-12">
      <img src={D.hero} alt="" className="aspect-[4/3] object-cover w-full rounded-sm col-span-2" />
      <img src={D.room} alt="" className="aspect-[4/3] object-cover w-full rounded-sm" />
    </div>
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
      <Body />
      <div className="space-y-5"><CheckBox /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 8. POSTCARD TAG — rotated tag overlaid on photo              */
/* ============================================================ */
export const Accom8Postcard = () => (
  <div>
    <div className="relative h-[440px] md:h-[520px] rounded-sm overflow-hidden mb-12 bg-cambridge-cream">
      <img src={D.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <motion.div {...fade} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-8 md:p-10 max-w-md text-center shadow-prestigious rotate-[-2deg]">
        <p className="text-[10px] uppercase tracking-[0.4em] font-body font-bold text-cambridge-rust mb-3">{D.eyebrow}</p>
        <h2 className="font-display font-bold text-foreground leading-[0.95] mb-4" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}>
          {D.title1} <span className="italic text-cambridge-rust">{D.title2}</span>
        </h2>
        <div className="h-px w-12 bg-cambridge-rust mx-auto mb-3" />
        <p className="font-body text-xs uppercase tracking-[0.2em] text-foreground/65">Cambridge · Est. 1326</p>
      </motion.div>
    </div>
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
      <div><Body /><div className="mt-6"><CheckBox /></div></div>
      <div><img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm mb-6" /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 9. TYPE-FIRST — giant typography, image as figure caption    */
/* ============================================================ */
export const Accom9TypeFirst = () => (
  <div>
    <motion.div {...fade} className="grid lg:grid-cols-12 gap-6 items-end mb-10 pb-8 border-b border-foreground/15">
      <div className="lg:col-span-8">
        <p className="text-xs uppercase tracking-[0.5em] font-body font-bold text-cambridge-rust mb-3">{D.eyebrow}</p>
        <h2 className="font-display font-bold text-foreground leading-[0.82] tracking-[-0.04em]" style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}>
          {D.title2.split(" ")[0]}<span className="text-cambridge-rust">.</span>
        </h2>
        <h3 className="font-display not-italic text-foreground/70 leading-tight mt-2" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
          {D.title1} the second-oldest college at Cambridge
        </h3>
      </div>
      <div className="lg:col-span-4">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-foreground/50 mb-2">Address</p>
        <p className="font-display text-base text-foreground/80 leading-snug">{D.address}</p>
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-cambridge-rust mt-4 font-bold">Founded 1326</p>
      </div>
    </motion.div>
    <div className="grid lg:grid-cols-2 gap-4 mb-12">
      <figure>
        <img src={D.hero} alt="" className="w-full aspect-[4/3] object-cover rounded-sm" />
        <figcaption className="font-body italic text-xs text-foreground/55 mt-2">Old Court & Memorial Court along the River Cam.</figcaption>
      </figure>
      <figure>
        <img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm" />
        <figcaption className="font-body italic text-xs text-foreground/55 mt-2">A fully furnished single occupancy room.</figcaption>
      </figure>
    </div>
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
      <Body />
      <div className="space-y-5"><CheckBox /><Features /></div>
    </div>
  </div>
);

/* ============================================================ */
/* 10. DUOTONE COVER — matches schedule cover style             */
/* ============================================================ */
export const Accom10Duotone = () => (
  <div>
    <div className="relative rounded-sm overflow-hidden min-h-[480px] mb-12">
      <img src={D.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <motion.div {...fade} className="relative p-8 md:p-12 min-h-[480px] flex flex-col justify-end max-w-2xl">
        <p className="text-sm md:text-base uppercase tracking-[0.4em] font-body font-bold text-cambridge-cream mb-4">{D.eyebrow} · Est. 1326</p>
        <h2 className="font-display font-bold text-white leading-[0.9] tracking-[-0.02em] mb-3" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          {D.title1} <span className="italic">{D.title2}</span>
        </h2>
        <p className="font-body text-cambridge-cream/90 text-sm tracking-[0.15em] uppercase">{D.address}</p>
      </motion.div>
    </div>
    <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
      <div><Body /><div className="mt-6"><CheckBox /></div></div>
      <div><img src={D.room} alt="" className="w-full aspect-[4/3] object-cover rounded-sm mb-6" /><Features /></div>
    </div>
  </div>
);
