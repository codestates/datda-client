import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { director, teacher, parents } from '../../assets/testdata';
axios.defaults.withCredentials = true;
import 'dotenv/config';
import { stringify } from 'querystring';
import { findAllInRenderedTree } from 'react-dom/test-utils';

//! 서버 카카오 로그인 url
// const serverLoginUrl = 'https://datda.link/kakao/login'; //! datda 카카오로그인 주소
const serverLoginUrl = 'http://localhost:5000/kakao/login'; //! 로컬서버의 카카오로그인 주소

if (localStorage.getItem('loginInfo')) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
}
export async function requestLogin(email: string, password: string) {
  const mainData = await axios
    .post('https://datda.link/auth/login', {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.status === 200) {
        const accessToken: string = res.data.accessToken;
        localStorage.clear();
        //유저의 로그인 정보를 localStorage로 저장.
        localStorage.setItem(
          'loginInfo',
          JSON.stringify({
            isLogin: true,
            accessToken: accessToken,
            permission: res.data.permission,
          }),
        );
        return requestMainData(accessToken);
      } else {
        alert('회원정보가 없습니다');
      }
    })
    .catch((error) => {
      alert(error);
    });
  return mainData;
}

export async function requestKakaoLogin(authorizationCode: string) {
  const mainData = await axios
    .post(serverLoginUrl, {
      authorizationCode: authorizationCode,
    })
    .then((res) => {
      if (res.status === 201) {
        console.log('회원가입을 해주세요.');
      } else if (res.status === 200) {
        const accessToken: string = res.data.accessToken;
        localStorage.setItem(
          'loginInfo',
          JSON.stringify({
            isLogin: true,
            accessToken: accessToken,
            permission: res.data.permission,
          }),
        );
        return requestMainData(accessToken);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return mainData;
}

export const isEmailExist = async (email: string) => {
  const results = await axios
    .post('https://datda.link/auth/isemail', {
      // axios.post('http://localhost:5000/auth/isemail', {
      email: email,
    })
    .then((res) => {
      if (res.status === 201) {
        return false;
      } else if (res.status === 200) {
        console.log(res.data);
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      alert(error);
    });
  return results;
};
// 로그인을 성공한 유저가 main 화면에서 보여질 데이터를 서버에 요청.
export function requestMainData(token?: string) {
  axios.defaults.headers.common['authorization'] = token;
  const mainData = axios
    .get('https://datda.link/main')
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else if (res.status === 201) {
        return true;
      } else if (res.status === 202) {
        return false;
      } else {
        return undefined;
      }
    })
    .catch((err) => {
      alert(err);
    });
  console.log('반환값', mainData);
  return mainData;
}
// 승인, 미승인 원아 리스트 요청
export function requestApproveChild(childId?: number | null) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const id = childId || null;
  console.log('원아승인시작', id, ' 값은/?');
  const childrenList = axios
    .post('https://datda.link/teacher/approve', {
      childId: id,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data, ' 애들 ');
        return res.data;
      }
      console.log(res.data, '승인요청 ');
      alert('아이의 정보가 없습니다.');
    })
    .catch((error) => {
      alert(error);
    });
  return childrenList;
}

export function requestApproveTeacher(teacherId?: number | null) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const id = teacherId || null;
  const teacherList = axios
    .post('https://datda.link/institution/approve', { teacherId: id })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data, '선생님');
        return res.data;
      }
      console.log(res.data, '승인요쳥');
      alert('선생님의 정보가 없습니다');
    })
    .catch((err) => {
      alert(err);
    });
  return teacherList;
}

export function requestGetClassList() {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const classList = axios
    .get('https://datda.link/institution/classList')
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        alert('데이터가 없습니다');
      }
    })
    .catch((err) => console.log(err));
  return classList;
}

export function requestChangeTeacherClass(teacherId: number, classId: number) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const changeClass = axios
    .post('https://datda.link/institution/changeteacherclass', {
      teacherId: teacherId,
      classId: classId,
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data.message;
      }
      alert('반을 변경할 수 업습니다');
    })
    .catch((err) => {
      alert(err);
    });
  return changeClass;
}

export function requestSearchInsti(value: string) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;

  const instiData = axios
    .post('https://datda.link/guest/searchinstitution', { inputValue: value })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return false;
    })
    .catch((err) => {
      alert(err);
    });
  return instiData;
}

export function requestGetProfile(childId?: string | null) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const profile = axios
    .post('https://datda.link/profile', { childId: Number(childId) })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return false;
    })
    .catch((err) => {
      alert(err);
    });

  return profile;
}

export function requestProfileParentRegister(
  institutionId: string,
  childName: string,
) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;

  const results = axios
    .post('https://datda.link/profile/parentregister', {
      institutionId: Number(institutionId),
      childName: childName,
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      alert(err);
    });
  return results;
}

export function requestGuestTeacherRegister(institutionId: string) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const result = axios
    .post('https://datda.link/guest/teacherregister', {
      institutionId: Number(institutionId),
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      alert(err);
    });
  return result;
}
//parent 아이 추가
export function requestGuestParentRegister(
  childName: string,
  institutionId: string,
) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const result = axios
    .post('https://datda.link/guest/parentregister', {
      childName: childName,
      institutionId: Number(institutionId),
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      alert(err);
    });
  return result;
}

