import axiosInstance from '../axios';

const headers = {
  Authentication:
    "Bearer " + `eyJyZWdEYXRlIjoxNjMyNzMwMDkzMzU2LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjgsInVzZXJTaWd1bmd1Q29kZSI6MTExMTAsInVzZXJOaWNrbmFtZSI6Inp6IiwidXNlckVtYWlsIjoienpAenouY20iLCJleHAiOjE2MzUzMjIwOTN9.26q-erHmV9dLFLoQAxlHzFC_J9ZJFeU44lmsrSBEPb4`,
}
let formData = {}

//PUT
export const chargeWallet = async (bli) => {
  const url = `/api/user/charge/wallet`
  formData = {
    bli,
  }
  const response = await axiosInstance.put(url, formData, { headers: { headers } });
  return response
}

//POST
export const createWallet = async (userWallet) => {
  const url = `/api/user/create/wallet/`
  formData = {
    userWallet,
  }
  const response = await axiosInstance.post(url, formData, { headers: { headers } });
  return response

}

//POST
export const emailCertification = async () => {
  const url = `/api/user/email-certification`
  const response = await axiosInstance.post(url, formData, { headers: { headers } });
  return response

}

//PUT
export const modifyAddress = async () => {
  const url = `/api/user/modify/address`
  const response = await axiosInstance.put(url, formData, { headers: { headers } });
  return response
}

//PUT
export const modifyPassword = async () => {
  const url = `/api/user/modify/password`
  const response = await axiosInstance.put(url, formData, { headers: { headers } });
  return response
}

//PUT
export const modifyProfile = async () => {
  const url = `/api/user/modify/profile`
  const response = await axiosInstance.put(url, formData, { headers: { headers } });
  return response
}

//GET
export const mypage = async () => {
  const url = `/api/user/mypage`
  const response = await axiosInstance.get(url, {
    headers: headers
  });
  return response
}

//POST
export const signUp = async (userEmail, userName, userPassword) => {
  const url = `/api/user/signup`
  const formData = {
    userEmail,
    userName,
    userPassword,
  }
  const response = axiosInstance.post(url, formData);
  return response
}

//POST
export const emailCheck = async (email) => {
  const response = await axiosInstance(`/api/user/signup/email-check?userEmail=cheal3%40naver.com`)
  return response
}

export const signIn = async (userEmail, userPassword) => {
  const url = `/api/user/login`
  formData = {
    userEmail,
    userPassword,
  }
  const response = axiosInstance.post(url, formData);
  return response
}