const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfHpBeozDZ9kAQlrQ4tMLSN8jCZtaHtOuc6nSd0FnskY6GL4Q/formResponse";
const NAME_ENTRY_ID = "entry.405434383";
const ACCOMPANIMENT_ENTRY_ID = "entry.1611922384";

document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault(); // IMPEDE O REDIRECIONAMENTO

    const form = event.target;
    const nome = document.getElementById('nome').value;
    const acompanhantes = document.getElementById('acompanhantes').value;
    const messageDisplay = document.getElementById('form-message');
    
    const rootStyles = getComputedStyle(document.documentElement);
    const colorTropicalGreen = rootStyles.getPropertyValue('--color-tropical-green') || 'green';
    
    // Verifica nome vazio
    if (nome.trim() === '') {
        messageDisplay.textContent = 'Por favor, digite seu nome.';
        messageDisplay.style.color = 'red';
        return;
    }
    
    // Cria os dados no formato URL-Encoded para o Google Forms
    const data = new URLSearchParams();
    data.append(NAME_ENTRY_ID, nome);
    data.append(ACCOMPANIMENT_ENTRY_ID, acompanhantes);
    
    // Envia os dados silenciosamente usando fetch
    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors', // Necessário para evitar erro de CORS em envios para o Google Forms
        body: data
    })
    .then(response => {
        // O Google Forms retorna uma resposta opaca com 'no-cors', 
        // mas se a requisição for feita, é considerada sucesso.
        
        //Exibe a mensagem de sucesso na página
        messageDisplay.textContent = `Obrigado, ${nome}! Sua presença e a de ${acompanhantes} acompanhante(s) foram registradas. Nos vemos na ilha! 🌺`;
        messageDisplay.style.color = colorTropicalGreen;

        // Limpa o formulário após o sucesso
        form.reset();
        
        console.log("RSVP enviado com sucesso para o Google Forms!");
    })
    .catch(error => {
        // Em caso de falha 
        messageDisplay.textContent = 'Erro ao enviar. Por favor, tente novamente ou contate os pais.';
        messageDisplay.style.color = 'red';
        console.error('Erro no envio do RSVP:', error);
    });
});