import { forwardRef } from "react";

interface ControllerButtonOption {}

type Ref = HTMLButtonElement;
type ControllerButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ControllerButtonOption;

const ControllerButton = forwardRef<Ref, ControllerButtonProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <button ref={ref} className="controller-button" {...rest}>
        {children}
      </button>
    );
  }
);

ControllerButton.displayName = "ControllerButton";

export default ControllerButton;
