import CloseIcon from '@mui/icons-material/Close';
import { Skeleton } from '@mui/material';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PaystackButton } from 'react-paystack';
import styled from 'styled-components';
import Heading from '../../../Components/Common/Heading';
import AllIcon from '../../../assets/images/all.png';
import BuyImg from '../../../assets/images/buy_kobo.png';
import CardKoboImg from '../../../assets/images/card_kobo.png';
import CreditIcon from '../../../assets/images/credit.png';
import DebitIcon from '../../../assets/images/debit.png';
import DownIcon from '../../../assets/images/down.png';
import UserImage from '../../../assets/images/gray_pic.png';
import UpIcon from '../../../assets/images/up.png';
import { api, img, paystackPublicKey } from '../../../url';
import Loader from '../../Loader/Loader';

function Aza() {
  const [isLoader, setisLoader] = useState(false);
  const [data, setData] = useState(false);
  const [err, setErr] = useState(false);
  const [dp, setDp] = useState('');
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [buyKoboPopup, setBuyKoboPopup] = useState(false);
  const [askPopup, setAskPopup] = useState(false);
  const [braintreePopup, setBraintreePopup] = useState(false);
  const [instance, setInstance] = useState('');

  const [currency, setCurrency] = useState('kọbọ');

  const [payAmount, setPayAmount] = useState('');
  const [totalKobo, settotalKobo] = useState(0);


  const [headValue, setheadValue] = useState('pending');
  useEffect(() => {
    setData(false);
    setToken();
    setDp(JSON.parse(localStorage.getItem('all_data'))[0].dp);
    getBookings();
    getKoobos()

  }, []);

  const [loading, setloading] = useState(false);
  const getKoobos = () => {
    setloading(true)
    const email = localStorage.getItem('email_id')
    axios.post(`${api}get/kobo/details`, {
      email_id: email
    })
      .then((res) => {
        settotalKobo(res.data.data[0].total_koobo);
        setloading(false)

      }).catch((err) => {
        console.log(err)
      })
  }



  function buyKobo() {
    if (payAmount >= 100) {
      setBuyKoboPopup(false);
      setAskPopup(true);
      // setPaymentPopup(true);
    }
  }

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);

    var data = {
      nonce: 'Nil',
      amount: payAmount,
      kobo: payAmount,
      email_id: localStorage.getItem('email_id'),
      payment_method: 'paystack'
    };

    axios
      .post(`${api}buy/kobo`, data)
      .then((res) => {
        if (res.data.status == 'success') {
          setPaymentPopup(false);
          getBookings();
          getKoobos()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: localStorage.getItem('email_id'),
    amount: payAmount,
    publicKey: paystackPublicKey
  };

  const componentProps = {
    ...config,
    text: 'Pay with Paystack',
    className: 'payButton',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction
  };



  function getUtcTime(t) {
    // var final_date;
    var date = new Date(`${t} UTC`);
    //'en-US', { year: 'numeric', day: '2-digit', month: '2-digit' }
    const split_time = date.toLocaleString().split(/[/,]+/);
    // console.log(split_time);
    const [d, m, y] = split_time;
    return `${y}-${d}-${m}`;
    // return (final_date = );
  }



  async function buy(e) {
    e.preventDefault();
    const { nonce } = await instance.requestPaymentMethod();
    if (nonce) {
      var data = {
        nonce: nonce,
        amount: payAmount,
        kobo: payAmount,
        email_id: localStorage.getItem('email_id'),
        payment_method: 'braintree'
      };

      axios
        .post(`${api}buy/kobo`, data)
        .then((res) => {
          if (res.data.status == 'success') {
            setBraintreePopup(false);
            getBookings();
            getKoobos()
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErr('payment not done!!');
    }
  }
  function getBookings() {
    setisLoader(true);
    axios
      .get(`${api}ViewKooboTransactions?email_id=${localStorage.getItem('email_id')}`)
      .then((res) => {
        console.log(res)
        if (res.data.status == 'success') {
          setisLoader(false);
          setData(res.data.data);
          setisLoader(false);
        } else {
          setisLoader(false);
          setErr('No data available!!');
        }
      })
      .catch((err) => console.log(err));
  }
  async function setToken() {
    const response = await axios.post(`${api}set_token`, {
      client_token: ''
    });
    if (response.data.status == 'success') {
      localStorage.setItem('braintreeToken', response.data.client_token);
    }
  }
  async function brainHandler() {
    window.setTimeout(() => {
      setBraintreePopup(true);
      setAskPopup(false);
    }, 2000);
  }
  return (
    <StyledAza>
      {isLoader && <Loader />}
      <div className="d-flex w-100 flex-row flex-wrap justify-content-between">
        <Heading title="Buy kọbọ">
          <img
            style={{ height: '62px', paddingLeft: '20px', cursor: 'pointer' }}
            onClick={() => setBuyKoboPopup(true)}
            src={BuyImg}
          />
        </Heading>
        <div className="d-flex flex-row left-content">
          {
            dp ? (
              <img className="kobo-user  rounded-circle" style={{ objectFit: 'cover' }} src={`${img}${dp}`} alt="..." />

            ) : (
              <img style={{ objectFit: 'cover' }} src={UserImage} />
            )
          }

          <div className="d-flex flex-column left-text-content mx-3" >
            <span className="fw-normal">Hello</span>
            <span className="fw-bold">{JSON.parse(localStorage.getItem('all_data'))[0].name}</span>
          </div>
        </div>
      </div>
      {/*<div className="d-flex w-100 flex-row flex-wrap" style={{ marginLeft: '20px' }}>*/}
      {/*  */}
      {/*</div>*/}
      <div className="d-flex flex-wrap align-items-start justify-content-between my-5">
        <CardKobo>
          <div className="card-kobo-content">
            <img src={CardKoboImg} className="cardkobo-bg" />
            <div className="cardkobo-number font-roboto">
              {
                loading ? (

                  <Skeleton variant="rounded" animation="wave" width={200} height={35} />
                ) : (
                  <>
                    <span className='mx-2'>{currency}</span>
                    {

                      currency == 'USD' ?
                        (totalKobo / 461.30).toFixed(2) :
                        currency == 'NGN' ?
                          (totalKobo / 100).toFixed(2) :
                          currency == 'kọbọ' ?
                            (totalKobo).toFixed(2) :
                            null
                    }
                  </>
                )
              }
            </div>
            <div className="cardkobo-select_currency">
              <select className="font-roboto rounded-pill border p-1" onChange={(e) => setCurrency(e.target.value)}>
                <option value="" disabled defaultValue>
                  Select Currency
                </option>
                <option value="kọbọ">kọbọ</option>
                <option value="USD">USA</option>
                <option value="NGN">Nigeria</option>
              </select>
            </div>
          </div>
        </CardKobo>
        <div className="row filter_row text-center ">
          <div
            onClick={() => setheadValue('pending')}
            className={`d-flex flex-column align-items-center mb-1 px-2 py-2 border cursor-pointer  my-filter ${headValue === 'pending' ? 'active' : ''
              }`}>
            <img src={AllIcon} />
            <span className="filter-name font-roboto">All</span>
          </div>

          <div
            onClick={() => setheadValue('scheduled')}
            className={`d-flex flex-column align-items-center mb-1 px-2 py-2 border  cursor-pointer  my-filter ${headValue === 'scheduled' ? 'active' : ''
              }`}>
            <img src={DebitIcon} />
            <span className="filter-name font-roboto">Debit</span>
          </div>

          <div
            onClick={() => setheadValue('completed')}
            className={`d-flex flex-column align-items-center px-2 py-2 border  cursor-pointer  my-filter ${headValue === 'completed' ? 'active' : ''
              }`}>
            <img src={CreditIcon} />
            <span className="filter-name font-roboto">Credit</span>
          </div>
          {/*  );*/}
          {/*})}*/}
        </div>
      </div>
      {/*<div className="d-flex align-items-center justify-content-between mt-2 mb-4">*/}
      {/*  <span className="text-dark font-roboto last-transaction-title">Last Transaction</span>*/}
      {/*  <span*/}
      {/*    className="see-all p-2 pe-md-5"*/}
      {/*    style={{ cursor: 'pointer' }}*/}
      {/*    onClick={() => seeAllTransactions()}>*/}
      {/*    See All*/}
      {/*  </span>*/}
      {/*</div>*/}
      <div>
        {data &&
          data.length > 0 &&
          headValue == 'pending' &&
          data.map((item) => {
            return (
              <div
                key={item.transaction_id}
                className="transactionbar d-flex justify-content-between align-items-center bg-white my-2 p-2 pe-md-5 w-100">
                <img className="transaction-user transaction-image rounded-circle" src={`${img}${dp}`} />
                <span className="transaction-date transaction-title">
                  {getUtcTime(item.created_at)}
                </span>

                <StyledImg
                  up={item.type}
                  className="up-icon"
                  src={item.type == 'debited' ? UpIcon : DownIcon}
                />

                <span
                  className={`${item.type == 'debited'
                    ? 'up-red'
                    : item.type === null
                      ? 'neutral'
                      : 'down-green'
                    } transaction-amount`}>
                  kọbọ {item.koobo}
                </span>
              </div>
            );
          })}

        {data &&
          data.length > 0 &&
          headValue == 'scheduled' &&
          data.map((item) => {
            return (
              <>
                {item.type == 'debited' ? (
                  <div
                    key={item.transaction_id}
                    className="transactionbar d-flex justify-content-between align-items-center bg-white my-2 p-2 pe-md-5">
                    <img className="transaction-user  rounded-circle" src={`${img}${dp}`} />
                    <span className="transaction-date">{getUtcTime(item.created_at)}</span>

                    <StyledImg
                      up={item.type}
                      className="up-icon"
                      src={item.type == 'debited' ? UpIcon : DownIcon}
                    />

                    <span
                      className={`${item.type == 'debited'
                        ? 'up-red'
                        : item.type === null
                          ? 'neutral'
                          : 'down-green'
                        } transaction-amount`}>
                      kọbọ {item.koobo}
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </>
            );
          })}

        {data &&
          data.length > 0 &&
          headValue == 'completed' &&
          data.map((item) => {
            return (
              <>
                {item.type == 'earned' || item.type == 'refunded' ? (
                  <div
                    key={item.transaction_id}
                    className="transactionbar d-flex justify-content-between align-items-center bg-white my-2 p-2 pe-md-5">
                    <img className="transaction-user  rounded-circle" src={`${img}${dp}`} />
                    <span className="transaction-date">{getUtcTime(item.created_at)}</span>

                    <StyledImg
                      up={item.type}
                      className="up-icon"
                      src={item.type == 'debited' ? UpIcon : DownIcon}
                    />

                    <span
                      className={`${item.type == 'debited'
                        ? 'up-red'
                        : item.type === null
                          ? 'neutral'
                          : 'down-green'
                        } transaction-amount`}>
                      kọbọ {item.koobo}
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </>
            );
          })}

        <Modal show={buyKoboPopup} onHide={buyKoboPopup}>
          <Modal.Header>
            <Modal.Title style={{ color: 'darkgoldenrod' }}>
              How much kọbọ do you want to buy?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {err ? <div className="alert alert-danger">{err}</div> : null}
            <div>
              <div className="ask-session-body">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="number"
                    minimum="100"
                    required
                    placeholder="Enter Your Amount"
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                  <small style={{ color: 'red', fontWeight: 'bold' }}>* Minimum 100 kọbọs</small>
                </div>
                {/*{err ? <div className="alert alert-danger">{err}</div> : null}*/}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-warning" onClick={() => setBuyKoboPopup(false)}>
              Cancel
            </Button>
            <Button variant="btn btn-success" onClick={() => buyKobo()}>
              Buy Kọbọ
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={askPopup} onHide={askPopup}>
          <Modal.Header>
            <Modal.Title style={{ color: 'darkgoldenrod' }}>Nigerian Bank Card</Modal.Title>
            <p className='cursor-pointer' onClick={() => setAskPopup(false)}><CloseIcon /></p>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="ask-session-body">Are you using Nigerian Bank Card?</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-warning" onClick={(e) => brainHandler(e)}>
              No
            </Button>
            <Button
              variant="btn btn-success"
              onClick={(e) => {
                setAskPopup(false);
                setPaymentPopup(true);
              }}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={braintreePopup} onHide={!braintreePopup}>
          <Modal.Header>
            <Modal.Title style={{ color: 'darkgoldenrod' }}>BrainTree Payment</Modal.Title>
            <p className='cursor-pointer' onClick={() => setBraintreePopup(false)}><CloseIcon /></p>
          </Modal.Header>
          <Modal.Body>
            <div className="title">
              <DropIn
                options={{ authorization: localStorage.getItem('braintreeToken') }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button className="btn btn-success" onClick={(e) => buy(e)}>
                Add Card
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={paymentPopup} onHide={paymentPopup}>
          <Modal.Header>
            <Modal.Title style={{ color: 'darkgoldenrod' }}>Pay With Payout</Modal.Title>
            <p className='cursor-pointer' onClick={() => setPaymentPopup(false)}><CloseIcon /></p>
          </Modal.Header>

          <Modal.Body>
            {err ? <div className="alert alert-danger">{err}</div> : null}
            <div>
              <div className="ask-session-body">Are you sure you want to pay?</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-warning" onClick={() => setPaymentPopup(false)}>
              Cancel
            </Button>
            {payAmount != '' && payAmount >= 100 && (
              <PaystackDiv>
                <PaystackButton {...componentProps} />
              </PaystackDiv>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </StyledAza>
  );
}

const StyledAza = styled.div`

@media (max-width: 712px){
  .filter_row{
    width: 100%;
  }
}

overflow: hidden;
  padding: 2rem 1rem;
  .left-content {
    justify-content: flex-start;
  }

  .kobo-user {
    width: 65px;
    height: 65px;
    object-fit: cover;
  }
  .left-text-content {
    justify-content: flex-end;
  }
  .cardkobo {
    width: 100%;
  }
  .my-filter {
    background-color: #efefef;
    border-radius: 10px;
    &.active {
      border: 3px solid ${(props) => props.theme.secondary};
    }
  }
  .filter-name {
    text-align: center;
    color: #000000;
    opacity: 1;
    margin-top: 0.2rem;
  }
  .last-transaction-title {
    font-weight: 800;
    font-size: 22px;
  }
  .see-all {
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.secondary};
  }

  .transactionbar {
    border-radius: 10px;
  }
  .transaction-date {
    color: #4d4f51;
    font-size: 18px;
    font-weight: 500;
  }
  .transaction-user {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  .transaction-amount {
    font-size: 17px;
    width: 15%;
  }
  .up-icon {
    width: 42px;
    object-fit: contain;
  }
  .up-red {
    color: #db2822;
  }
  .down-green {
    color: #489a6b;
  }
  .neutral {
    color: #000000;
  }
  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }

  .hideItem {
    display: none !important;
  }
  .showItem {
    display: block;
  }
`;
const StyledImg = styled.img`
  width: 22px;
  height: 22px;
  overflow: hidden;

  visibility: ${(props) => (props.up === null ? 'hidden' : 'visible')};
`;

export default Aza;

const PaystackDiv = styled.div`
  .payButton {
    color: 'white';
    background-color: #04aa6d !important;
    border-color: #04aa6d !important;
    padding: 5px;
  }
`;

const CardKobo = styled.div`
  .card-kobo-content {
    position: relative;
    .cardkobo-bg {
      width: 100%;
    }
    .cardkobo-number {
      position: absolute;
      top: 30px;
      left: 30px;
      color: white;
      font-size: 26px;
      font-weight: 500;
    }
    .cardkobo-select_currency {
      position: absolute;
      bottom: 30px;
      left: 30px;
      select {
        border: 0;
        outline: 0;
        background: transparent;
        color: white;
        option {
          color: black;
        }
      }
    }
  }
`;
