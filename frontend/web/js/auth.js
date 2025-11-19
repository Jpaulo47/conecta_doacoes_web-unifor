// Módulo de Autenticação - Conecta Doações
// Gerencia cadastro, login, logout e estado de autenticação

import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    doc, 
    setDoc, 
    getDoc,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

/**
 * Cadastra um novo usuário no sistema
 * @param {string} name - Nome completo do usuário
 * @param {string} email - E-mail do usuário
 * @param {string} password - Senha do usuário
 * @param {string} location - Localização (cidade/bairro)
 * @returns {Promise<Object>} Dados do usuário criado
 */
export async function signUp(name, email, password, address = {}) {
    try {
        // Criar usuário no Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Atualizar perfil com nome
        await updateProfile(user, {
            displayName: name
        });

        // Preparar dados do usuário
        const userData = {
            uid: user.uid,
            name: name,
            email: email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        // Se address é string (compatibilidade com código antigo)
        if (typeof address === 'string') {
            userData.location = address;
        } else if (address && typeof address === 'object') {
            // Salvar endereço completo
            userData.address = {
                cep: address.cep || '',
                logradouro: address.logradouro || '',
                numero: address.numero || '',
                complemento: address.complemento || '',
                bairro: address.bairro || '',
                cidade: address.cidade || '',
                uf: address.uf || ''
            };
            // Manter location para compatibilidade
            userData.location = address.location || `${address.cidade || ''}, ${address.uf || ''} - ${address.bairro || ''}`;
        }

        // Criar documento do usuário no Firestore
        await setDoc(doc(db, 'users', user.uid), userData);

        console.log('✅ Usuário cadastrado com sucesso:', user.uid);
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Erro ao cadastrar usuário:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

/**
 * Realiza login de um usuário existente
 * @param {string} email - E-mail do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<Object>} Dados do usuário logado
 */
export async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log('✅ Login realizado com sucesso:', user.uid);
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Erro ao fazer login:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

/**
 * Realiza logout do usuário atual
 * @returns {Promise<Object>} Status do logout
 */
export async function signOutUser() {
    try {
        await signOut(auth);
        console.log('✅ Logout realizado com sucesso');
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao fazer logout:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

/**
 * Envia e-mail de recuperação de senha
 * @param {string} email - E-mail do usuário
 * @returns {Promise<Object>} Status do envio
 */
export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log('✅ E-mail de recuperação enviado para:', email);
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao enviar e-mail de recuperação:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

/**
 * Obtém dados completos do usuário do Firestore
 * @param {string} userId - ID do usuário
 * @returns {Promise<Object>} Dados do usuário
 */
export async function getUserData(userId) {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return { success: true, data: userDoc.data() };
        } else {
            return { success: false, error: 'Usuário não encontrado' };
        }
    } catch (error) {
        console.error('❌ Erro ao buscar dados do usuário:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Atualiza o perfil do usuário no Firestore
 * @param {string} uid - ID do usuário
 * @param {Object} data - Dados para atualizar
 * @returns {Promise<Object>} Resultado da operação
 */
export async function updateUserProfile(uid, data) {
    try {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, {
            ...data,
            updatedAt: serverTimestamp()
        }, { merge: true });
        
        console.log('✅ Perfil atualizado com sucesso');
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao atualizar perfil:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Obtém o usuário atualmente autenticado
 * @returns {Object|null} Usuário atual ou null
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Verifica se há um usuário autenticado
 * @returns {boolean} True se há usuário logado
 */
export function isUserLoggedIn() {
    return auth.currentUser !== null;
}

/**
 * Monitora mudanças no estado de autenticação e atualiza a UI
 */
export function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
        updateNavbar(user);
        
        // Redirecionar se necessário
        const protectedPages = ['meus-itens.html', 'nova-doacao.html', 'mensagens.html', 'perfil.html', 'editar-item.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (!user && protectedPages.includes(currentPage)) {
            // Usuário não autenticado tentando acessar página protegida
            alert('Você precisa estar logado para acessar esta página.');
            window.location.href = 'login.html';
        }
    });
}

/**
 * Atualiza a navbar baseado no estado de autenticação
 * @param {Object|null} user - Usuário autenticado ou null
 */
function updateNavbar(user) {
    // Elementos da navbar
    const navLogin = document.getElementById('nav-login');
    const navRegister = document.getElementById('nav-register');
    const navMeusItens = document.getElementById('nav-meus-itens');
    const navMensagens = document.getElementById('nav-mensagens');
    const navPerfil = document.getElementById('nav-perfil');
    const navNovaDoacao = document.getElementById('nav-nova-doacao');
    const navLogout = document.getElementById('nav-logout');

    if (user) {
        // Usuário logado: mostrar opções de usuário autenticado
        if (navLogin) navLogin.classList.add('d-none');
        if (navRegister) navRegister.classList.add('d-none');
        if (navMeusItens) navMeusItens.classList.remove('d-none');
        if (navMensagens) navMensagens.classList.remove('d-none');
        if (navPerfil) navPerfil.classList.remove('d-none');
        if (navNovaDoacao) navNovaDoacao.classList.remove('d-none');
        if (navLogout) navLogout.classList.remove('d-none');
    } else {
        // Usuário não logado: mostrar opções de login/cadastro
        if (navLogin) navLogin.classList.remove('d-none');
        if (navRegister) navRegister.classList.remove('d-none');
        if (navMeusItens) navMeusItens.classList.add('d-none');
        if (navMensagens) navMensagens.classList.add('d-none');
        if (navPerfil) navPerfil.classList.add('d-none');
        if (navNovaDoacao) navNovaDoacao.classList.add('d-none');
        if (navLogout) navLogout.classList.add('d-none');
    }
}

/**
 * Converte códigos de erro do Firebase em mensagens amigáveis
 * @param {string} errorCode - Código de erro do Firebase
 * @returns {string} Mensagem de erro amigável
 */
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/invalid-email': 'E-mail inválido.',
        'auth/operation-not-allowed': 'Operação não permitida.',
        'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres.',
        'auth/user-disabled': 'Este usuário foi desativado.',
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-credential': 'Credenciais inválidas. Verifique seu e-mail e senha.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.'
    };
    
    return errorMessages[errorCode] || 'Erro desconhecido. Tente novamente.';
}

/**
 * Configura o botão de logout na navbar
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', async (e) => {
            e.preventDefault();
            const result = await signOutUser();
            if (result.success) {
                window.location.href = 'index.html';
            }
        });
    }
});

// Exportar auth state listener e auth para uso em outras páginas
export { onAuthStateChanged, auth };

