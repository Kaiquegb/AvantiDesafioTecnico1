// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade de busca
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResult = document.getElementById('search-result');
    
    // Função para realizar a busca
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm !== '') {
            searchResult.innerHTML = `<p>Você buscou por: '${searchTerm}'</p>`;
            searchResult.style.display = 'block';
        } else {
            searchResult.style.display = 'none';
        }
    }
    
    // Event listener para o botão de busca
    searchButton.addEventListener('click', performSearch);
    
    // Event listener para a tecla Enter no campo de busca
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Configuração dos carrosséis
    setupCarousel('products-carousel-1', 'prev-button-1', 'next-button-1');
    setupCarousel('products-carousel-2', 'prev-button-2', 'next-button-2');
    
    // Função para configurar um carrossel
    function setupCarousel(carouselId, prevButtonId, nextButtonId) {
        const carousel = document.getElementById(carouselId);
        const prevButton = document.getElementById(prevButtonId);
        const nextButton = document.getElementById(nextButtonId);
        
        if (!carousel || !prevButton || !nextButton) return;
        
        // Configuração do carrossel
        const cardWidth = carousel.querySelector('.product-card').offsetWidth + 20; // Largura do card + gap
        const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
        
        // Função para mover o carrossel
        function scrollCarousel(direction) {
            const scrollAmount = cardWidth * (direction === 'next' ? 1 : -1);
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
        
        // Event listeners para os botões de navegação
        nextButton.addEventListener('click', function() {
            scrollCarousel('next');
        });
        
        prevButton.addEventListener('click', function() {
            scrollCarousel('prev');
        });
        
        // Verificar se há mais cards para mostrar
        function checkButtons() {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            prevButton.style.opacity = carousel.scrollLeft <= 0 ? '0.5' : '1';
            nextButton.style.opacity = carousel.scrollLeft >= maxScroll ? '0.5' : '1';
        }
        
        // Verificar botões ao carregar e ao rolar
        carousel.addEventListener('scroll', checkButtons);
        window.addEventListener('resize', function() {
            // Recalcular valores ao redimensionar a janela
            const cardWidth = carousel.querySelector('.product-card').offsetWidth + 20;
            checkButtons();
        });
        
        // Inicializar estado dos botões
        checkButtons();
    }
    
    // Adicionar funcionalidade aos botões "ADICIONAR AO CARRINHO"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obter informações do produto
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Exibir mensagem de confirmação
            alert(`Produto "${productName}" adicionado ao carrinho!`);
            
            // Atualizar contador do carrinho (opcional)
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
            }
        });
    });
    
    // Formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            
            if (nameInput && emailInput) {
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                
                if (name && email) {
                    alert(`Obrigado ${name}! Você foi cadastrado na nossa newsletter com o e-mail ${email}.`);
                    this.reset();
                }
            }
        });
    }
});