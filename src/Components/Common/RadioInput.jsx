import { Fragment, useState } from 'react';
import RadioSelected from '../../assets/images/radio_selected.png';
import RadioUnSelected from '../../assets/images/radio_unselected.png';
function RadioInput({ options, selectedVal = '', setSelectVal = '' }) {
  const [selected, setSelected] = useState(selectedVal);

  const handleCheck = (event) => {
    setSelected(event.target.getAttribute('data-value'));
    if (setSelectVal) {
      setSelectVal(event.target.getAttribute('data-value'));
    }
  };
  return (
    <Fragment>
      {options.map((option) => {
        let isSelected = selected === option.value;
        return (
          <label
            className="me-3 d-flex align-items-center"
            key={option.value}
            onClick={handleCheck}>
            {isSelected ? (
              <img src={RadioSelected} alt="selected" data-value={option.value} />
            ) : (
              <img src={RadioUnSelected} alt="selected" data-value={option.value} />
            )}
            <span className="d-block ms-2" data-value={option.value}>
              {option.label}
            </span>
          </label>
        );
      })}
    </Fragment>
  );
}

export default RadioInput;
