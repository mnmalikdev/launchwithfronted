import { useState } from "react";

const Tooltip = ({ content, children }: any) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div className="relative">
      <div className="inline-block" onMouseEnter={toggleShow} onMouseLeave={toggleShow}>
        {children}
      </div>
      {show && <div className="absolute z-5 bg-primary text-white rounded-lg px-2 py-1 -mt-8 top-0">{content}</div>}
    </div>
  );
};

export default Tooltip;
