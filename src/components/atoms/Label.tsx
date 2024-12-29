import clsx from "clsx";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {};

const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      className={clsx("block text-sm font-medium mb-1", className)}
      {...props}
    >
      {props.children}
    </label>
  );
};

export default Label;
