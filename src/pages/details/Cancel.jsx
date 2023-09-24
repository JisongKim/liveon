
import { AnimatePresence, motion } from 'framer-motion';
import Dialog from './Dialog';
import { useRef, useState } from 'react';
import logo from '@/assets/icons/logo.svg';


function Cancel() {
  const opennerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //탭키로 접근해서 닫을때 오픈버튼에 포커스 주기
    opennerRef.current.focus();
  };

  return (
    <div className="App">
      <motion.button
        type="button"
        ref={opennerRef}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleOpen}
        className='w-28 h-11 bg-cancel-400 rounded-xl text-white hover:bg-cancel-500'
      >
      
        취소하기
            
      </motion.button>

      <AnimatePresence>
        {open && (
          <Dialog type="rotate" onClose={handleClose}>
            <Dialog.Head>
              <h3 className="DialogHeadline">RO9M</h3>
            </Dialog.Head>
            <Dialog.Body>
              <div className="text-cancel-500">
                 <img src={logo} alt="로고" className='mx-auto' />
                 <span className='text-center block'>참여를 취소하시겠습니까?</span>
              </div>
            </Dialog.Body>
            <Dialog.Foot>
              <button type="button" onClick={handleClose} className='w-16 h-8 bg-greenishgray-400 rounded-xl p-1 hover:bg-greenishgray-800'>
                돌아가기
              </button>
              <button type="button" className='w-24 h-8 bg-cancel-400 rounded-xl p-1 hover:bg-cancel-500'>네, 취소할래요</button>
            </Dialog.Foot>
            <Dialog.CloseButton onClose={handleClose} />
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cancel;
