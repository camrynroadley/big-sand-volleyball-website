interface ProgramInfoTextProps {
  label: string;
  info: string;
}

const ProgramInfoText = ({ label, info }: ProgramInfoTextProps) => {
  return (
    <div className="border rounded-sm p-6 mb-4">
      <p className="text-sm text-[#DF0000] font-semibold tracking-tight">{label}</p>
      <p className="text-lg tracking-tight">{info}</p>
    </div>
  );
};

export default ProgramInfoText;
