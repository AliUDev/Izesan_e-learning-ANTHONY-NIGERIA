import React from 'react'
import styled from 'styled-components'
import offline_image from '../../assets/images/offline.png'
const Offline = () => {
  return (
    <StyledOffline className="position-absolute top-50 start-50 translate-middle ">
      <div className='row text-center m-0'>
        <div className='col-12'>
          <img src={offline_image} alt="..." width="10%" />
        </div>
        <div className='col-12'>
          <div class="container">
            <div class="stack" style={{ '--stacks': 3 }}>
              <span style={{ "--index": 0 }}>OOP's you lost your internet connection</span>
              <span style={{ "--index": 1 }}>OOP's you lost your internet connection</span>
              <span style={{ "--index": 2 }}>OOP's you lost your internet connection</span>
            </div>
          </div>
          <p>Internal Server Error <span className='text-danger fw-bold'>500. </span>Check your internet connection to start learing!</p>
        </div>
      </div>

    </StyledOffline>
  )
}

export default Offline

const StyledOffline = styled.div`
width: 100%;
margin: 0;
padding: 0;


.container {
  color: var(--color);
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
}

.right {
  text-align: right;
  width: 100%;
}

.stack {
  display: grid;
  grid-template-columns: 1fr;
}

.stack span {
  font-weight: bold;
  grid-row-start: 1;
  grid-column-start: 1;
  font-size: 2rem;
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation: stack 340ms cubic-bezier(.46,.29,0,1.24) 1 backwards calc(var(--index) * 120ms), glitch 2s ease infinite 2s alternate-reverse;
}
@media (max-width: 767px){
    .stack span {
        font-size: 1.3rem;
    }
}

.stack span:nth-child(odd) { --glitch-translate: 8px; }
.stack span:nth-child(even) { --glitch-translate: -8px; }

@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-50%);
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
  };
  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }
  80% {
    transform: none;
    opacity: 1;
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }
  100% {
    text-shadow: none;
  }
}

@keyframes glitch {
  0% {
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
    transform: translate(var(--glitch-translate));
  }
  2% {
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }
  4%, 100% {  text-shadow: none; transform: none; }
}

`