document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.reg_input')) {
    document.querySelector('.reg_input').addEventListener('click', (click) => {
      if (document.querySelector('.error')) {
        document.querySelector('.error').remove();
      }
    });
  }
});
