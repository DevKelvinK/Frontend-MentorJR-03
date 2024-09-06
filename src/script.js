// Validação do formulário

const form = document.querySelector("#formContainer");
const input = document.querySelector("#inputEmail");

form.addEventListener("submit", (Validate) => {
  input.value = "";

  console.log("Formulário Enviado! (Form Sent!)");

  Validate.preventDefault();
});

input.addEventListener("invalid", CustomValidation);
input.addEventListener("blur", CustomValidation);

function CustomValidation(e) {
  e.preventDefault();

  function CheckErrors() {
    let FoundError = false;

    for (error in input.validity) {
      if (input.validity[error] && !input.validity.valid) {
        FoundError = error;
      }
    }

    return FoundError;
  }

  function ErrorAlerts() {
    const error = CheckErrors();
    const errorText = input.parentNode.querySelector("#invalidEmailError");

    function emailValid(input) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
    }

    if (error === "valueMissing" ||
      error === "typeMismatch" ||
      !emailValid(input.value)) {
        errorText.style.display = 'block'
      } else {
        errorText.style.display = 'none'
    }
  }

  return ErrorAlerts()
}

// Alterar tema da página

window.preferedColorSchemeClassName = "";

const lightModePreference = window.matchMedia("(prefers-color-scheme: light)")
lightModePreference.addEventListener('change', determinePreferedColor)

function ChangeTheme(t) {
  const darkSelected = document.querySelector('.dark')
  const lightSelected = document.querySelector('.light')
  const deviceSelected = document.querySelector('.device')

  switch (t) {
    case "dark":
      document.querySelector("html").className = ""
      darkSelected.classList.add("selected")
      deviceSelected.classList.remove("selected")
      lightSelected.classList.remove("selected")
    break;
    case "light":
      document.querySelector("html").className = "light"
      darkSelected.classList.remove("selected")
      deviceSelected.classList.remove("selected")
      lightSelected.classList.add("selected")
    break
    case "device":
      document.querySelector("html").className = window.preferedColorSchemeClassName
      darkSelected.classList.remove("selected")
      deviceSelected.classList.add("selected")
      lightSelected.classList.remove("selected")
    break
  }
}

function determinePreferedColor(e) {
  if (e.matches) {
    window.preferedColorSchemeClassName = "light"
  } else {
    window.preferedColorSchemeClassName = ""
  }
  
  ChangeTheme('device')
}

determinePreferedColor(lightModePreference)