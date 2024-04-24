const ButtonComponent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <div className="flex h-14 w-full bg-blue-400 rounded-full items-center justify-center">
        <span>{text}</span>
      </div>
    </>
  );
};

export default ButtonComponent;
