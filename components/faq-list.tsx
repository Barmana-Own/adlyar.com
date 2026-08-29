'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQList({
  items,
  className = '',
}: {
  items: Array<{ question: string; answer: string }>;
  className?: string;
}) {
  return (
    <Accordion className={`faq-list ${className}`}>
      {items.map((item, index) => (
        <AccordionItem value={`faq-${index}`} key={item.question} className="faq-item">
          <AccordionTrigger className="faq-trigger" aria-controls={`faq-panel-${index}`}>
            <span><i>{String(index + 1).padStart(2, '0')}</i>{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="faq-content" id={`faq-panel-${index}`}>
            <p>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
