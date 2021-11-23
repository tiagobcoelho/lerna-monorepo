import React from 'react';

/**
 * Primary UI component for user interaction
 */
export type TextProps = {
  text: string
}

export const Text: React.FC<TextProps> = ({
  text,
  ...props
}): React.ReactElement => {

  return (
    <>
    {text}
    </>
  );
};
