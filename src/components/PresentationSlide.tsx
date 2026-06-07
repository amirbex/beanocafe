import { SlideData } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Monitor, Megaphone, Users, UserCog, Settings, Box, PieChart, FileText,
  TrendingUp, Heart, Mail, Calendar, Share2, Compass, Clipboard, Star, Coffee,
  DollarSign, ShoppingBag, CheckCircle, Award, BarChart2, TrendingDown,
  Lightbulb, Truck, ShoppingCart, UserCheck, User, CheckCircle2, ChevronDown
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  "monitor": Monitor,
  "megaphone": Megaphone,
  "users": Users,
  "user-cog": UserCog,
  "settings": Settings,
  "box": Box,
  "pie-chart": PieChart,
  "file-text": FileText,
  "trending-up": TrendingUp,
  "heart": Heart,
  "mail": Mail,
  "calendar": Calendar,
  "share-2": Share2,
  "compass": Compass,
  "clipboard": Clipboard,
  "star": Star,
  "coffee": Coffee,
  "dollar-sign": DollarSign,
  "shopping-bag": ShoppingBag,
  "check-circle": CheckCircle,
  "award": Award,
  "bar-chart-2": BarChart2,
  "trending-down": TrendingDown,
  "lightbulb": Lightbulb,
  "truck": Truck,
  "shopping-cart": ShoppingCart,
  "user-check": UserCheck,
  "user": User
};

