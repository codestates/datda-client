import React, { useState } from 'react';
import styled, { css } from 'styled-components';
interface propsType {
  isSelectedImage: string;
}
export default function ImagePostForm() {
  const [image, setImage] = useState({
    file: '',
    previewURL: '',
  });
  //공지사항 이미지 등록 함수
  //!reader.result의 리턴값 타입이 세가지 형태 (string, array, null )
  //!string으로만 받기 위해 타입단언 설정
  const handleFileOnChange = (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setImage({
        file,
        previewURL: reader.result as string,
      });
    };
    //!previewURL에 할당할 데이터 타입이 string 이외일때 예외처리
    if (file !== undefined) {
      reader.readAsDataURL(file);
    }
  };
  //이미지 제거
  const handleRemoveImage = () => {
    setImage({
      file: '',
      previewURL: '',
    });
  };
  return (
    <>
      <ImageWrapper isSelectedImage={image.previewURL}>
        <ImageContainer htmlFor="input_file">
          <SelectImageInput
            type="file"
            id="input_file"
            accept="image/*"
            name="profile_img"
            onChange={handleFileOnChange}
          />
          <Image
            src={
              image.previewURL ? image.previewURL : '../../images/add-image.png'
            }
            alt="프로필사진"
          ></Image>
        </ImageContainer>
        <RemoveImage
          onClick={() => handleRemoveImage()}
          isSelectedImage={image.previewURL}
        >
          이미지 제거
        </RemoveImage>
      </ImageWrapper>
    </>
  );
}
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const SelectImageInput = styled.input`
  display: none;
`;
const ImageContainer = styled.label`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const RemoveImage = styled.div<propsType>`
  background: #6f6eff9e;
  text-align: center;
  width: 90%;
  top: -42px;
  position: relative;
  margin: 0 auto;
  ${({ theme }) => theme.common.defaultButton}
  ${(props) =>
    !props.isSelectedImage &&
    css`
      display: none;
    `}
`;
const ImageWrapper = styled.div<propsType>`
  width: 100%;
  overflow: hidden;
  margin-top: 2%;
  height: 97%;
  border-radius: 15px 15px 15px 15px;
  background: #e0e0e0;
  // 선택한 이미지가 없을경우 기본 이미지 제공
  ${(props) =>
    !props.isSelectedImage &&
    css`
      text-align: center;
      label {
        display: flex;
      }
      img {
        display: flex;
        width: 25%;
        height: 100px;
        margin: 0 auto;
        align-self: center;
      }
    `}
`;
