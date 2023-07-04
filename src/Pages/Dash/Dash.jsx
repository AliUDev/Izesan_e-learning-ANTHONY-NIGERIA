import styled from 'styled-components';

function Dash() {
  return <StyledDash className="text-primary">Dash</StyledDash>;
}

export default Dash;

const StyledDash = styled.div`
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;
