'use client';

import React from 'react';

interface PolicyPageProps {
  title: string;
  content: React.ReactNode;
}

const PolicyPage = ({ title, content }: PolicyPageProps) => {
  return (
    <div className="flex-grow pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-12 text-center">
        {title}
      </h1>
      
      <div className="text-[#123149] space-y-8 text-lg leading-relaxed
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-primary [&>h2]:mt-12 [&>h2]:mb-4
        [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-primary [&>h3]:mt-8 [&>h3]:mb-3
        [&>p]:mb-6
        [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-3 [&>ul]:mb-6
        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-3 [&>ol]:mb-6
      ">
        {content}
      </div>
    </div>
  );
};

export default PolicyPage;
