import React from "react";
import Row from "./row";
import { RowProps } from "../grid/row";
import { ButtonProps } from "./button";


/**
 * Initial state of the keyboard rows
 */
const INITAL_KEYBOARD_ROWS: { buttons: ButtonProps[] }[] = [
  {
    buttons: 'q,w,e,r,t,y,u,i,o,p'.split(',')
      .map((label) => ({ label, status: 'not guessed' })) as ButtonProps[]
  },
  {
    buttons: 'a,s,d,f,g,h,j,k,l'.split(',')
      .map((label) => ({ label, status: 'not guessed' })) as ButtonProps[]
  },
  {
    buttons: 'enter,z,x,c,v,b,n,m,delete'.split(',')
      .map((label) => ({ label, status: 'not guessed' })) as ButtonProps[]
  },
];

/**
 * Updates keyboard props for the given letter and status.
 */
const updateKeyboard = (
  keyboard: { buttons: ButtonProps[] }[],
  char: string,
  newStatus: string
): { buttons: ButtonProps[] }[] => {
  return keyboard.map((row) => ({
    buttons: row.buttons.map((button) =>
      button.label === char
        ? { ...button, status: newStatus }
        : button
    )
  })) as { buttons: ButtonProps[] }[];
}

/**
 * Props for the Keyboard component
 */
export interface KeyboardProps {
  gridRows: RowProps[];
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Keyboard component
 */
const Keyboard: React.FC<KeyboardProps> = ({ gridRows, onClick }) => {
  let keyboardRows = INITAL_KEYBOARD_ROWS;

  for (const gridRow of gridRows) {
    for (const letter of gridRow.letters) {
      if (letter.status === 'not guessed') {
        continue;
      }

      // Button statuses updated on redraw
      keyboardRows = updateKeyboard(
        keyboardRows,
        letter.character,
        letter.status
      );
    }
  }

  return (
    <div className="block items-center justify-center mt-2">
      {keyboardRows.map(
        (keyboardRow, index) => (
          <Row
            key={index}
            buttons={keyboardRow.buttons}
            onClick={onClick}
          />
        )
      )}
    </div>
  );
}

export default Keyboard;