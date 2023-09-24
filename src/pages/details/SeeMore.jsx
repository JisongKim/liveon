import {AnimatePresence, motion} from 'framer-motion';
import Dialog from './Dialog';
import {useRef, useState} from 'react';
import dots from '@/assets/icons/dots.svg';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';

function Cancel() {
  const {id} = useParams();
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
    <div className="flex">
      <motion.button
        type="button"
        ref={opennerRef}
        whileHover={{scale: 1.04}}
        whileTap={{scale: 0.96}}
        onClick={handleOpen}
      >
        <img src={dots} alt="더보기" className="w-10 h-10 pr-4" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="fixed top-0 left-0 w-screen h-full z-10 bg-[#15151582]">
            <Dialog type="rotate" onClose={handleClose}>
              <div className="flex flex-col fixed z-50 top-[50vh] left-1/2 w-[clamp(300px, 96vw, 840px)] h-[290px] border border-[#b9b9b956] rounded-12 bg-white bg-no-repeat bg-center bg-cover transform -translate-x-1/2 -translate-y-1/2 rounded-xl p-8">
                <div className="w-72 h-72">
                  <Dialog.Head>
                    <span className="flex justify-center items-center mb-4">
                      R09M
                    </span>
                  </Dialog.Head>
                  <Dialog.Body>
                    <div className="text-center">
                      <div>
                        <Link to={`/users/${id}`}>
                          <button
                            type="button"
                            className="w-full h-14 px-1 hover:bg-greenishgray-300 rounded-t-xl text-info-500 border-b border-solid border-greenishgray-400"
                          >
                            참여자 관리
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="w-full h-14 px-1 hover:bg-greenishgray-300 rounded-b-xl text-cancel-500 mb-5"
                        >
                          모임 삭제
                        </button>
                      </div>
                    </div>
                  </Dialog.Body>
                  <Dialog.Foot>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full h-10 bg-greenishgray-500 rounded-xl px-1 hover:bg-greenishgray-400 text-white"
                    >
                      취소
                    </button>
                  </Dialog.Foot>
                </div>
              </div>
            </Dialog>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Cancel;
