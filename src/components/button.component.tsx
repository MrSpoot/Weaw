const ButtonComponent: React.FC<{ text: string; onClick?: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <>
      <div
        className="flex h-14 w-full bg-[#fa7268] hover:bg-[#ef5f67] rounded-xl items-center justify-center"
        onClick={onClick}
      >
        <span>{text}</span>
      </div>
    </>
  );
};

export default ButtonComponent;
