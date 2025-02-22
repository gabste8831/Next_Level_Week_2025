const app = document.getElementById("app");
const users = [
  {
    email: 'teste@teste.com',
    phone: '47999999999',
    ref: 100,
    refBy: null
  },
  {
    email: 'tust@tust.com',
    phone: '47999999999',
    ref: 200,
    refBy: 100
  }
];

const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email;
    // comparação se o email inserido já existe, ou é novo
  });
};

//atualização da contagem de novos inscritos. Comparação pela referencia de refBy. 
const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
  app.innerHTML = `
  <main>
    <h3>Inscrição Confirmada</h3>
    <p>Convide + pessoas, e concorra a prêmios </br>
      Compartilhe o link, e acompanhe as inscrições:
    </p>
  
    <div class="input-group">
      <label for="link">
        <img src="link.svg" alt="link icon">
      </label>
      <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
    </div>
  </main>
  
  <section class="stats">
    <h4>${getTotalSubscribers(userData)}</h4>
    <p>Inscrições feitas</p>
  </section>
  `
  
app.setAttribute('class', 'page-invite')

  updateImageLinks();
}


const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: Math.round(Math.random() * 4000),
    refBy: 100
  }
  users.push(newUser)
  return newUser
}


const formAction = () => {
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    const user = getUser(userData);
    if (user) {
      showInvite(user)
    } else {
      const newUser = saveUser(userData)
      showInvite(newUser)
    }
  };
};

const updateImageLinks = () => {
  document.querySelectorAll(`img`).forEach((img) => {
    if(img.src.includes("githubusercontent")){
      return
    }
  const src = img.getAttribute(`src`)
    img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
  })
}

const startApp = () => {
  const content = `
   <main>
  <section class="about">
    <div class="section-header">
      <h2>Sobre o Projeto</h2>
      <span class="badge">AO VIVO</span>
    </div>
    <p>
      Prática para certificação do curso NLW Rocketseat - Trilha Full Stack </br>
      projeto com proposta de criar uma portal de inscrições, envolvendo E-mail e Telefone para contato, e um link de compartilhamento de inscrições.
    </p>
  </section>

  <section class="registration"> <!-- Alterado: Movido para fora da seção 'about' -->
    <h2>Inscrição</h2>
    <form id="form">
      <div class="input-wrapper">
        <div class="input-group">
          <label for="email">
            <img src="mail.svg" alt="email icon">
          </label>
          <input type="email" id="email" name="email" placeholder="E-mail">
        </div>
        <div class="input-group">
          <label for="phone">
            <img src="phone.svg" alt="phone icon">
          </label>
          <input type="text" id="phone" name="phone" placeholder="Telefone">
        </div>
      </div>

      <button>
        Confirmar
        <img src="arrow.svg" alt="Arrow right">
      </button>
    </form>
  </section>
</main>

    
  `;

  app.innerHTML = content;
  app.setAttribute('class', 'page-start')

  updateImageLinks();
  formAction();
};
startApp();

document.querySelector("header").onclick = () => startApp();

