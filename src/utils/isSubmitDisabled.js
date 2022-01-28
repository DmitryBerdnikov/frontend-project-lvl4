const isSubmitDisabled = ({ values, isSubmitting }) => {
  if (isSubmitting) {
    return true;
  }

  const valuesNotEmpty = Object.values(values).every((n) => n !== '');
  return !valuesNotEmpty;
};

export default isSubmitDisabled;
