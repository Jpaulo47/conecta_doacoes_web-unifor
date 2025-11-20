/**
 * Fix DEFINITIVO para menu mobile - Conecta Doações
 * Solução: Interceptar cliques e forçar navegação + fechamento
 */

(function() {
    'use strict';
    
    console.log('🚀 [MENU FIX] Iniciando...');
    
    // Função para fechar menu IMEDIATAMENTE
    function forceCloseMenu() {
        const menu = document.getElementById('navbarNav');
        const toggler = document.querySelector('.navbar-toggler');
        const backdrop = document.querySelector('.navbar-backdrop');
        
        if (menu) {
            // Remover TODAS as classes relacionadas
            menu.classList.remove('show', 'showing', 'collapsing');
            menu.style.display = 'none';
            menu.style.visibility = 'hidden';
            menu.style.height = '0';
        }
        
        if (toggler) {
            toggler.classList.add('collapsed');
            toggler.setAttribute('aria-expanded', 'false');
        }
        
        // Remover qualquer backdrop
        if (backdrop) {
            backdrop.remove();
        }
        
        // Restaurar scroll do body
        document.body.style.overflow = '';
        
        console.log('✅ [MENU FIX] Menu fechado!');
    }
    
    // Função principal para setup
    function setup() {
        const menu = document.getElementById('navbarNav');
        
        if (!menu) {
            console.warn('⚠️ [MENU FIX] Menu não encontrado, tentando novamente...');
            return false;
        }
        
        console.log('📋 [MENU FIX] Configurando...');
        
        // Pegar TODOS os links dentro do navbar
        const links = menu.querySelectorAll('a');
        console.log(`📍 [MENU FIX] ${links.length} links encontrados`);
        
        links.forEach((link, index) => {
            // Remover listeners antigos (se existirem)
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Adicionar novo listener
            newLink.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir navegação padrão
                e.stopPropagation(); // Parar propagação
                
                const href = this.getAttribute('href');
                const linkText = this.textContent.trim();
                
                console.log(`🖱️ [MENU FIX] Link clicado: "${linkText}" → ${href}`);
                
                // 1. Fechar menu IMEDIATAMENTE
                forceCloseMenu();
                
                // 2. Navegar após pequeno delay
                if (href && href !== '#') {
                    setTimeout(() => {
                        console.log(`🔄 [MENU FIX] Navegando para: ${href}`);
                        window.location.href = href;
                    }, 50);
                } else if (this.id === 'btn-logout') {
                    // Caso especial para logout
                    console.log('🚪 [MENU FIX] Logout detectado');
                    // O evento de logout será tratado pelo auth.js
                }
            }, false);
        });
        
        // TAMBÉM fechar ao clicar fora
        document.addEventListener('click', function(e) {
            const menu = document.getElementById('navbarNav');
            const toggler = document.querySelector('.navbar-toggler');
            
            if (!menu || !toggler) return;
            
            const isMenuClick = menu.contains(e.target);
            const isTogglerClick = toggler.contains(e.target);
            const isMenuOpen = menu.classList.contains('show');
            
            if (!isMenuClick && !isTogglerClick && isMenuOpen) {
                console.log('👆 [MENU FIX] Clique fora do menu');
                forceCloseMenu();
            }
        });
        
        console.log('✅ [MENU FIX] Setup completo!');
        return true;
    }
    
    // Tentar configurar múltiplas vezes
    let attempts = 0;
    const maxAttempts = 10;
    
    function trySetup() {
        attempts++;
        console.log(`🔄 [MENU FIX] Tentativa ${attempts}/${maxAttempts}`);
        
        if (setup()) {
            console.log('🎉 [MENU FIX] Configurado com sucesso!');
        } else if (attempts < maxAttempts) {
            setTimeout(trySetup, 200);
        } else {
            console.error('❌ [MENU FIX] Falha após ' + maxAttempts + ' tentativas');
        }
    }
    
    // Iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trySetup);
    } else {
        trySetup();
    }
    
})();
