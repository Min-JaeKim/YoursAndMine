import React, { useState, useEffect } from "react";
import profile from "../../assets/image/user.png";
import "./UserEdit.css";
import axios from "axios";
import { useHistory } from 'react-router';

const UserEdit = () => {
  
	const history = useHistory();
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [updateFlag, setUpdateFlag] = useState(false);

  let profile_preview = null;
  if(file !=='') {
    profile_preview = <img className='profile_preview' src={previewURL}></img>
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/mypage`, {
        headers: {
          Authentication: "Bearer " + token,
        },
      })
      .then((response) => {
        setUser(response.data);
        profile_preview=response.data.userImage;
        setUpdateFlag(false);
      })
      .catch((error) => {
        alert("다시 로그인하세요.")
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
      .put(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/modify/profile`, formData, {
        headers: {
          Authentication: "Bearer " + token,
        },
      })
      .then((response) => {
        alert("수정이 완료되었습니다.")
				history.push('/mypage');
      })
      .catch((error) => {
        alert("다시 수정해 주세요.")
      });
  }

  return (
    <div className="user-edit">
      <div>
        <span className="profile-title">프로필 이미지 변경</span>
      </div>
      <br /><br />
      <div className="profile-img">
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
