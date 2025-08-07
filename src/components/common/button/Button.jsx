const Button = ({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-md transition-colors duration-200 flex items-center justify-center";

  const variantClasses = {
    primary:
      "w-[160px] md:w-[171px] md:h-[48px]  rounded-lg bg-primary text-white hover:bg-primary pt-[12px] pb-[12px] pr-[28px] pl-[24px] gap-[10px] opacity-100",
    outline:
      "px-6 py-3 bg-white text-primary border-2 border-primary hover:bg-[#f0f9f9]",
    icon: "gap-2 bg-primary text-white p-4 hover:bg-primary",
    link: "2xl:w-[125px] 2xl:h-[24px] text-yellow-500 hover:text-yellow-600 px-0 py-0 bg-transparent border-none",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
