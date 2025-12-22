import React from 'react';
import { cn } from '@/lib/utils';

interface ArticleHeaderProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, icon, className }) => {
  return (
    <div className={cn("flex items-center gap-3 mb-1", className)}>
      <div className="w-1.5 h-6 bg-primary rounded-full" />
      {icon}
      <h3 className="font-bold uppercase text-xs text-primary">{title}</h3>
    </div>
  );
};

export default ArticleHeader;
