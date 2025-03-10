const formData = {
  email: '',
  message: '',
};

const form_element = document.querySelector('.feedback-form');
const local_storage_data = localStorage.getItem('feedback-form-state');
if (local_storage_data !== null) {
  let local_storage_obj;
  try {
    local_storage_obj = JSON.parse(local_storage_data);
  } catch (err) {
    console.log(err);
  }

  form_element.email.value = local_storage_obj.email;
  form_element.message.value = local_storage_obj.message;

  formData.email = local_storage_obj.email;
  formData.message = local_storage_obj.message;
}

form_element.addEventListener('input', inputHandler);
form_element.addEventListener('submit', submitHandler);

function inputHandler(event) {
  if (event.target.nodeName === 'BUTTON') {
    return;
  }

  if (
    event.target.nodeName === 'INPUT' ||
    event.target.nodeName === 'TEXTAREA'
  ) {
    formData.email = event.currentTarget.email.value.trim();
    formData.message = event.currentTarget.message.value.trim();

    const formDataJson = JSON.stringify(formData);
    window.localStorage.setItem('feedback-form-state', formDataJson);
  }
}

function submitHandler(event) {
  event.preventDefault();
  const form_data_values = Object.values(formData);
  if (form_data_values.includes('')) {
    window.alert('Fill please all fields!');
    return;
  }
  const data_for_submit = { ...formData };
  console.log(data_for_submit);

  localStorage.removeItem('feedback-form-state');
  form_element.reset();
  Object.keys(formData).forEach(key => (formData[key] = ''));
}
