const Button = (props) => {
  const { type, className, children } = props;
  return (
    <button
      type={type || ""}
      className={`w-full   rounded-md bg-mariner-950  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
