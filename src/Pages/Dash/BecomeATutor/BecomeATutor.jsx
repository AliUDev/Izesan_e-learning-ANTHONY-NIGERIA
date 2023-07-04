import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import CountrySelect from '../../../Components/Common/CountrySelect';
import { FormGroup, FormLabel } from '../../../Components/Common/FormGroup/FormGroup';
import Heading from '../../../Components/Common/Heading';

function BecomeATutor() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = () => { };
  return (
    <StyledBecomeATutor>
      <Heading title="Become a Tutor" />
      <StyledContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup
            label="Which language(s) do you want to teach?"
            id="language"
            type="text"
            register={register}
            error={errors}
            required={true}
          />
          <FormGroup
            id="hasComputer"
            type="yes-no"
            label="Do you have a laptop or computer?"
            register={register}
            error={errors}
          />
          <FormGroup
            id="strongInternet"
            type="yes-no"
            label="Do you have a strong internet connection?"
            register={register}
            error={errors}
          />
          <StyledLocationInputs>
            <>
              <FormLabel label="Where are you currently located (City,State,and Country)?" />
              <CountrySelect />
            </>
            <FormGroup
              id="state"
              type="text"
              register={register}
              error={errors}
              required={true}
              defaultValue="Add State"
            />
            <FormGroup
              id="city"
              type="text"
              register={register}
              error={errors}
              required={true}
              defaultValue="Add City"
              className="city-input"
            />
          </StyledLocationInputs>

          <FormGroup
            label="How many years of teaching experience do you have?"
            id="experience"
            type="number"
            register={register}
            error={errors}
            required={true}
            placeholder="Enter years of teaching experience"
          />
        </form>
      </StyledContent>
    </StyledBecomeATutor>
  );
}

export default BecomeATutor;
const StyledBecomeATutor = styled.div`
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem 1.5rem 0 1.5rem;
  }
  @media (min-width: 992px) {
    padding: 3rem 3rem 0 3rem;
  }
`;
const StyledContent = styled.div`
  margin: 30px 0;

  @media (min-width: 768px) {
    margin: 30px 20px;
  }
  @media (min-width: 1200px) {
    margin: 60px 30px;
  }
  @media (min-width: 1400px) {
    margin: 100px 40px;
  }
`;

const StyledLocationInputs = styled.div`
  .styledformgroup {
    margin-bottom: 14px;
    &.city-input {
      margin-bottom: 30px;
    }
  }
`;
