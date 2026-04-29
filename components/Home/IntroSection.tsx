'use client';

import { motion } from 'framer-motion';

import { ReactNode } from 'react';
import EditableText from '../common/EditableText';

export default function IntroSection({
  title,
  description,
  children,
  data,
  lang = "en",
  isEditable = false,
}: {
  title?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  data?: any;
  lang?: string;
  isEditable?: boolean;
}) {
  const displayTitle = data?.aboutTitle || data?.title || title;
  const displayDescription = data?.aboutDescription || data?.welcomeText || description;

  const fallbacks: Record<string, any> = {
    en: {
      title: "Our Heritage",
      description: "Experience unforgettable hospitality at Marinali Rooms..."
    },
    it: {
      title: "La Nostra Storia",
      description: "Vivi un'ospitalità indimenticabile presso Marinali Rooms..."
    },
    de: {
      title: "Unser Erbe",
      description: "Erleben Sie unvergessliche Gastfreundschaft in den Marinali Rooms..."
    }
  };

  const currentFallbacks = fallbacks[lang] || fallbacks.en;

  return (
    <section
      id="heritage"
      className='px-5 '
      style={{
        margin: '0 auto',
        textAlign: 'left',
        backgroundColor: 'var(--background-color)',
      }}
    >
      <motion.div
        className="max-w-[1000px] mr-auto pt-10 lg:pt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9] }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            lineHeight: 1.4,
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            color: 'var(--foreground)',
          }}
        >
          {isEditable ? (
            <EditableText
              lang={lang}
              page="home"
              path="aboutTitle"
              initialValue={displayTitle as string || currentFallbacks.title}
            />
          ) : (
            displayTitle || currentFallbacks.title
          )}
        </h2>

        <div
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1.05rem)',
            lineHeight: 1.85,
            color: 'var(--foreground)',
            opacity: 0.7,
            fontWeight: 300,
            letterSpacing: '0.01em',
            marginBottom: '20px',
          }}
        >
          {isEditable ? (
            <EditableText
              lang={lang}
              page="home"
              path="aboutDescription"
              initialValue={displayDescription as string || currentFallbacks.description}
              multiline
            />
          ) : (
            displayDescription || currentFallbacks.description
          )}
        </div>
      </motion.div>

      <hr
        style={{
          border: 'none',
          borderTop: '2px solid var(--primary-color)',
          opacity: 0.1,
          marginTop: '50px',
        }}
      />
      {children && (
        <div className="mt-16 w-full max-w-[1200px] mx-auto">
          {children}
        </div>
      )}
    </section>
  );
}
