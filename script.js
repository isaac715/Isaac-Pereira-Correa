/* =============================================
   PORTFÓLIO - ISAAC PEREIRA CORREA
   Script principal
   ============================================= */

// --- Marca o link de navegação da página atual como ativo ---
function marcarLinkAtivo() {
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pagina) {
      link.classList.add('ativo');
    }
  });
}

// --- Alternância de tema claro / escuro ---
function iniciarTema() {
  const btn = document.getElementById('btn-tema');
  // Carrega preferência salva ou padrão claro
  const temaSalvo = localStorage.getItem('tema') || 'claro';
  aplicarTema(temaSalvo);

  btn.addEventListener('click', () => {
    const temaAtual = document.body.classList.contains('dark') ? 'escuro' : 'claro';
    const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
    aplicarTema(novoTema);
    localStorage.setItem('tema', novoTema);
  });
}

function aplicarTema(tema) {
  const btn = document.getElementById('btn-tema');
  if (tema === 'escuro') {
    document.body.classList.add('dark');
    btn.textContent = '☀️ Claro';
  } else {
    document.body.classList.remove('dark');
    btn.textContent = '🌙 Escuro';
  }
}

// --- Menu hambúrguer (mobile) ---
function iniciarMenuMobile() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    const aberto = navLinks.classList.toggle('aberto');
    hamburger.setAttribute('aria-expanded', aberto);
  });

  // Fecha o menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('aberto');
    });
  });
}

// --- Validação e envio do formulário de contato ---
function iniciarFormulario() {
  const form    = document.getElementById('form-contato');
  if (!form) return; // só existe na página contato.html

  const modal   = document.getElementById('modal-sucesso');
  const btnFechar = document.getElementById('btn-fechar-modal');

  // Fecha o modal ao clicar no botão
  btnFechar.addEventListener('click', () => {
    modal.classList.remove('ativo');
  });

  // Fecha o modal ao clicar fora da caixa
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('ativo');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita recarregar a página

    let valido = true;

    // --- Validação do campo Nome ---
    const nome = document.getElementById('nome');
    const erroNome = document.getElementById('erro-nome');
    if (nome.value.trim().length < 3) {
      erroNome.style.display = 'block';
      nome.style.borderColor = '#e53e3e';
      valido = false;
    } else {
      erroNome.style.display = 'none';
      nome.style.borderColor = '';
    }

    // --- Validação do campo E-mail ---
    const email = document.getElementById('email');
    const erroEmail = document.getElementById('erro-email');
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // formato usuario@dominio.com
    if (!regexEmail.test(email.value.trim())) {
      erroEmail.style.display = 'block';
      email.style.borderColor = '#e53e3e';
      valido = false;
    } else {
      erroEmail.style.display = 'none';
      email.style.borderColor = '';
    }

    // --- Validação do campo Mensagem ---
    const mensagem = document.getElementById('mensagem');
    const erroMsg  = document.getElementById('erro-mensagem');
    if (mensagem.value.trim().length < 10) {
      erroMsg.style.display = 'block';
      mensagem.style.borderColor = '#e53e3e';
      valido = false;
    } else {
      erroMsg.style.display = 'none';
      mensagem.style.borderColor = '';
    }

    // --- Se tudo válido: limpa o formulário e exibe modal ---
    if (valido) {
      form.reset();
      modal.classList.add('ativo');
    }
  });
}

// --- Inicializa tudo quando o DOM estiver pronto ---
document.addEventListener('DOMContentLoaded', () => {
  marcarLinkAtivo();
  iniciarTema();
  iniciarMenuMobile();
  iniciarFormulario();
});
