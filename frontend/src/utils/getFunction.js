import React, { Component } from "react";
import Web3 from "web3";
// import getWeb3 from "./getWeb3";
import ShopContract from "../config/Billige.json"

// 계좌 연동(계좌가 없으면 이때 new account해줌. 아맞다 그리고 이때 지갑생성 버튼을 눌러야 메타마스크 연동하는 게 좋을 듯. 이전것은 서비스 들어가자마자 연동), 
// 빌리 충전, 가입했을 때 빌리 제공, 
// 물건 구매. 환불.

export class getFunction {

  static shopInstance;
  static myAccount;
  static web3;
  static myApples;

  constructor() {
  }
	
  // static web3 = new Web3(gethHost);
  // static contract = new this.web3.eth.Contract(abi, contractAddress);

  // 모든 회원 계좌 연동. 메타마스크 설치를 전제로 한다.
	static async connectMetamask() {

    let getWeb3 = new Promise((resolve, reject) => {
      // Modern dapp browsers...
    
      if (window.ethereum) {
        const web3 = new Web3(Web3.givenProvider || process.env.INFURA_SERVER);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        alert("메타마스크를 설치하셔야 이용 가능합니다.");
      }
    });

    const results = await getWeb3;
    this.web3 = results;
    await this.instantiateContract();
    // render() {
    //     return (this.myAccount)
    // }
    return this.myAccount;
	}

  static async instantiateContract() {
    const contract = require("truffle-contract");
    const shop = contract(ShopContract);
    shop.setProvider(this.web3.currentProvider); 
    try{
      this.myAccount = await this.web3.eth.getAccounts();
      this.shopInstance = await shop.deployed();
    } catch {
      console.log("err")
    }
  }

  static async getBliCoin(){
    const minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
    ];
    var web3 = window.web3
    const Web3Client = new Web3(web3.currentProvider)
    const tokenAddress = process.env.COINBASE;
    // const walletAddress = myAccount;
    const walletAddress = this.myAccount;
    const coinContract = new Web3Client.eth.Contract(minABI, tokenAddress);

    async function getBalance() {
      const bli_result = await coinContract.methods.balanceOf(walletAddress[0]).call();
      const format = Web3Client.utils.fromWei(bli_result);
      return format;
    }
    return getBalance();
  }
}
