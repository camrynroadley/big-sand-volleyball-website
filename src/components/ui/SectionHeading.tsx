interface SectionHeadingProps {
  label: string;
  title: string;
  description: string;
}

const SectionHeading = ({ label, title, description }: SectionHeadingProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-center tracking-tight">
      <div className="text-left">
        <p className="text-sm font-semibold text-[#DF0000] uppercase mb-2">
          {label}
        </p>
        <h2 className="text-5xl font-semibold">{title}</h2>
      </div>
      <div className="text-right text-base text-gray-700">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SectionHeading;
