import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { func } from 'prop-types';
function Backdrop({ children, onClose }) {
  return (

    <motion.div
      role="none"
      className="Backdrop"
      onClick={onClose}
      
      //in, from (start)
      initial={{ opacity: 0 }}
     
      //to (end)
      animate={{ opacity: 1 }}
     
      // out
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

Backdrop.propTypes = {
  children: PropTypes.node, // 자식 엘리먼트가 노드 타입이어야 함
  onClose: func, // 함수 타입, 필수 프로퍼티
};


export default Backdrop;
