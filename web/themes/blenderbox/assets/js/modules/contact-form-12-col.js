let contactForm = {};

export const textAreaCharacterCount = () => {
  const textArea = document.querySelector('.text-area');
  const labelCount = document.querySelector('.label-character-count');

  textArea.addEventListener('keyup', () => {
    const count = textArea.value.length
    labelCount.textContent=`${textArea.value.length}/100`
  })
}

export const onChange = (e) => {
  const name = e.name;
  const value = e.value;
  contactForm = {...contactForm, [name]: value}
  console.log('contact: ', contactForm);
}

// async function onSubmit () {

// }