export const getProfile = (): void => {
  axios.get('https://datda.link/userinfo').then((res) => {
    if (res.status === 200) {
      return res.data;
    } else {
      alert('잘못된 요청입니다.');
    }
  });
};
//시간표 등록(원장)
export const requestUploadTimetable = async (timetable: any) => {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const result = await axios
    .post('https://datda.link/institution/timetable', {
      timetable: `'${JSON.stringify(timetable)}'`,
    })
    .then((res) => {
      console.log(res.status, res.data);

      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert('콘솔창에 console.log(err)');
    });
  return result;
};

//반 추가 삭제;
export function requestManageClass(className: string, option: string) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const results = axios
    .post('https://datda.link/institution/manageclass', {
      className: className,
      clickedButton: option,
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      } else {
        return false;
      }
    })
    .catch((err) => {
      alert(err);
    });
  return results;
}

// 공지사항 요청
// childId: 2, // ! optional. 부모의 경우 required
// category: 'notice', // ! optional 이긴 하나 글 업로드 시에는 required
// ! => category 는 notice / event 둘 중 하나
// title: '제목이다.', // ! optional 이긴 하나 글 업로드 시에는 required
// content: '내용이다. 그러하다.', // ! optional 이긴 하나 글 업로드 시에는 required
// ! < 주의 >
// ! 하나의 API로 작성하다 보니, title 이 빈칸인 상태로 작성하기 버튼을 클릭하는 상황은 client 에서 막아주셔야 합니다.
export async function requestNotice(
  childId?: number,
  title?: string,
  content?: string,
  category?: string,
) {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  console.log('공지사항 요청', childId, '=어린이 아이디');
  const result = await axios
    .post('https://datda.link/notice', {
      childId: childId || null,
      title: title || null,
      content: content || null,
      category: category || null,
    })
    .then((res) => {
      console.log(res.status, res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
}
//이미지 등록 요청
export const handleReqeustUploadImage = async (
  imageFile: any,
  title: string,
  content: string,
) => {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const formData = new FormData();
  formData.append('img', imageFile);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  };
  await axios
    .post(
      'https://homemade2021.ml/avatarimage',
      {
        title: title,
        content: content,
        imageInfo: formData,
      },
      config,
    )
    .then((res) => {
      const { avatarUrl } = res.data;
      console.log(avatarUrl);
    })
    .catch((err) => {
      console.log(err);
    });
};
// childId: 2, // ! optional.
// ! (1) parent 일 때는 required
// ! (2) teacher 가 작성 시에도 required
// content: '선생님이 쓴 알림장의 내용입니다.123123' // ! optional. 글 작성 시에는 required
export const requestIndiNotice = async (childId?: number, content?: string) => {
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;
  const result = await axios
    .post('https://datda.link/indinotice', {
      childId: childId || null,
      content: content || null,
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.status, res.data);
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
export const IndiNoticeChildrenList = () => {
  axios
    .get('https://datda.link/indinotice/childrenlist', {})
    .then((res) => {
      console.log(res.status, res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
// 이미지 등록 요청
export const requestImageAlbum = async (
  childId?: number | null,
  formData?: any | null,
  title?: string | null,
  content?: string | null,
) => {
  console.log(
    childId,
    '어린이 아이디',
    formData,
    '파일',
    title,
    '제목',
    content,
    '내용',
  );
  axios.defaults.headers.common['authorization'] = JSON.parse(
    localStorage.getItem('loginInfo')!,
  ).accessToken;

  const result = await axios
    .post('https://datda.link/image/album', {
      childId: childId || null, // ! optional. 부모의 경우 required(어느 유치원의 사진을 보내줘야 할 지를 알기 위해 사용됩니다.)
      title: title || null, // ! optional 이긴 하나 사진 업로드 시에는 required
      content: content || null, // ! optional
      // ! < 주의 >
      // ! 하나의 API로 작성하다 보니 title 이 빈칸으로 작성하기 버튼을 클릭하는 상황은 client 에서 막아주셔야 합니다.
    })
    .then((res) => {
      console.log(res.status, '응답 확인 ');
      if (res.status === 200) {
        console.log(res.data.albumInfo, '앨범 ㅋㅋ');
        // ! (1) 사진을 등록한 경우 아래의 조건으로 빠집니다.
        if (childId !== undefined && title !== undefined) {
          console.log('사진등록 axios');

          axios({
            method: 'post',
            url: 'https://datda.link/image/albumpost',
            data: formData,
            headers: { 'Content-Type': 'form-data' },
          })
            // axios
            //   .post(
            //     'https://datda.link/image/albumpost',
            //     {
            //       // ! asdfasdf payload에 대한 고찰
            //       formData: formData,
            //     },
            //     {
            //       headers: { 'Content-Type': 'multipart/form-data' },
            //     },
            //   )
            .then((res) => {
              alert('앨범이 등록 되었습니다.');

              console.log(123, res.data); // ! => 이 res.data 를 활용하시길 바랍니다!

              return res.data;
            });
          console.log(res.data); // ! => 이 res.data 를 활용하는 것이 아닙니다!
        } else {
          // ! (2) 사진을 등록하지 않은 경우 아래의 조건으로 빠집니다.
          console.log(res.data);
        }
        return res.data.albumInfo;
      } else {
        return res.data.albumInfo;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return result;
};
