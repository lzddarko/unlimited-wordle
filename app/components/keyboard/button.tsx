import React from "react";


/**
 * Props for the keyboard Button component
 */
export interface ButtonProps {
  label: string;
  status: 'correct' | 'wrong place' | 'incorrect' | 'not guessed';
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Keyboard Button component
 */
const Button: React.FC<ButtonProps> = ({ label, status, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        "background": `var(--button-color-${status.replace(' ', '-')})`,
        "borderWidth": (status === 'not guessed' ? '2px' : ''),
        "width": ['enter', 'delete'].includes(label) ? '70px' : '45px',
        "fontSize": ['enter', 'delete'].includes(label) ? '12px' : '20px'
      }}
      className="h-[60] m-[2.5px] flex items-center justify-center select-none
                 uppercase font-bold cursor-pointer border-none
                 rounded-md hover:opacity-80"
    >
      {label}
    </div >
  );
}

export default Button;