import imgUpload from '@/assets/icons/imgUpload.svg';
import { forwardRef, useState } from 'react';

function FileUpload({ className, title, ...restProps }, ref) {
  const [fileImages, setFileImages] = useState(null);

  const handleFileUpload = (e) => {
    const { files } = e.target;
    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));
    setFileImages(fileImages);
  };

  return (
    <>
      <div className=" mb-14">
        <div className="flex justify-between items-center">
          <p>사진 업로드</p>
          <label htmlFor="photo" className={className}>
            {title}
          </label>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
            name="photo"
            id="photo"
            ref={ref}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            {...restProps}
          />
        </div>
        <div className="flex justify-center border-2 my-4 rounded-lg border-dashed border-line-400">
          {!fileImages && (
            <img src={imgUpload} alt="photo" className="w-20 p-4" />
          )}
          {fileImages?.map((file) => {
            return <img key={file.label} src={file.image} alt={file.label} />;
          })}
        </div>
      </div>
    </>
  );
}

export default forwardRef(FileUpload);
