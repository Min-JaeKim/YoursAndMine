import axios from "../../api/axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Category from "../Category/Category";

import "./Write.css";
import Swal from "sweetalert2";
import { Input, Button, Form, TextArea, Grid } from "semantic-ui-react";

const Write = () => {
  const userdata = JSON.parse(window.localStorage.getItem("user"));
  let address = userdata ? userdata.userAddress : '서울시 강남구'
  if (address !== '서울시 강남구') {
    let addressArray = address.split(' ');
    address = addressArray[0] + ' ' + addressArray[1] + ' ' + addressArray[2];
    // console.log(address)
  }

  const history = useHistory();
  const [itemname, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('test');
  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');

  let profile_preview = null;
  if(file !=='') {
    console.log('file')
    console.log(file)
    profile_preview = <img className='profile_preview' src={previewURL}></img>
  }

  const getCategory = (category) => {
    setCategory(category);
  };

  const writeProduct = () => {
    if (file === ''){
      Swal.fire({
        title: 'Error!',
        text: '사진은 필수입니다.',
        icon: 'error',
        confirmButtonText: 'OK!',
        confirmButtonColor: '#497c5f'
      })
      return;
    }
    if (category === 'test') {
      Swal.fire({
        title: 'Error!',
        text: '카테고리는 필수입니다.',
        icon: 'error',
        confirmButtonText: 'OK!',
        confirmButtonColor: '#497c5f'
      })
      return;
    }
    if (itemname === ''){
      Swal.fire({
        title: 'Error!',
        text: '상품명은 필수입니다.',
        icon: 'error',
        confirmButtonText: 'OK!',
        confirmButtonColor: '#497c5f'
      })
      return;
    }
    if (itemPrice === ''){
      Swal.fire({
        title: 'Error!',
        text: '상품가격은 필수입니다.',
        icon: 'error',
        confirmButtonText: 'OK!',
        confirmButtonColor: '#497c5f'
      })
      return;
    }
    if (description === '') {
      Swal.fire({
        title: 'Error!',
        text: '상품 설명은 필수입니다.',
        icon: 'error',
        confirmButtonText: 'OK!',
        confirmButtonColor: '#497c5f'
      })
      return;
    }
      // const itemImage = new FormData();
      // itemImage.append("itemImage", file);

      const tmp = {
        "itemName": "비모피규어",
          "itemContent": "비모피규어 내용",
          "itemCategory": "가전제품",
          "itemPrice": 4000
        }
      const itemData = new FormData();
      // itemData.append("itemName", itemname);
      itemData.append("itemImage", file);
      itemData.append("itemData",  new Blob([JSON.stringify(tmp)], {type: "application/json"}));
      // itemData.append("itemContent", description);
      // itemData.append("itemCategory", category);
      // itemData.append("itemPrice", itemPrice);

      // const tmp = new FormData

      // formData.append('showInfoUpdatePatchReq', new Blob([JSON.stringify(showInfoUpdatePatchReq)], {type: "application/json"}))

      const token = JSON.parse(window.localStorage.getItem("token"));
      console.log(token);
      axios
        .post(`/item`, itemData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(4654664864)
          history.push('/myproduct');
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const onChangeItemName = (e) => {
    setItemName(e.target.value);
  };

  const onChangeItemPrice = (e) => {
    setItemPrice(e.target.value);
  };

  const onChangeDesc = (e) => {
    setDescription(e.target.value)
  }

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


  return (
    <div className="write">
      <h4 className="item-name">상품명</h4>

      <Input
        placeholder="상품명을 입력해주세요"
        className="item-name"
        onChange={onChangeItemName}
      />

      <h4 className="item-heading-upload">이미지 업로드</h4>
      <div className="upload">
        {/* <Button className="upload-button"><h2>+</h2></Button> */}
        {profile_preview}
        <input type='file' 
          accept='image/jpg,impge/png,image/jpeg,image/gif' 
          name='profile_img' 
          onChange={handleFileOnChange}
          >
      </input>
      </div>
      <div className="write-category">
        <Category flag="1" category={category} getCategory={getCategory} />
      </div>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <h4 className="item-heading">대여 가격(1일)</h4>
          </Grid.Column>
          <Grid.Column>
            <div className="item-bli">
              <h4>₩</h4>
              <Input placeholder="가격" className="write-bli" onChange={onChangeItemPrice} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Form className="item-description">
        <h4>
          <label>상품 설명</label>
        </h4>
        <TextArea onChange={onChangeDesc} />
      </Form>
      <div className="done">
        <Button className="done-button" onClick={writeProduct}>
          등록
        </Button>
      </div>
    </div>
  );
};

export default Write;
