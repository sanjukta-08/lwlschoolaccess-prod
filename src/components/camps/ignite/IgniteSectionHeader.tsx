import { cn } from '@/lib/utils';

interface IgniteSectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const IgniteSectionHeader = ({ children, className }: IgniteSectionHeaderProps) => {
  return (
    <div className={cn("bg-[#8B1538] py-3 px-6 rounded-sm inline-block mb-8", className)}>
      <h2 className="font-georgia font-bold text-white text-xl md:text-2xl lg:text-3xl uppercase tracking-wide">
        {children}
      </h2>
    </div>
  );
};
