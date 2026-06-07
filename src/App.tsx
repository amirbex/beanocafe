import React, { useState } from 'react';
import { presentationData } from './data';
import { Accordion } from './components/Accordion';
import { motion, AnimatePresence } from 'motion/react';
import {
  Monitor, Megaphone, Users, Lightbulb, Compass, Clipboard, Star,
  TrendingDown, TrendingUp, BarChart2, Award, Truck, UserCheck, User,
  Menu, X
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  megaphone: Megaphone,
  monitor: Monitor,
  compass: Compass,
  clipboard: Clipboard,
  star: Star,
  'trending-down': TrendingDown,
  'bar-chart-2': BarChart2,
  lightbulb: Lightbulb,
  award: Award,
  'trending-up': TrendingUp,
  truck: Truck,
  'user-check': UserCheck,
  user: User
};

function Section({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section id={id} className={`min-h-[80vh] flex flex-col justify-center py-20 ${className}`}>
      <div className="w-full max-w-6xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'summary', label: 'خلاصه اجرایی' },
    { id: 'current-status', label: 'وضعیت موجود' },
    { id: 'strategic-plan', label: 'اهداف و اقدامات' },
    { id: 'roles', label: 'شرح وظایف' },
    { id: 'timeline', label: 'زمان‌بندی' },
    { id: 'financials', label: 'بخش مالی' }
  ];

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-stone-800 font-sans" dir="rtl">
      {/* HEADER */}
      <header className="sticky top-0 bg-[#fbf9f6]/90 backdrop-blur-md z-40 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="BEANO Cafe Logo" className="h-14 object-contain" />
          </div>
          <div className="hidden lg:flex items-center gap-2">
             {navLinks.map((link) => (
               <a 
                 key={link.id} 
                 href={`#${link.id}`} 
                 className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${activeSection === link.id ? 'bg-[#D3B674] text-white shadow-sm' : 'text-stone-600 hover:bg-stone-100 hover:text-[#46768a]'}`}
               >
                 {link.label}
               </a>
             ))}
          </div>
          <button 
             className="lg:hidden p-2 text-[#46768a] hover:bg-stone-100 rounded-lg transition-colors"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
         {isMenuOpen && (
            <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="lg:hidden bg-white border-b border-stone-200 overflow-hidden sticky top-20 z-30 shadow-lg"
            >
               <div className="flex flex-col p-4 space-y-1">
                 {navLinks.map((link) => (
                   <a 
                     key={link.id} 
                     href={`#${link.id}`} 
                     onClick={() => setIsMenuOpen(false)} 
                     className={`font-medium py-3 px-4 rounded-xl transition-all duration-300 ${activeSection === link.id ? 'bg-[#D3B674] text-white shadow-md' : 'text-stone-600 hover:bg-stone-50'}`}
                   >
                     {link.label}
                   </a>
                 ))}
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <Section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D3B674]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#46768a]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#46768a] mb-6 leading-tight"
          >
            {presentationData.hero.title}
          </motion.h1>
          <motion.h2 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-xl md:text-2xl text-[#D3B674] font-medium max-w-3xl mb-16 leading-relaxed"
          >
            {presentationData.hero.subtitle}
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur border border-stone-200 rounded-3xl p-8 md:p-12 w-full max-w-4xl shadow-xl shadow-stone-200/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-right">
              {presentationData.hero.items.map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-stone-100 pb-4">
                  <span className="text-sm font-semibold text-[#D3B674] mb-2 uppercase tracking-wide">{item.label}</span>
                  <span className="text-lg font-medium text-stone-700">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* EXECUTIVE SUMMARY */}
      <Section id="summary" className="bg-white/50">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
         >
           <h2 className="text-3xl md:text-4xl font-bold text-[#46768a] mb-10 text-center">
             {presentationData.summary.title}
           </h2>
           <div className="space-y-6 text-xl text-stone-600 leading-loose text-justify mb-12">
             {presentationData.summary.paragraphs.map((p, i) => (
               <p key={i}>{p}</p>
             ))}
           </div>
           
           <div className="bg-[#D3B674]/10 border-r-4 border-[#46768a] p-8 rounded-l-2xl">
             <p className="text-xl font-bold text-stone-800 leading-loose text-justify">
               <span className="text-[#46768a] block mb-2">نتیجه مورد انتظار:</span>
               {presentationData.summary.expectedOutcome.replace('نتیجه مورد انتظار:', '')}
             </p>
           </div>
         </motion.div>
      </Section>

      {/* CURRENT STATUS */}
      <Section id="current-status">
         <h2 className="text-3xl md:text-4xl font-bold text-[#46768a] mb-4 text-center">
           {presentationData.currentStatus.title}
         </h2>
         <p className="text-center text-xl text-stone-500 mb-16 max-w-2xl mx-auto">
           {presentationData.currentStatus.subtitle}
         </p>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {presentationData.currentStatus.categories.map((cat, idx) => {
             const Icon = iconMap[cat.icon];
             return (
               <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all">
                 <div className="w-16 h-16 rounded-2xl bg-[#fbf9f6] border border-[#D3B674]/20 flex items-center justify-center mb-6">
                   {Icon && <Icon className="w-8 h-8 text-[#D3B674]" />}
                 </div>
                 <h3 className="text-2xl font-bold text-stone-800 mb-6">{cat.title}</h3>
                 <ul className="space-y-4">
                   {cat.items.map((item, i) => (
                     <li key={i} className="flex items-start gap-3">
                       <span className="w-2.5 h-2.5 rounded-full bg-[#46768a] mt-2.5 shrink-0" />
                       <span className="text-lg text-stone-600 leading-relaxed">{item}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             )
           })}
         </div>
      </Section>

      {/* STRATEGIC PLAN (Accordion) */}
      <Section className="bg-[#46768a] text-white" id="strategic-plan">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D3B674] font-bold tracking-widest uppercase mb-4 block">Strategic Plan</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{presentationData.strategicPlan.subtitle}</h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto text-justify whitespace-pre-line">
              {presentationData.strategicPlan.intro}
            </p>
          </div>

          <div className="space-y-4 mb-16">
            {presentationData.strategicPlan.actions.map((action, idx) => (
              <Accordion key={idx} title={action.title} content={action.content} />
            ))}
          </div>

          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20">
            <p className="text-lg leading-loose text-justify">
              {presentationData.strategicPlan.outro}
            </p>
          </div>
        </div>
      </Section>

      {/* ROLES & RESPONSIBILITIES */}
      <Section id="roles">
         <h2 className="text-3xl md:text-4xl font-bold text-[#46768a] mb-12 text-center">
           {presentationData.roles.title}
         </h2>
         
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
           {presentationData.roles.summaries.map((summary, idx) => {
             const Icon = iconMap[summary.icon];
             return (
               <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm text-center">
                 {Icon && <Icon className="w-10 h-10 text-[#D3B674] mx-auto mb-4" />}
                 <h3 className="text-xl font-bold text-stone-800 mb-2">{summary.title}</h3>
                 <p className="text-sm text-stone-500 leading-relaxed">{summary.desc}</p>
               </div>
             )
           })}
         </div>

         <div className="max-w-4xl mx-auto">
           <h3 className="text-2xl font-bold text-[#46768a] mb-8 text-center">{presentationData.roles.specialized.title}</h3>
           <div className="space-y-4">
             {presentationData.roles.specialized.items.map((item, idx) => (
                <Accordion key={idx} title={item.title} content={item.content} />
             ))}
           </div>
         </div>
      </Section>

      {/* QUALITY CONTROL */}
      <Section className="bg-white/40">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#46768a] mb-4">
            {presentationData.qualityControl.title}
          </h2>
          <p className="text-xl text-stone-500">
            {presentationData.qualityControl.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {presentationData.qualityControl.items.map((item, idx) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mb-6">
                  {Icon && <Icon className="w-6 h-6 text-[#46768a]" />}
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-3">{item.title}</h3>
                <p className="text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section id="timeline">
        <h2 className="text-3xl md:text-4xl font-bold text-[#46768a] mb-16 text-center">
          {presentationData.timeline.title}
        </h2>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute top-0 bottom-0 right-8 md:right-1/2 border-r-2 border-[#D3B674] border-dashed" />
          
          <div className="space-y-12">
            {presentationData.timeline.items.map((item, idx) => (
              <div key={idx} className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute right-8 md:right-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-[#fbf9f6] border-4 border-[#46768a]" />
                
                <div className={`w-full md:w-1/2 pl-16 pr-2 md:px-12 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left text-right'}`}>
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                     <span className="inline-block px-4 py-1.5 rounded-full bg-[#D3B674]/10 text-[#D3B674] font-bold text-sm mb-3">
                       {item.phase}
                     </span>
                     <p className="text-lg text-stone-700 leading-relaxed font-medium">
                       {item.desc}
                     </p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>


      {/* FINANCIALS */}
      <Section id="financials">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-stretch relative">
           <div className="absolute top-10 left-10 w-96 h-96 bg-[#D3B674]/10 rounded-full blur-3xl -z-10" />

           {/* Detailed Breakdown */}
           <div className="w-full md:w-3/5 bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 flex flex-col hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-14 h-14 rounded-2xl bg-[#46768a]/10 flex items-center justify-center">
                    <BarChart2 className="w-7 h-7 text-[#46768a]" />
                 </div>
                 <h2 className="text-3xl font-bold text-[#46768a]">
                   {presentationData.financials.title}
                 </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 flex-1">
                 {presentationData.financials.items.slice(0,3).map((item, idx) => (
                    <div key={idx} className="flex flex-col p-6 rounded-2xl bg-white border border-stone-100 shadow-sm relative overflow-hidden group hover:border-[#46768a]/30 transition-colors">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D3B674] to-[#46768a] opacity-0 group-hover:opacity-100 transition-opacity" />
                       <span className="text-stone-500 font-medium mb-3 relative z-10">{item.label}</span>
                       <div className="flex items-baseline gap-2 text-[#46768a] relative z-10">
                          <span className="text-4xl font-black tracking-tighter">{item.value}</span>
                          <span className="text-lg font-bold">{item.suffix}</span>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#D3B674]/10 to-[#b89c5f]/5 border border-[#D3B674]/30 relative overflow-hidden">
                 <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#D3B674]/20 rounded-full blur-2xl" />
                 <h4 className="font-bold text-[#D3B674] mb-3 text-lg flex items-center gap-2 relative z-10">
                    <Star className="w-5 h-5" />
                    شرایط پرداخت
                 </h4>
                 <p className="text-stone-700 leading-relaxed text-sm md:text-base relative z-10 font-medium">
                    پیش‌پرداخت نقدی: <strong className="bg-[#D3B674]/20 px-2 py-0.5 rounded-md text-[#b89c5f]">۷۵ میلیون تومان</strong> در ابتدای هر ماه (طی ۳ ماه مدت قرارداد).
                 </p>
                 <p className="text-stone-500 text-xs md:text-sm mt-4 pt-4 border-t border-[#D3B674]/20 leading-relaxed text-justify relative z-10">
                    * در شرایط فورس ماژور یا نیازهای ویژه (مانند ایونت‌های اختصاصی)، حضور بیشتر تیم اجرایی و مدیران به صورت رایگان و بدون دریافت هزینه اضافی جهت تضمین موفقیت طرح و حفظ ارزش برند خواهد بود.
                 </p>
              </div>
           </div>

           {/* Total Highlight */}
           <div className="w-full md:w-2/5 bg-gradient-to-br from-[#46768a] to-[#2b4c59] text-white p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D3B674]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D3B674]/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                 <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-[#D3B674] font-bold text-sm mb-8 border border-white/10 backdrop-blur-sm">
                    <Clipboard className="w-4 h-4" />
                    ارزش کل قرارداد
                 </span>
                 <div className="text-7xl font-black mb-4 tracking-tighter drop-shadow-xl text-white">۲۲۵</div>
                 <div className="text-2xl font-medium text-white/90 mb-12">میلیون تومان</div>
                 
                 <div className="w-full border-t border-white/10 pt-8 mt-auto">
                    <span className="block text-white/50 text-sm mb-2 uppercase tracking-widest font-bold">مدت زمان قرارداد</span>
                    <span className="text-2xl font-bold text-[#D3B674]">۳ ماه <span className="text-lg text-white/70 font-normal block mt-1">(قابل تمدید)</span></span>
                 </div>
              </div>
           </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-stone-900 border-t border-stone-800 text-stone-500 py-12 text-center text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-bold tracking-widest uppercase text-stone-400">BEANO CAFE</span>
          <p>طرح جامع توسعه و ارتقا - خرداد ۱۴۰۵</p>
          <p dir="ltr">Strategic Business Plan v2.0</p>
        </div>
      </footer>
    </div>
  );
}
