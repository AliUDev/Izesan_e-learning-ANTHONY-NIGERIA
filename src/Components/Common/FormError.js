import { Fragment } from 'react';

function FormError({ error }) {
  return (
    <Fragment>
      {error && (
        <div className="ms-2">
          <span className="text-danger mt-1  validation-error-message">{error?.message}</span>
        </div>
      )}
    </Fragment>
  );
}

export default FormError;
