
interface ProgramInfoTextProps {
    label: string;
    info: string;
}

const ProgramInfoText = ({ label, info }: ProgramInfoTextProps) => {
    return (
        <>
            <p className="text-sm text-[#750000] font-semibold">{label}</p>
            <p className="text-lg mb-4">{info}</p>
        </>
    )
}

export default ProgramInfoText;
