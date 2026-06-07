import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  content: string;
}

export function Accordion({ title, content }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-stone-200 rounded-xl bg-white/70 backdrop-blur overflow-hidden mb-4 shadow-sm hover:shadow-md transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 lg:p-6 text-right cursor-pointer hover:bg-white transition-colors"
      >
        <span className="font-bold text-lg text-stone-800">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#f6f4ee] p-2 rounded-full text-[#46768a]"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-5 lg:p-6 pt-0 text-stone-600 leading-loose text-justify border-t border-stone-100">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
