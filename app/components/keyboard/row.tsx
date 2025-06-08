import React from "react";
import Button from "./button";
import { ButtonProps } from './button'


/**
 * Props for the keyboard Row component
 */
export interface RowProps {
  buttons: ButtonProps[];
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Keyboard Row component
 */
const Row: React.FC<RowProps> = ({ buttons, onClick }) => {
  return (
    <div className="flex items-center justify-center">
      {buttons.map(
        (button) => (
          <Button
            key={button.label}
            label={button.label}
            status={button.status}
            onClick={onClick}
          />
        )
      )}
    </div>
  );
}

export default Row;