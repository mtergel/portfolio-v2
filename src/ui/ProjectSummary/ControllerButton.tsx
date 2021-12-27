import { forwardRef } from "react";

interface ControllerButtonOption {
  label: string;
}

type Ref = HTMLButtonElement;
type ControllerButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ControllerButtonOption;

const ControllerButton = forwardRef<Ref, ControllerButtonProps>(
  (props, ref) => {
    const { className, label, children, ...rest } = props;

    return (
      <button ref={ref} className="controller-button" {...rest}>
        {children}

        <span className="controls-label">{label}</span>
      </button>
    );
  }
);

ControllerButton.displayName = "ControllerButton";

export default ControllerButton;
