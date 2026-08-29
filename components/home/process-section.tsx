'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, FileCheck2, Sparkles } from 'lucide-react';

import { processSteps } from '@/lib/home-data';

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeStep = processSteps[activeIndex];
  const ActiveIcon = activeStep.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.stepIndex);
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: '-20% 0px -38% 0px' },
    );

    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-heading section-heading--light" data-reveal>
          <span className="section-kicker">فرایند قابل فهم، از ابتدا تا خروجی</span>
          <h2>از مسئله تا شروع خدمت</h2>
          <p>
            هر مرحله یک تصمیم روشن دارد؛ بدون پرش میان واحدها و بدون نیاز به دانستن
            اصطلاحات تخصصی.
          </p>
        </div>

        <div className="process-layout">
          <ol className="process-list">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === activeIndex;
              const isComplete = index < activeIndex;
              return (
                <li
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  data-step-index={index}
                  className={
                    'process-step' +
                    (isActive ? ' is-active' : '') +
                    (isComplete ? ' is-complete' : '')
                  }
                  key={step.number}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span className="process-step__node">
                      {isComplete ? <Check aria-hidden="true" /> : step.number}
                    </span>
                    <span className="process-step__copy">
                      <small>مرحله {step.number}</small>
                      <strong>{step.title}</strong>
                      <span>{step.description}</span>
                    </span>
                    <ChevronLeft className="process-step__arrow" aria-hidden="true" />
                  </button>
                  <div className="process-step__mobile-visual">
                    <StepIcon aria-hidden="true" />
                    <span>{step.visual}</span>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="process-visual-wrap">
            <div className="process-visual">
              <div className="process-visual__top">
                <span>
                  <Sparkles aria-hidden="true" />
                  مسیر درخواست
                </span>
                <small>
                  مرحله {activeStep.number} از ۰۸
                </small>
              </div>

              <div className="process-visual__orbit" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>

              <div className="process-visual__card" key={activeIndex}>
                <div className="process-visual__icon">
                  <ActiveIcon aria-hidden="true" />
                </div>
                <span>مرحله فعال</span>
                <strong>{activeStep.title}</strong>
                <p>{activeStep.visual}</p>
              </div>

              <div className="process-visual__document" aria-hidden="true">
                <FileCheck2 />
                <span />
                <span />
                <span />
              </div>

              <div className="process-visual__progress">
                <span>پیشرفت فرایند</span>
                <div>
                  <i style={{ transform: `scaleX(${(activeIndex + 1) / processSteps.length})` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
