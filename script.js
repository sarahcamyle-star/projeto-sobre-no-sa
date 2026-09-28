// Abas "Como agir" (só roda se a página tiver o componente)
const tabs = document.querySelectorAll('.tab-btn');
if (tabs.length) {
  const panels = {
    'tab-vitima': document.getElementById('painel-vitima'),
    'tab-testemunha': document.getElementById('painel-testemunha'),
    'tab-responsavel': document.getElementById('painel-responsavel')
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      Object.values(panels).forEach(p => p && p.classList.remove('active'));
      tab.setAttribute('aria-selected', 'true');
      panels[tab.id] && panels[tab.id].classList.add('active');
    });
  });
}

// Barras de estatística animam ao entrar na tela (só na página de dados)
const bars = document.querySelectorAll('.bar-fill');
if (bars.length) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(bar => barObserver.observe(bar));
}

// Validação do formulário (só na página de contato)
const form = document.getElementById('help-form');
if (form) {
  const success = document.getElementById('form-success');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const nome = document.getElementById('nome');
    const errNome = document.getElementById('err-nome');
    if (nome.value.trim().length < 2) {
      errNome.textContent = 'Digite um nome ou apelido.';
      valid = false;
    } else { errNome.textContent = ''; }

    const contatoCampo = document.getElementById('contato-campo');
    const errContato = document.getElementById('err-contato');
    const val = contatoCampo.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s()+-]{8,}$/;
    if (!(emailRegex.test(val) || phoneRegex.test(val))) {
      errContato.textContent = 'Informe um e-mail ou telefone válido.';
      valid = false;
    } else { errContato.textContent = ''; }

    const mensagem = document.getElementById('mensagem');
    const errMensagem = document.getElementById('err-mensagem');
    if (mensagem.value.trim().length < 10) {
      errMensagem.textContent = 'Conte um pouco mais sobre a situação (mínimo 10 caracteres).';
      valid = false;
    } else { errMensagem.textContent = ''; }

    if (valid) {
      success.classList.add('show');
      form.reset();
    } else {
      success.classList.remove('show');
    }
  });
}

// Marca o link de navegação da página atual
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .footer-grid a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.setAttribute('aria-current', 'page');
  }
});
