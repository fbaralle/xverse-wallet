import { classMerge } from '@/helpers/classMerge';

interface BasicPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const BasicPageWrapper: React.FC<BasicPageWrapperProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={classMerge(
        'min-w-[360px] px-4 pb-3 pt-8',
        'flex min-h-screen flex-col sm:px-[2%] md:px-8 md:pb-3 md:pt-10 lg:px-12 xl:px-[10%] 2xl:px-[15%]',
        className,
      )}
      aria-label="basicPageWrapper"
      suppressHydrationWarning
    >
      <div className="flex w-full max-w-[1350px] flex-1 flex-col items-center self-center">
        {children}
      </div>
    </div>
  );
};