function Accordion({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-8 border border-stone-200 rounded-lg bg-white/60 backdrop-blur overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-right cursor-pointer hover:bg-white/80 transition-colors"
      >
        <span className="font-semibold text-lg text-stone-800">{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-stone-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="p-4 pt-0 text-stone-600 leading-relaxed border-t border-stone-100">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PresentationSlide({ slide }: { slide: SlideData }) {
  const renderIcon = (name?: string, className: string = "w-6 h-6 text-[#3b4d3c]") => {
    if (!name) return null;
    const Icon = iconMap[name];
    return Icon ? <Icon className={className} /> : null;
  };

  const renderTitleBlock = () => (
    <div className="w-full mb-8">
      {slide.title && <h2 className="text-3xl md:text-4xl font-bold text-stone-800 tracking-tight leading-loose mb-2">{slide.title}</h2>}
      {slide.subtitle && <h3 className="text-xl text-[#bca37f] font-medium leading-relaxed whitespace-pre-wrap">{slide.subtitle}</h3>}
    </div>
  );

  const renderContent = () => {
    switch (slide.layout) {
      case 'title':
        return (
          <div className="flex flex-col md:flex-row h-full items-center">
            <div className="w-full md:w-1/2 p-6 flex items-center justify-center relative h-64 md:h-full">
               {/* Aesthetic graphic mapping to PDF Cover */}
               <div className="absolute  w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#bca37f]/20 to-transparent blur-xl" />
               <Coffee className="w-32 h-32 text-[#3b4d3c]/80 z-10" strokeWidth={1} />
               <div className="absolute right-10 top-10 border-r-2 border-t-2 border-[#bca37f]/40 w-16 h-16 rounded-tr-3xl" />
               <div className="absolute left-10 bottom-10 border-l-2 border-b-2 border-[#3b4d3c]/40 w-16 h-16 rounded-bl-3xl" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              {renderTitleBlock()}
              <ul className="space-y-4">
                {slide.items?.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3b4d3c]" />
                    <span className="text-lg text-stone-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="flex flex-col h-full justify-center lg:px-12">
            {renderTitleBlock()}
            <div className="space-y-6 text-stone-700 text-lg leading-loose md:w-4/5 text-justify">
              {Array.isArray(slide.content) && slide.content.map((p, idx) => (
                 p.includes("نتیجه مورد انتظار:") ? (
                   <div key={idx} className="bg-[#bca37f]/10 border-r-4 border-[#3b4d3c] p-5 rounded-l-xl font-medium text-stone-800">
                     {p}
                   </div>
                 ) : <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        );

      case 'three-columns':
        return (
          <div className="flex flex-col h-full">
            {renderTitleBlock()}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 flex-1">
              {slide.items?.map((col, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#3b4d3c]/20">
                     {renderIcon(col.icon, "w-8 h-8 text-[#3b4d3c]")}
                     <h4 className="text-xl font-bold text-stone-800">{col.title}</h4>
                  </div>
                  <ul className="space-y-4">
                    {col.list?.map((li, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 mt-2.5 shrink-0 rounded-full bg-[#bca37f]" />
                        <span className="text-stone-600 leading-relaxed">{li}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'grid':
        return (
          <div className="flex flex-col h-full pl-2">
            {renderTitleBlock()}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 overflow-y-auto pb-4 pr-3 custom-scrollbar">
              {slide.items?.map((item, idx) => (
                <div key={idx} className="bg-white/50 p-5 rounded-2xl border border-stone-100 hover:bg-white/80 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#fbf9f6] rounded-xl shrink-0 border border-[#3b4d3c]/10">
                       {renderIcon(item.icon, "w-6 h-6 text-[#bca37f]")}
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-stone-800 mb-1">{item.title}</h4>
                       {item.subtitle && <p className="text-sm font-medium text-stone-500 mb-2">{item.subtitle}</p>}
                       {item.text && <p className="text-sm text-stone-600 leading-relaxed text-justify">{item.text}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="flex flex-col h-full">
             {renderTitleBlock()}
             <div className="flex-1 flex flex-col justify-center items-center py-8">
                <div className="w-full max-w-3xl relative">
                   <div className="hidden md:block absolute right-1/2 top-4 bottom-4 border-r-2 border-[#bca37f]/40 border-dashed" />
                   <div className="space-y-6">
                      {slide.items?.map((item, idx) => (
                         <div key={idx} className={`flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'text-right md:text-left' : 'text-right'}`}>
                               <div className="bg-white/70 p-4 rounded-xl border border-stone-100 shadow-sm">
                                  <h4 className="font-bold text-stone-800">{item.title}</h4>
                                  <p className="text-stone-600 text-sm mt-1 leading-relaxed">{item.text}</p>
                               </div>
                            </div>
                            <div className="hidden md:flex w-2/12 justify-center relative">
                               <div className="w-10 h-10 bg-[#fbf9f6] rounded-full border-2 border-[#3b4d3c] flex items-center justify-center z-10 shadow-sm text-stone-500 font-bold">
                                  {item.id}
                               </div>
                            </div>
                            <div className="hidden md:block w-5/12" />
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        );

      case 'team':
        return (
           <div className="flex flex-col md:flex-row h-full gap-8">
              <div className="w-full md:w-1/3">
                 {renderTitleBlock()}
                 <div className="mt-8 flex flex-col items-center">
                    <div className="w-48 h-48 bg-[#3b4d3c]/5 rounded-full border border-[#3b4d3c]/20 flex items-center justify-center mb-6">
                       <UserCog className="w-24 h-24 text-[#bca37f]" strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-4">{slide.items?.[0].title}</h3>
                    <ul className="space-y-3">
                       {slide.items?.[0].list?.map((li, i) => (
                         <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                           <div className="w-1.5 h-1.5 mt-1.5 shrink-0 rounded-full bg-[#bca37f]" />
                           <span className="leading-relaxed">{li}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
              
              <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-8 md:mt-24">
                 <div className="md:col-span-2 mb-4"><h3 className="text-xl font-bold text-stone-800 border-b border-stone-200 pb-2">اعضای کلیدی تیم</h3></div>
                 {slide.items?.slice(1).map((item, idx) => (
                    <div key={idx} className="bg-white/60 p-5 rounded-2xl flex items-start gap-4">
                       <div className="w-10 h-10 bg-[#3b4d3c]/10 rounded-full flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-[#3b4d3c]" />
                       </div>
                       <div>
                          <h4 className="font-bold text-stone-800">{item.title}</h4>
                          <p className="text-sm text-stone-500 mt-1 leading-relaxed">{item.subtitle}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        );

      case 'financial':
        return (
          <div className="flex flex-col h-full justify-center">
            {renderTitleBlock()}
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
               <div className="md:col-span-4 bg-white/70 p-6 lg:p-10 rounded-3xl border-t-4 border-[#3b4d3c] flex flex-col items-center justify-center shadow-sm">
                  <span className="text-stone-500 font-medium mb-3 text-lg">{slide.stats?.[3]?.sublabel}</span>
                  <div className="flex items-baseline gap-2 text-[#3b4d3c]">
                     <span className="text-5xl lg:text-7xl font-bold">{slide.stats?.[3]?.value}</span>
                     <span className="text-2xl font-medium">{slide.stats?.[3]?.label.replace('تومان کل', '')}</span>
                  </div>
               </div>

               {slide.stats?.slice(0, 3).map((stat, idx) => (
                 <div key={idx} className="bg-white/50 p-6 rounded-2xl border border-stone-100 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-[#bca37f] mb-2">{stat.value}</span>
                    <span className="text-stone-700 font-medium">{stat.label}</span>
                    <span className="text-stone-400 text-sm mt-1">{stat.sublabel}</span>
                 </div>
               ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
               {slide.items?.map((item, idx) => (
                 <div key={idx} className="flex-1 bg-[#3b4d3c] text-white p-6 rounded-2xl">
                    <h4 className="font-bold text-[#bca37f] mb-2 flex items-center gap-2">
                       <CheckCircle2 className="w-5 h-5" />
                       {item.title}
                    </h4>
                    <p className="text-white/80 leading-relaxed text-sm lg:text-base">{item.text}</p>
                 </div>
               ))}
            </div>
          </div>
        );

      default:
        return <div>Unsupported layout</div>;
    }
  };

  return (
    <div className="w-full h-full bg-[#fbf9f6] rounded-3xl overflow-hidden p-6 md:p-10 lg:p-12 shadow-sm border border-stone-200" dir="rtl">
      {renderContent()}
      
      {slide.accordionTitle && slide.accordionContent && (
        <Accordion title={slide.accordionTitle} content={slide.accordionContent} />
      )}
    </div>
  );
}

