import {number, string} from 'prop-types';

function StatusIcon({
  width = 90,
  height = 36,
  color = '#F1F4F4',
  text,
  textColor = '#AEB4B0',
  textX = '26%',
  textY = '64%',
}) {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 70 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M58.8267 36H3.54181C0.483498 36 -1.16329 32.0276 0.954008 29.7931L11.7757 20.6069C13.1873 19.1172 13.1873 16.8828 11.7757 15.3931L0.954008 6.2069C-1.16329 3.97241 0.483498 0 3.54181 0H58.8267C59.7677 0 60.7088 0.496552 61.4145 1.24138L76.9414 15.6414C78.3529 17.131 78.3529 19.3655 76.9414 20.8552L61.1793 34.7586C60.4735 35.5034 59.7677 36 58.8267 36Z"
          fill={color}
        />
        <text x={textX} y={textY} fill={textColor} fontSize="16">
          {text}
        </text>
      </svg>
    </>
  );
}

StatusIcon.propTypes = {
  width: number,
  height: number,
  color: string,
  text: string,
  textColor: string,
  textX: string,
  textY: string,
};

export default StatusIcon;
