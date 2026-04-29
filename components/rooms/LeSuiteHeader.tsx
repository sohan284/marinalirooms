'use client';

import EditableText from '../common/EditableText';

interface LeSuiteHeaderProps {
  lang: string;
  data?: any;
  isEditable?: boolean;
}

export default function LeSuiteHeader({
  lang,
  data,
  isEditable = false
}: LeSuiteHeaderProps) {

  const fallbacks: Record<string, any> = {
    en: {
      title: "Le Suite",
      subtitle: "Bassano del Grappa, Italy"
    },
    it: {
      title: "Le Suite",
      subtitle: "Bassano del Grappa, Italia"
    },
    de: {
      title: "Le Suite",
      subtitle: "Bassano del Grappa, Italien"
    }
  };

  const currentFallbacks = fallbacks[lang] || fallbacks.en;

  return (
    <div className="bg-primary text-background py-12 lg:py-20 px-5 text-center">
      <h2 className="text-5xl md:text-7xl font-primary mb-6 tracking-tight">
        {isEditable ? (
          <EditableText
            lang={lang}
            page="home"
            path="leSuiteTitle"
            initialValue={data?.leSuiteTitle || currentFallbacks.title}
          />
        ) : (
          data?.leSuiteTitle || currentFallbacks.title
        )}
      </h2>
      <p className="font-mono text-xs tracking-[0.3em] uppercase text-secondary">
        {isEditable ? (
          <EditableText
            lang={lang}
            page="home"
            path="leSuiteSubtitle"
            initialValue={data?.leSuiteSubtitle || currentFallbacks.subtitle}
          />
        ) : (
          data?.leSuiteSubtitle || currentFallbacks.subtitle
        )}
      </p>
    </div>
  );
}
