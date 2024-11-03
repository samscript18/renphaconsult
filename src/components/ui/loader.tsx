import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  loading: boolean;
  loadingText?: string;
}

const Loader = ({ loading, loadingText, ...props }: Props) => {
  if (!loading) {
    return <></>;
  }

  return (
    <div {...props} className={`flex items-center gap-2  ${props.className}`}>
      <BiLoaderAlt size={24} className="animate-spin" />
      {loadingText && <p>{loadingText}</p>}
    </div>
  );
};

export default Loader;
