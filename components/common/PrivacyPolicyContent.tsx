import React from 'react';
import policiesData from '@/data/policies.json';

interface PolicyProps {
  lang: 'en' | 'it' | 'de';
}

export default function PrivacyPolicyContent({ lang }: PolicyProps) {
  const data = (policiesData.privacy as any)[lang] || (policiesData.privacy as any).en;

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-primary font-bold text-center text-3xl md:text-4xl mb-8">
        {data.title}
      </h1>
      <div className="text-primary/90 space-y-8 text-lg leading-relaxed text-left
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-primary [&_h2]:mt-12 [&_h2]:mb-4
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-primary [&_h3]:mt-8 [&_h3]:mb-3
        [&_p]:mb-6
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-3 [&_ul]:mb-6
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-3 [&_ol]:mb-6
      ">
        <p className="text-sm opacity-60 italic">{data.lastUpdated}</p>
        {data.sections.map((sec: any, i: number) => (
          <React.Fragment key={i}>
            <h2>{sec.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: sec.content }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
