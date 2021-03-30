export const textAreaCharacterCount = () => {
  const textArea = document.querySelector('.text-area');
  const labelCount = document.querySelector('.label-character-count');

  textArea.addEventListener('keyup', () => {
    const count = textArea.value.length
    labelCount.textContent=`${textArea.value.length}/100`
  })
}