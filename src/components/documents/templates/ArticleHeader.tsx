import React from 'react';
import { cn } from '@/lib/utils';

interface ArticleHeaderProps {
  title: string;
  className?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, className }) => {
  return (
    <div className={cn("flex items-center gap-3 mb-1", className)}>
      <div className="w-1.5 h-6 bg-primary rounded-full" />
      <h3 className="font-bold uppercase text-xs text-primary">{title}</h3>
    </div>
  );
};

export default ArticleHeader;
