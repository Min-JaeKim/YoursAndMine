import React, { useState, useRef } from "react";
import { Button, Input } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import check from "../../assets/icons/check.png";
import checkOn from "../../assets/icons/check-on.png";
import "./SignUp.css";
import axios from 'axios';
const SignUp = ({ history }) => {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [isCert, setIsCert] = useState(false);
  const [code, setCode] = useState('wqrqw124124')
  const pwd = useRef();
  const pwdConfirm = useRef();
  const cert = useRef();

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  pwd.current = watch("pwd", "");
  pwdConfirm.current = watch("pwdConfirm", "");
  cert.current = watch("cert", "");

  const signup = () => {
    const formData = {
      userEmail: watch('email', ''),
      userName: watch('name', ''),
      userPassword: watch('pwd', ''),
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/signup`, formData)
      .then((response) => {
        console.log(response);
        alert("회원가입에 성공하였습니다.")
        history.push('/signin')

      }).catch((error) => {
        console.log(error)
        alert("회원가입에 실패하였습니다.")
      }
      )
  };

  const sendCert = () => {
    console.log(watch('email', ''))
    console.log(typeof (watch('email', '')))


    axios
      .post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/signup/email-check`, {
        userEmail: watch('email', ''),
      })
      .then((response) => {

        if (response.data) {
          setEmailLoading(true)
          axios
            .post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/email-certification`, {
              userEmail: watch('email', ''),
            })
            .then((response) => {
              setCode(response.data.object);
              setSendEmail(true);
              alert("인증번호 전송");
              console.log(code, response.data.object)
              setEmailLoading(false)
            }).catch((error) => {
              console.log(error);
            })
        }
        console.log(response)
      }).catch((error) => {
        console.log(error);
      })

  };

  const confirmCert = () => {
    console.log()
    if (cert.current === code) {
      alert("인증 성공");
      setIsCert(true);
    } else {
      alert("인증 실패");
    }
  };

  const clickAllOptions = () => {
    if (checkAllOptions()) {
      setOption1(false);
      setOption2(false);
      setOption3(false);
    } else {
      setOption1(true);
      setOption2(true);
      setOption3(true);
    }
  };
  const clickOption1 = () => {
    setOption1(!option1);
  };

  const clickOption2 = () => {
    setOption2(!option2);
  };

  const clickOption3 = () => {
    setOption3(!option3);
  };

  const checkAllOptions = () => {
    if (option1 && option2 && option3) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="signup">
      <form onSubmit={handleSubmit(signup)}>
        <div className="signup-input">
          <div className="signup-input-header">
            <p>이름</p>
            {errors.name ? <span> {errors.name.message}</span> : ""}
          </div>
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: "필수 항목입니다" },

              maxLength: {
                value: 10,
                message: "10글자 이내로 작성해 주세요",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <>
                <Input
                  placeholder="최대 10글자 미만"
                  className={errors.name ? "signup-error" : ""}
                  {...field}
                />
              </>
            )}
          />
        </div>

        <div className="signup-input">
          <div className="signup-input-header">
            <p>비밀번호</p>
            {errors.pwd ? <span> {errors.pwd.message}</span> : ""}
          </div>
          <Controller
            name="pwd"
            control={control}
            rules={{
              required: { value: true, message: "필수 항목입니다" },
              minLength: {
                value: 9,
                message: "9글자 이상으로 작성해주세요",
              },
              maxLength: {
                value: 16,
                message: "16글자 이내로 작성해주세요",
              },
              pattern: {
                value: /^(?=.*[A-Za-z_])(?=.*\d)(?=.*[!@#$%^*\-_=+\\|;:'",./?])/,
                message: "영문 / 숫자 / 특수문자가 반드시 포함되어야 합니다",
              },
            }}
            aultValue=""
            render={({ field }) => (
              <>
                <Input
                  type="password"
                  placeholder="9~16자리 영문+숫자+특수문자 조합"
                  className={errors.pwd ? "signup-error" : ""}
                  {...field}
                />
              </>
            )}
          />
        </div>

        <div className="signup-input">
          <div className="signup-input-header">
            <p>비밀번호 확인</p>
            {pwd.current === pwdConfirm.current ? (
              <></>
            ) : (
              <span>비밀번호가 일치하지 않습니다</span>
            )}
          </div>
          <Controller
            name="pwdConfirm"
            control={control}
            rules={{
              required: true,
              minLength: 9,
              maxLength: 16,
              validate: (value) => value === watch("pwd", ""),
            }}
            aultValue=""
            render={({ field }) => (
              <>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요."
                  className={errors.pwdConfirm ? "signup-error" : ""}
                  {...field}
                />
              </>
            )}
          />
        </div>

        <div className="signup-input">
          <div className="signup-input-header">
            <p>이메일</p>
            {errors.email ? <span> {errors.email.message}</span> : ""}
          </div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: { value: true, message: "필수 항목입니다" },
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞게 입력해주세요",
              },
            }}
            altValue=""
            render={({ field }) => (
              <div className="input-with-button">
                <Input
                  placeholder="이메일 입력"
                  className={errors.email ? "signup-error" : ""}
                  {...field}
                />
                <Button onClick={sendCert} type="button">
                  {emailLoading ? "메일 발송중" : "인증 발송"}
                </Button>
              </div>
            )}
          />
        </div>

        <div className="signup-input">
          <div className="signup-input-header">
            <p>인증번호</p>
            {errors.cert ? <span> {errors.cert.message}</span> : ""}
          </div>
          <Controller
            name="cert"
            control={control}
            rules={{
              required: { value: true, message: "필수 항목입니다" },

            }}
            altValue=""
            render={({ field }) => (
              <div className="input-with-button">
                <Input
                  placeholder="인증번호 입력"
                  className={errors.cert ? "signup-error" : ""}
                  {...field}
                />
                {sendEmail && !emailLoading ? (
                  <Button onClick={confirmCert} type="button">
                    인증 확인
                  </Button>
                ) : (
                  <Button onClick={confirmCert} disabled type="button">
                    인증 확인
                  </Button>
                )}
              </div>
            )}
          />
        </div>

        <div className="division-bar"></div>

        <div className="signup-terms">
          <div className="signup-terms-div">
            <div className="signup-terms-all" onClick={clickAllOptions}>
              {checkAllOptions() ? (
                <img src={checkOn} alt="check" width="30px" />
              ) : (
                <img src={check} alt="check" width="30px" />
              )}

              <span>전체 동의</span>
            </div>
            {checkAllOptions() ? (
              ""
            ) : (
              <span className="valid">필수 항목들을 확인해주세요</span>
            )}
          </div>
          <div className="signup-checkbox">
            <div className="signup-terms-option option1" onClick={clickOption1}>
              {option1 ? (
                <img src={checkOn} alt="check" width="24px" />
              ) : (
                <img src={check} alt="check" width="24px" />
              )}
              이용약관 (필수)
            </div>
            <div className="signup-terms-option option2" onClick={clickOption2}>
              {option2 ? (
                <img src={checkOn} alt="check" width="24px" />
              ) : (
                <img src={check} alt="check" width="24px" />
              )}
              개인정보 처리방침 (필수)
            </div>
            <div className="signup-terms-option option3" onClick={clickOption3}>
              {option3 ? (
                <img src={checkOn} alt="check" width="24px" />
              ) : (
                <img src={check} alt="check" width="24px" />
              )}
              위치기반 서비스 이용약관 (필수)
            </div>
          </div>
          <ul>
            <li>회원 가입 시 만 14세 이상임에 동의하게 됩니다.</li>
          </ul>
        </div>

        <div className="signup-submit">
          {
            !isCert ? <Button type="submit" disabled>
              이메일 인증을 진행해주세요
            </Button> :
              checkAllOptions() ? (
                <Button type="submit">회원가입</Button>
              ) : (
                <Button type="submit" disabled>
                  필수 항목을 전부 체크해주세요
                </Button>
              )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
