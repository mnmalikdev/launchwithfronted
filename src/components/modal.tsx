import { FC, ReactNode } from "react";

interface ModalProps {
  bgColor: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, bgColor, children }) => {
  return (
    <>
      {/* Modal Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 " onClick={onClose}></div>}

      {/* Modal */}
      <div
        className={` fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${bgColor} rounded-md p-6 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity transition-pointer-events duration-300 w-11/12 h-2/3  overflow-y-auto lg:w-1/2 lg:h-3/5 `}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
