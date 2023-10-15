import styles from '../../styles/main.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { sendImageOnServer } from '../api/api';
import { useSWRConfig } from 'swr';
import { redirectTo } from '@/components/helpers/redirectTo';

export default function Home() {
  const router = useRouter();
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [saveImage, setSaveImage] = useState(false);
  const [isValidImage, setisValidImage] = useState(true);
  const { mutate } = useSWRConfig();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const { type, size } = file;

      if (
        (type !== 'image/jpeg' &&
          type !== 'image/jpg' &&
          type !== 'image/gif' &&
          type !== 'image/png') ||
        size > 5 * 1024 * 1024
      ) {
        setisValidImage(false);
        return;
      }

      setisValidImage(true);
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < currentTimestamp) {
        redirectTo(router, '/login');
        localStorage.setItem('token', '');
      }

      if (decoded.email !== window.location.pathname.split('/').reverse()[0]) {
        redirectTo(router, '/login');
      }
    } catch {
      redirectTo(router, '/login');
    }
  }, []);

  const handleSave = async () => {
    const cropper = cropperRef.current?.cropper;
    const base64Image = cropper.getCroppedCanvas().toDataURL();
    const token = localStorage.getItem('token');

    if (base64Image && token) {
      try {
        await sendImageOnServer(base64Image, token);
        mutate('account/image');
        setImage(null);
        setSaveImage(true);
        setTimeout(() => setSaveImage(false), 5000);
      } catch {
        setSaveImage(false);
        redirectTo(router, '/login');
      }
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
            {isValidImage ? (
              ''
            ) : (
              <span className='pt-[40px] text-center'>
                Не верный формат. Выберите другое изображение!
              </span>
            )}
            <input
              type='file'
              accept='.jpg, .gif, .png'
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
        {saveImage ? (
          <div className={`${styles.save} bg-[#7fffd48e]`}>
            Аватар сохранён!
          </div>
        ) : (
          ''
        )}
      </main>
    </>
  );
}
