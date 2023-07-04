import styled from 'styled-components';

function SideMenuSection({ title, children }) {
  return (
    <StyledSideMenuSection>
      <div className="title font-poppins">{title}</div>
      <div className="content">{children}</div>
    </StyledSideMenuSection>
  );
}

export default SideMenuSection;

const StyledSideMenuSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .title {
    font-weight: 800;
    color: #0000004b;
  }
`;