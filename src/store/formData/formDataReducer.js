export default function formDataReducer(formData = [], action) {
  switch (action.type) {
    case "add": {
      const newFormData = [...formData];
      newFormData.unshift(action.payload);
      return newFormData;
    }

    case "delete": {
      const newFormData = formData.filter(
        (item) => item.id !== action.payload.id
      );
      return newFormData;
    }

    default:
      return formData;
  }
}
