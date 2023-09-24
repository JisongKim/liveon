import { forwardRef, useState } from 'react';

function PaymentToggleButton({ labelClassName }, ref) {
  const [isToggled, setToggled] = useState(false);

  return (
    <>
      <label htmlFor="payment" className={labelClassName}>
        지불 방법
      </label>
      <div id="payment" className="bg-greenishgray-200 w-full p-2 rounded-lg">
        <button
          ref={ref}
          // value={isToggled}
          type="button"
          className="w-full rounded-lg "
          onClick={() => setToggled(!isToggled)}
          data-payment={isToggled ? '계좌 이체' : '만나서 결제'}
        >
          <div
            className={`flex w-full ${isToggled ? 'items-center' : ''}`.trim()}
          >
            <div
              className={`w-1/2 ${!isToggled ? 'shadow-lg bg-white rounded-lg' : ''
                }`.trim()}
            >
              만나서 결제
            </div>
            <div
              className={`w-1/2 ${isToggled ? 'shadow-lg bg-white rounded-lg' : ''
                }`.trim()}
            >
              계좌 이체
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

export default forwardRef(PaymentToggleButton);
