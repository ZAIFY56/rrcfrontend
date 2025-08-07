import { cn } from "@/utils";

const Card = ({
  icon,
  title,
  description,
  className = "",
  hoverEffect = true,
  children,
}) => {
  return (
    <div
      className={cn(
        "bg-[#F3F3F3] w-full flex flex-col items-center cursor-pointer max-w-[240px] lg:w-[300px] min-h-[180px] p-4 rounded-xl 2xl:max-w-[342px] 2xl:w-[380px] 2xl:min-h-[200px] transition-all duration-300",
        hoverEffect && "hover:shadow-2xl",
        className
      )}
    >
      {icon && (
        <div className="2xl:w-16 2xl:h-16 h-12 w-12 rounded-full p-2 mb-2 bg-white flex items-center justify-center text-primary text-2xl">
          {typeof icon === "string" ? (
            <img
              src={icon}
              alt={title || "Card icon"}
              className="h-full w-full object-contain"
            />
          ) : (
            icon
          )}
        </div>
      )}

      {title && (
        <h3 className="text-md mt-2 2xl:text-[20px] font-bold text-center mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-gray-700 2xl:text-[18px]  2xl:mx-[3rem] text-center">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default Card;
