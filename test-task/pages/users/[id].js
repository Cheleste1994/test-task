import styles from '../../styles/main.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { handleImageOnServer } from '../api/api';

export default function Home() {
  const router = useRouter();
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState('');


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleClickBtn = (route) => {
    router.push(route);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTimestamp) {
        handleClickBtn('/login');
        localStorage.setItem('token', '');
      }

      if (decoded.email !== window.location.pathname.split('/').reverse()[0]) {
        handleClickBtn('/login');
      }
    } catch {
      handleClickBtn('/login');
    }
  }, []);


  const handleSave = () => {
    const cropper = cropperRef.current?.cropper;
    const base64Image = cropper.getCroppedCanvas().toDataURL()
    const token = localStorage.getItem('token');

    if (base64Image && token) {
      handleImageOnServer('PUT', base64Image, token).then(console.log);
    }
  };

  return (
    <>
      <main className={`${styles.main} px-[30px]`}>
        <nav className='text-[10px]'>
          Главная / Настройки аккаунта / Загрузка аватара
        </nav>

        {!image ? (
          <>
            <div className='mb-[37px] mt-[21px] pl-[10px] text-2xl font-bold'>
              Загрузка аватара
            </div>
            <span className='max-w-[252px] text-sm'>
              Загрузите файл размером до 5Мб <br /> По формату: JPG, PNG, GIF
            </span>
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button
              className={`
          relative mt-[43px] from-[#686DE0] to-[#4834D4]
          before:left-[100px]
          before:mr-[7px]
          before:bg-[url(../public/open.svg)]
          before:bg-contain
          before:bg-center
          before:bg-no-repeat
          before:p-[7px]`}
              onClick={() => fileInputRef.current.click()}
            >
              Выбрать файл
            </button>
          </>
        ) : (
          <>
            <div className='mb-[37px] mt-[21px] pl-[10px] text-2xl font-bold'>
              Фото для аватарки
            </div>
            <Cropper
              src={image}
              style={{ height: 198, width: '100%' }}
              className={`cropper`}
              ref={cropperRef}
              // Cropper.js options
              viewMode={1}
              initialAspectRatio={4 / 4}
              aspectRatio={4 / 4}
              modal={false}
              center={false}
              guides={false}
              background={false}
              movable={false}
              zoomOnWheel={false}
              minCropBoxWidth={160}
            />
            <button
              className={`mt-[43px] from-[#686DE0] to-[#4834D4]`}
              onClick={handleSave}
            >
              Сохранить
            </button>
            <button
              className={`mb-[66px] mt-[11px] from-[#EDEBFB] to-[#F0F0FC] !text-black hover:!contrast-75`}
              onClick={() => setImage('')}
            >
              Отменить
            </button>
          </>
        )}
      </main>
    </>
  );
}
