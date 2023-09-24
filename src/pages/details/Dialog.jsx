import {motion} from 'framer-motion';
import Backdrop from './Backdrop';
import {useLayoutEffect, useRef} from 'react';
import {oneOf, node, bool, string, func} from 'prop-types';

const dropInOut = {
  from: {y: '-100vh'},
  to: {y: 0},
  exit: {y: '100vh'},
};

const dropScaleInOut = {
  from: {y: '-100vh', scale: 0},
  to: {y: 0, scale: 1},
  exit: {y: '100vh', scale: 0},
};

const dropRotateScaleInOut = {
  from: {y: '100vh', scale: 0, rotateZ: -80},
  to: {y: 0, scale: 1, rotateZ: 0},
  exit: {
    y: '-200vh',
    scale: 0,
    rotateZ: 80,
    transition: {
      duration: 1.3,
    },
  },
};

const animationConfig = {
  type: 'spring',
  mass: 6,
  stiffness: 600,
  damping: 90,
};

function Dialog({
  type = 'drop',
  children,
  isBackdropClickClose = false,
  onClose,
}) {
  const dialogRef = useRef(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const focusable = dialog.querySelectorAll(
      '[href], button, input, textarea'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyboardTrap = (e) => {
      const {target, key, shiftKey} = e;

      switch (target) {
        case first:
          if (key === 'Tab' && shiftKey) {
            e.preventDefault();
            last.focus();
          }
          return;
        case last:
          if (key === 'Tab' && !shiftKey) {
            e.preventDefault();
            first.focus();
          }
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    dialog.addEventListener('keydown', handleKeyboardTrap);
    dialog.addEventListener('keydown', handleEscape);

    return () => {
      dialog.removeEventListener('keydown', handleKeyboardTrap);
      dialog.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Backdrop onClose={isBackdropClickClose ? onClose : null}>
      <motion.div
        role="dialog"
        ref={dialogRef}
        drag
        dragConstraints={{
          top: 10,
          left: 10,
          right: 10,
          bottom: 10,
        }}
        variants={
          type === 'scale'
            ? dropScaleInOut
            : type === 'rotate'
            ? dropRotateScaleInOut
            : dropInOut
        }
        initial="from"
        animate="to"
        exit="exit"
        transition={animationConfig}
        whileTap={{scale: 0.96}}
        className="Dialog"
        onClick={handleStopPropagation}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
}

Dialog.Head = function DialogHead({children}) {
  return <div className="DialogHead">{children}</div>;
};

Dialog.Body = function DialogBody({children}) {
  return <div className="DialogBody">{children}</div>;
};

Dialog.Foot = function DialogFoot({children}) {
  return <div className="DialogFoot">{children}</div>;
};

Dialog.CloseButton = function DialogCloseButton({onClose, label = 'close'}) {
  return (
    <button
      type="button"
      className="absolute top-8 right-6 w-4 h-4 border-0 p-0 flex justify-center items-center bg-transparent text-[#0a0000]"
      aria-label={label}
      title={label}
      onClick={onClose}
    >
      <svg aria-hidden="true" viewBox="0 0 14 14" fill="none">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.6"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  );
};

Dialog.propTypes = {
  type: oneOf(['drop', 'scale', 'rotate']), // drop, scale, rotate 중 하나여야 함
  children: node, // 자식 엘리먼트가 노드 타입이어야 함
  isBackdropClickClose: bool, // 부울 타입
  onClose: func,
  label: string, // 함수 타입, 필수 프로퍼티
};

Dialog.Head.propTypes = {
  children: node, // 자식 엘리먼트가 노드 타입이어야 함
};
Dialog.Body.propTypes = {
  children: node, // 자식 엘리먼트가 노드 타입이어야 함
};
Dialog.Foot.propTypes = {
  children: node, // 자식 엘리먼트가 노드 타입이어야 함
};
Dialog.CloseButton.propTypes = {
  onClose: func, // 자식 엘리먼트가 노드 타입이어야 함
  label: string,
};

export default Dialog;
