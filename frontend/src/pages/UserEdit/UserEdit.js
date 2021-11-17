import "./UserEdit.css";
import Swal from "sweetalert2";
import profile from "../../assets/image/user.png";

import axios from "../../api/axios";
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';

const UserEdit = () => {
  
	const history = useHistory();
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [updateFlag, setUpdateFlag] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);

  let profile_preview = null;
  if(file !=='') {
    profile_preview = <img className='profile_preview' src={previewURL}></img>
  }

  useEffect(() => {
    axios
      .get(`/user/me`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUser(response.data);
        setPreviewURL(response.data.userImage);
        profile_preview=response.data.userImage;
        setUpdateFlag(false);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: '다시 로그인하세요.',
          icon: 'error',
          confirmButtonText: 'OK!',
          confirmButtonColor: '#497c5f'
        })
      });
  }, [updateFlag]);

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreviewURL(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const onChangeUserImage = () => {
    const formData = new FormData();
      formData.append("userImage", file);

    axios
      .put(`/user/profile`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        Swal.fire({
          title: 'Success!',
          text: '회원 정보 수정이 되었습니다.',
          icon: 'success',
          confirmButtonText: 'OK!',
          confirmButtonColor: '#497c5f'
        })
				history.push('/mypage');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: '수정이 취소되었습니다.',
          icon: 'error',
          confirmButtonText: 'OK!',
          confirmButtonColor: '#497c5f'
        })
      });
  }

  return (
    <div className="user-edit">
      <div>
        <span className="profile-title">프로필 이미지 변경</span>
      </div>
      <br /><br />
      <div className="ue-profile-img">
        <div>
          {profile_preview}
        </div>
        <div className="upload-img">

          <input type='file' 
            accept='image/jpg,impge/png,image/jpeg,image/gif' 
            name='profile_img' 
            onChange={handleFileOnChange}
            >
        </input>
        </div>
      </div>
      <div>
        {/* <input type="text" placeholder={user.userName} className="user-edit-input"></input> */}
        <button className="user-edit-button" onClick={onChangeUserImage}>완료</button>
      </div>
    </div>
  );
};

export default UserEdit;
