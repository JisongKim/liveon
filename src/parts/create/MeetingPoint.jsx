import arrow from '@/assets/icons/arrow.svg';
import { Link } from 'react-router-dom';

function MeetingPoint({ title, labelClassName, ...restProps }) {
  return (
    <>
      <Link to="/location">
        <div className="flex justify-between w-full py-4">
          <label htmlFor="meetingPoint" className={labelClassName}>
            만날 장소
          </label>
          <img id="meetingPoint" src={arrow} alt="만날 장소 지도 이동" {...restProps} />
        </div>
      </Link>

    </>
  );
}

export default MeetingPoint;
