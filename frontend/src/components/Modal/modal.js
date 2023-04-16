import { useEffect, useState } from 'react';
import Button from '../Button/buttons';
import './modal.css';
import { ethers } from 'ethers';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const [address, setAddress] = useState();
  const getBlockchainInfo = () => {
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(res=>{
          // Return the address of the wallet
          setAddress(res[0]); 
      })
    }else{
      alert("install metamask extension!!")
    }
  }

  useEffect(() => {
    window.ethereum.request({
      method:'eth_getBalance', 
      params: [address, 'latest']
    }).then(balance => {
      console.log(balance)
    })
  }, [address]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <div></div>
        <Button title="aprove" onClick={getBlockchainInfo}/>
        <Button title="reject" onClick={handleClose}/>
      </section>
    </div>
  );
};

export default Modal;