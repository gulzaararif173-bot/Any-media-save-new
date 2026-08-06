interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`text-center mb-10 ${className}`}>
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}