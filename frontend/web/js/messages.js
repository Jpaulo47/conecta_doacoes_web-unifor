// Módulo de Mensagens - Conecta Doações
// Gerencia sistema de mensagens entre usuários

import { db, auth } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    getDoc,
    doc,
    updateDoc,
    query,
    where,
    orderBy,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

/**
 * Envia uma mensagem para o dono de um item
 * @param {string} donationId - ID do item
 * @param {string} receiverId - ID do dono do item
 * @param {string} messageText - Texto da mensagem
 * @param {string} replyToMessageId - ID da mensagem original (opcional, para respostas)
 * @returns {Promise<Object>} Resultado da operação
 */
export async function sendMessage(donationId, receiverId, messageText, replyToMessageId = null) {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        // Verificar se está tentando enviar mensagem para si mesmo
        if (user.uid === receiverId) {
            return { success: false, error: 'Você não pode enviar mensagem para seu próprio item.' };
        }

        if (!messageText || messageText.trim().length === 0) {
            return { success: false, error: 'Mensagem não pode estar vazia' };
        }

        // Buscar dados do receptor para desnormalização
        let receiverName = 'Usuário';
        let receiverEmail = '';
        try {
            const { getUserData } = await import('./auth.js');
            const receiverData = await getUserData(receiverId);
            if (receiverData.success && receiverData.data) {
                receiverName = receiverData.data.name || 'Usuário';
                receiverEmail = receiverData.data.email || '';
            }
        } catch (error) {
            console.warn('⚠️ Erro ao buscar dados do receptor:', error);
        }

        const message = {
            donationId: donationId,
            senderId: user.uid,
            receiverId: receiverId,
            message: messageText.trim(),
            senderName: user.displayName || 'Usuário',
            senderEmail: user.email,
            receiverName: receiverName, // Desnormalizado
            receiverEmail: receiverEmail, // Desnormalizado
            read: false,
            replyToMessageId: replyToMessageId || null, // ID da mensagem original (se for resposta)
            createdAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, 'messages'), message);
        console.log('✅ Mensagem enviada com sucesso:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('❌ Erro ao enviar mensagem:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Busca mensagens recebidas por um usuário
 * @param {string} userId - ID do usuário
 * @param {boolean} unreadOnly - Se true, busca apenas não lidas
 * @returns {Promise<Array>} Lista de mensagens
 */
export async function getReceivedMessages(userId, unreadOnly = false) {
    try {
        console.log('📬 Buscando mensagens para usuário:', userId);
        console.log('   - Apenas não lidas:', unreadOnly);
        
        // Buscar todas as mensagens sem orderBy para evitar necessidade de índice
        let q = query(
            collection(db, 'messages'),
            where('receiverId', '==', userId)
        );

        // Se quiser apenas não lidas
        if (unreadOnly) {
            q = query(
                collection(db, 'messages'),
                where('receiverId', '==', userId),
                where('read', '==', false)
            );
        }

        const querySnapshot = await getDocs(q);
        let messages = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            messages.push({
                id: doc.id,
                ...data
            });
            console.log('   📨 Mensagem encontrada:', doc.id, '- Lida:', data.read);
        });

        // Ordenar no JavaScript para evitar necessidade de índice composto
        messages.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
            return dateB - dateA; // Mais recente primeiro
        });

        console.log(`✅ ${messages.length} mensagem(ns) carregada(s)`);
        return messages;
    } catch (error) {
        console.error('❌ Erro ao buscar mensagens:', error);
        console.error('   Detalhes do erro:', error.message);
        console.error('   Código do erro:', error.code);
        
        // Se for erro de índice, tentar sem orderBy
        if (error.code === 'failed-precondition' || error.message.includes('index')) {
            console.log('⚠️ Tentando buscar mensagens sem orderBy...');
            try {
                const q = query(
                    collection(db, 'messages'),
                    where('receiverId', '==', userId)
                );
                const querySnapshot = await getDocs(q);
                let messages = [];
                
                querySnapshot.forEach((doc) => {
                    messages.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                
                // Ordenar no JavaScript
                messages.sort((a, b) => {
                    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
                    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
                    return dateB - dateA;
                });
                
                console.log(`✅ ${messages.length} mensagem(ns) carregada(s) (sem orderBy)`);
                return messages;
            } catch (retryError) {
                console.error('❌ Erro ao buscar mensagens (retry):', retryError);
                return [];
            }
        }
        
        return [];
    }
}

/**
 * Busca mensagens enviadas por um usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise<Array>} Lista de mensagens enviadas
 */
export async function getSentMessages(userId) {
    try {
        console.log('📤 Buscando mensagens enviadas para:', userId);
        
        // Tentar com orderBy primeiro
        try {
            const q = query(
                collection(db, 'messages'),
                where('senderId', '==', userId),
                orderBy('createdAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            let messages = [];
            
            querySnapshot.forEach((doc) => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Ordenar por data (mais recente primeiro)
            messages.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
                return dateB - dateA; // Mais recente primeiro
            });

            console.log(`✅ ${messages.length} mensagem(ns) enviada(s) carregada(s)`);
            return messages;
        } catch (error) {
            // Se falhar (provavelmente por falta de índice), tentar sem orderBy
            if (error.code === 'failed-precondition' || error.message.includes('index')) {
                console.log('⚠️ Tentando buscar mensagens enviadas sem orderBy...');
                const q = query(
                    collection(db, 'messages'),
                    where('senderId', '==', userId)
                );

                const querySnapshot = await getDocs(q);
                let messages = [];
                
                querySnapshot.forEach((doc) => {
                    messages.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                // Ordenar por data em JavaScript (mais recente primeiro)
                messages.sort((a, b) => {
                    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
                    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
                    return dateB - dateA; // Mais recente primeiro
                });

                console.log(`✅ ${messages.length} mensagem(ns) enviada(s) carregada(s) (sem orderBy)`);
                return messages;
            }
            throw error;
        }
    } catch (error) {
        console.error('❌ Erro ao buscar mensagens enviadas:', error);
        console.error('   Detalhes do erro:', error.message);
        console.error('   Código do erro:', error.code);
        return [];
    }
}

/**
 * Envia uma resposta para uma mensagem recebida
 * @param {Object} originalMessage - Mensagem original a ser respondida
 * @param {string} replyText - Texto da resposta
 * @returns {Promise<Object>} Resultado da operação
 */
export async function replyToMessage(originalMessage, replyText) {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        // Na resposta, o receiverId vira senderId e vice-versa
        const newReceiverId = originalMessage.senderId;
        
        // Verificar se não está tentando responder a si mesmo
        if (user.uid === newReceiverId) {
            return { success: false, error: 'Você não pode responder para si mesmo.' };
        }

        return await sendMessage(
            originalMessage.donationId,
            newReceiverId,
            replyText,
            originalMessage.id // ID da mensagem original
        );
    } catch (error) {
        console.error('❌ Erro ao responder mensagem:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Busca mensagens relacionadas a um item específico
 * @param {string} donationId - ID do item
 * @returns {Promise<Array>} Lista de mensagens
 */
export async function getMessagesByDonation(donationId) {
    try {
        const q = query(
            collection(db, 'messages'),
            where('donationId', '==', donationId),
            orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        let messages = [];
        
        querySnapshot.forEach((doc) => {
            messages.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log(`✅ ${messages.length} mensagem(ns) do item carregada(s)`);
        return messages;
    } catch (error) {
        console.error('❌ Erro ao buscar mensagens do item:', error);
        return [];
    }
}

/**
 * Marca uma mensagem como lida
 * @param {string} messageId - ID da mensagem
 * @returns {Promise<Object>} Resultado da operação
 */
export async function markAsRead(messageId) {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        await updateDoc(doc(db, 'messages', messageId), {
            read: true
        });

        console.log('✅ Mensagem marcada como lida:', messageId);
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao marcar mensagem como lida:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Conta mensagens não lidas de um usuário
 * @param {string} userId - ID do usuário
 * @returns {Promise<number>} Número de mensagens não lidas
 */
export async function getUnreadCount(userId) {
    try {
        const messages = await getReceivedMessages(userId, true);
        return messages.length;
    } catch (error) {
        console.error('❌ Erro ao contar mensagens não lidas:', error);
        return 0;
    }
}

/**
 * Carrega e exibe mensagens na página de caixa de mensagens
 * @param {string} filter - Filtro: 'all', 'read', 'unread'
 */
/**
 * Agrupa mensagens em conversas (canais)
 * @param {Array} messages - Lista de mensagens
 * @param {string} currentUserId - ID do usuário logado
 * @returns {Object} Objeto com conversas agrupadas por chave
 */
function groupMessagesByConversation(messages, currentUserId) {
    const conversations = {};
    
    for (const message of messages) {
        // Criar chave única para a conversa: donationId + participantes ordenados
        const participants = [message.senderId, message.receiverId].sort();
        const conversationKey = `${message.donationId}_${participants[0]}_${participants[1]}`;
        
        if (!conversations[conversationKey]) {
            // Determinar o outro participante (não o usuário atual)
            const otherParticipantId = message.senderId === currentUserId ? message.receiverId : message.senderId;
            const otherParticipantName = message.senderId === currentUserId ? message.receiverName || 'Usuário' : message.senderName || 'Usuário';
            const otherParticipantEmail = message.senderId === currentUserId ? message.receiverEmail : message.senderEmail;
            
            conversations[conversationKey] = {
                key: conversationKey,
                donationId: message.donationId,
                participantId: otherParticipantId,
                participantName: otherParticipantName,
                participantEmail: otherParticipantEmail,
                messages: [],
                hasUnread: false,
                lastMessageDate: null
            };
        }
        
        conversations[conversationKey].messages.push(message);
        
        // Verificar se tem mensagem não lida
        if (!message.read && message.receiverId === currentUserId) {
            conversations[conversationKey].hasUnread = true;
        }
        
        // Atualizar data da última mensagem
        const messageDate = message.createdAt?.toDate ? message.createdAt.toDate() : (message.createdAt ? new Date(message.createdAt) : new Date(0));
        if (!conversations[conversationKey].lastMessageDate || messageDate > conversations[conversationKey].lastMessageDate) {
            conversations[conversationKey].lastMessageDate = messageDate;
        }
    }
    
    // Ordenar mensagens dentro de cada conversa
    for (const key in conversations) {
        conversations[key].messages.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
            return dateA - dateB; // Mais antiga primeiro
        });
    }
    
    return conversations;
}

export async function loadMessagesPage(filter = 'all') {
    console.log('📋 Carregando página de mensagens, filtro:', filter);
    
    const user = auth.currentUser;
    if (!user) {
        console.warn('⚠️ Usuário não autenticado, redirecionando para login');
        window.location.href = 'login.html';
        return;
    }

    console.log('👤 Usuário autenticado:', user.uid);

    const messagesContainer = document.getElementById('messages-container');
    const loading = document.getElementById('loading');
    const noMessages = document.getElementById('no-messages');

    if (!messagesContainer) {
        console.error('❌ Elemento messages-container não encontrado!');
        return;
    }

    console.log('📦 Elementos encontrados:', {
        messagesContainer: !!messagesContainer,
        loading: !!loading,
        noMessages: !!noMessages
    });

    // Mostrar loading
    if (loading) loading.classList.remove('d-none');
    if (noMessages) noMessages.classList.add('d-none');
    if (messagesContainer) messagesContainer.classList.add('d-none');

    try {
        // Buscar mensagens recebidas E enviadas para agrupar conversas
        console.log('🔍 Buscando mensagens...');
        const receivedMessages = await getReceivedMessages(user.uid);
        const sentMessages = await getSentMessages(user.uid);
        
        // Combinar todas as mensagens
        const allMessages = [...receivedMessages, ...sentMessages];
        console.log('📨 Mensagens recebidas:', receivedMessages.length);
        console.log('📤 Mensagens enviadas:', sentMessages.length);
        console.log('📨 Total de mensagens:', allMessages.length);

        // Agrupar mensagens em conversas
        const conversations = groupMessagesByConversation(allMessages, user.uid);
        const conversationKeys = Object.keys(conversations);
        console.log('💬 Conversas encontradas:', conversationKeys.length);

        // Filtrar conversas se necessário
        let filteredConversations = Object.values(conversations);
        if (filter === 'read') {
            filteredConversations = filteredConversations.filter(conv => !conv.hasUnread);
            console.log('📋 Conversas lidas após filtro:', filteredConversations.length);
        } else if (filter === 'unread') {
            filteredConversations = filteredConversations.filter(conv => conv.hasUnread);
            console.log('📋 Conversas não lidas após filtro:', filteredConversations.length);
        }

        // Ordenar conversas por data da última mensagem (mais recente primeiro)
        filteredConversations.sort((a, b) => {
            if (!a.lastMessageDate) return 1;
            if (!b.lastMessageDate) return -1;
            return b.lastMessageDate - a.lastMessageDate;
        });

        // Esconder loading
        if (loading) loading.classList.add('d-none');

        // Limpar container
        messagesContainer.innerHTML = '';

        if (filteredConversations.length === 0) {
            console.log('📭 Nenhuma conversa encontrada');
            if (noMessages) noMessages.classList.remove('d-none');
            if (messagesContainer) messagesContainer.classList.add('d-none');
            return;
        }

        console.log(`✨ Renderizando ${filteredConversations.length} conversa(s)...`);

        // Mostrar container
        if (messagesContainer) messagesContainer.classList.remove('d-none');
        if (noMessages) noMessages.classList.add('d-none');

        // Renderizar conversas
        for (const conversation of filteredConversations) {
            try {
                const card = await createConversationCard(conversation, user.uid);
                if (card) {
                    messagesContainer.appendChild(card);
                    console.log('✅ Card de conversa adicionado:', conversation.key);
                } else {
                    console.warn('⚠️ Card de conversa é null:', conversation.key);
                }
            } catch (cardError) {
                console.error('❌ Erro ao criar card de conversa:', conversation.key, cardError);
            }
        }

        console.log('✅ Página de mensagens carregada com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao carregar página de mensagens:', error);
        if (loading) loading.classList.add('d-none');
        if (noMessages) {
            noMessages.innerHTML = `
                <i class="bi bi-exclamation-triangle" style="font-size: 64px; color: #dc3545;"></i>
                <h4 class="mt-3 text-danger">Erro ao carregar mensagens</h4>
                <p class="text-muted">${error.message}</p>
                <button class="btn btn-success" onclick="location.reload()">
                    <i class="bi bi-arrow-clockwise"></i> Tentar Novamente
                </button>
            `;
            noMessages.classList.remove('d-none');
        }
    }
}

/**
 * Cria um card HTML para uma conversa completa
 * @param {Object} conversation - Dados da conversa (participante, mensagens, etc)
 * @param {string} currentUserId - ID do usuário logado
 * @returns {Promise<HTMLElement>} Elemento HTML do card
 */
async function createConversationCard(conversation, currentUserId) {
    try {
        console.log('💬 Criando card de conversa:', conversation.key);
        
        // Buscar informações do item
        let donationTitle = 'Item não encontrado';
        try {
            if (conversation.donationId) {
                const { getDonationById } = await import('./donations.js');
                const donationResult = await getDonationById(conversation.donationId);
                if (donationResult.success) {
                    donationTitle = donationResult.data.title || 'Item sem título';
                }
            }
        } catch (error) {
            console.error('❌ Erro ao buscar item:', error);
            donationTitle = 'Erro ao carregar item';
        }

        // Escapar HTML para evitar XSS
        const escapeHtml = (text) => {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return String(text).replace(/[&<>"']/g, m => map[m]);
        };

        // Formatar data da última mensagem
        let lastMessageDateStr = 'Data não disponível';
        if (conversation.lastMessageDate) {
            try {
                const date = conversation.lastMessageDate;
                const now = new Date();
                const diffMs = now - date;
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                
                if (diffDays === 0) {
                    lastMessageDateStr = 'Hoje às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                } else if (diffDays === 1) {
                    lastMessageDateStr = 'Ontem às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                } else if (diffDays < 7) {
                    lastMessageDateStr = date.toLocaleDateString('pt-BR', { weekday: 'short' }) + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                } else {
                    lastMessageDateStr = date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                }
            } catch (dateError) {
                console.warn('⚠️ Erro ao formatar data:', dateError);
            }
        }

        // Contar mensagens não lidas
        const unreadCount = conversation.messages.filter(msg => !msg.read && msg.receiverId === currentUserId).length;

        const div = document.createElement('div');
        const conversationClass = conversation.hasUnread ? 'unread' : 'read';
        
        div.className = `conversation-card ${conversationClass} card mb-3 shadow-sm`;
        div.innerHTML = `
            <div class="card-body">
                <!-- Cabeçalho da Conversa -->
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="flex-grow-1">
                        <h5 class="mb-1">
                            <i class="bi bi-person-circle"></i> ${escapeHtml(conversation.participantName || 'Usuário')}
                            ${unreadCount > 0 ? `<span class="badge bg-primary ms-2">${unreadCount}</span>` : ''}
                        </h5>
                        <h6 class="text-muted mb-1">
                            <i class="bi bi-box"></i> Item: <strong>${escapeHtml(donationTitle)}</strong>
                        </h6>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> ${lastMessageDateStr}
                        </small>
                    </div>
                    <div>
                        ${conversation.donationId ? `
                        <a href="detalhes.html?id=${conversation.donationId}" 
                           class="btn btn-sm btn-outline-success mb-2">
                            <i class="bi bi-eye"></i> Ver Item
                        </a>
                        ` : ''}
                    </div>
                </div>

                <!-- Histórico de Mensagens (Thread) -->
                <div class="conversation-thread mb-3" id="thread-${conversation.key}">
                    ${conversation.messages.map((msg, index) => {
                        const isFromMe = msg.senderId === currentUserId;
                        const msgDate = msg.createdAt?.toDate ? msg.createdAt.toDate() : (msg.createdAt ? new Date(msg.createdAt) : new Date());
                        const msgDateStr = msgDate.toLocaleDateString('pt-BR') + ' às ' + msgDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                        
                        return `
                            <div class="message-bubble ${isFromMe ? 'message-sent' : 'message-received'} mb-2" data-message-id="${msg.id}">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div class="flex-grow-1">
                                        <div class="message-author small fw-bold mb-1">
                                            ${isFromMe ? 'Você' : escapeHtml(msg.senderName || 'Usuário')}
                                        </div>
                                        <div class="message-text">
                                            ${escapeHtml(msg.message || 'Mensagem vazia')}
                                        </div>
                                        <div class="message-date small text-muted mt-1">
                                            ${msgDateStr}
                                        </div>
                                    </div>
                                    ${!isFromMe && !msg.read ? `
                                    <button class="btn btn-sm btn-link p-0 ms-2 mark-read-btn" 
                                            data-message-id="${msg.id}" 
                                            title="Marcar como lida">
                                        <i class="bi bi-check2-all"></i>
                                    </button>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Formulário de Resposta -->
                <div class="reply-form-container mt-3 pt-3 border-top" id="reply-form-${conversation.key}">
                    <form class="reply-form" data-conversation-key="${conversation.key}">
                        <div class="mb-2">
                            <textarea class="form-control form-control-sm reply-textarea" 
                                     rows="2" 
                                     placeholder="Digite sua resposta..." 
                                     required 
                                     minlength="10"></textarea>
                            <div class="invalid-feedback small">
                                A resposta deve ter no mínimo 10 caracteres.
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-sm btn-success">
                                <i class="bi bi-send"></i> Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Adicionar event listeners
        setupConversationCardListeners(div, conversation, currentUserId);

        console.log('✅ Card de conversa criado com sucesso:', conversation.key);
        return div;
    } catch (error) {
        console.error('❌ Erro ao criar card de conversa:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mb-3';
        errorDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle"></i> 
            Erro ao carregar conversa: ${error.message}
        `;
        return errorDiv;
    }
}

/**
 * Configura event listeners para o card de conversa
 * @param {HTMLElement} card - Elemento do card
 * @param {Object} conversation - Dados da conversa
 * @param {string} currentUserId - ID do usuário logado
 */
function setupConversationCardListeners(card, conversation, currentUserId) {
    // Event listener para marcar mensagem como lida
    const markReadBtns = card.querySelectorAll('.mark-read-btn');
    markReadBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const messageId = btn.getAttribute('data-message-id');
            const result = await markAsRead(messageId);
            if (result.success) {
                const currentFilter = document.querySelector('input[name="message-filter"]:checked')?.value || 'all';
                loadMessagesPage(currentFilter);
            }
        });
    });

    // Event listener para enviar resposta
    const replyForm = card.querySelector('.reply-form');
    if (replyForm) {
        replyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!replyForm.checkValidity()) {
                replyForm.classList.add('was-validated');
                return;
            }

            const textarea = replyForm.querySelector('.reply-textarea');
            const replyText = textarea ? textarea.value.trim() : '';
            const submitBtn = replyForm.querySelector('button[type="submit"]');
            const replyFormContainer = card.querySelector(`#reply-form-${conversation.key}`);

            if (!replyText || replyText.length < 10) {
                replyForm.classList.add('was-validated');
                return;
            }

            // Loading
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
            }

            try {
                // Usar a última mensagem da conversa como referência
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                const result = await replyToMessage(lastMessage, replyText);

                if (result.success) {
                    // Resetar formulário
                    replyForm.reset();
                    replyForm.classList.remove('was-validated');
                    
                    // Recarregar mensagens
                    await new Promise(resolve => setTimeout(resolve, 500));
                    const currentFilter = document.querySelector('input[name="message-filter"]:checked')?.value || 'all';
                    await loadMessagesPage(currentFilter);
                } else {
                    // Mostrar erro
                    if (replyFormContainer) {
                        const existingAlerts = replyFormContainer.querySelectorAll('.alert');
                        existingAlerts.forEach(alert => alert.remove());
                        
                        const alertDiv = document.createElement('div');
                        alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-2';
                        alertDiv.innerHTML = `
                            <i class="bi bi-exclamation-triangle"></i> ${result.error || 'Erro ao enviar resposta.'}
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        `;
                        replyFormContainer.insertBefore(alertDiv, replyForm);
                    }
                }
            } catch (error) {
                console.error('Erro ao enviar resposta:', error);
                if (replyFormContainer) {
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-2';
                    alertDiv.innerHTML = `
                        <i class="bi bi-exclamation-triangle"></i> Erro ao enviar resposta: ${error.message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
                    replyFormContainer.insertBefore(alertDiv, replyForm);
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="bi bi-send"></i> Enviar';
                }
            }
        });
    }

    // Marcar como lida ao clicar nas mensagens recebidas
    const receivedMessages = card.querySelectorAll('.message-received');
    receivedMessages.forEach(msgDiv => {
        msgDiv.addEventListener('click', async (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            
            const messageId = msgDiv.getAttribute('data-message-id');
            const message = conversation.messages.find(m => m.id === messageId);
            
            if (message && !message.read && message.receiverId === currentUserId) {
                await markAsRead(messageId);
                const currentFilter = document.querySelector('input[name="message-filter"]:checked')?.value || 'all';
                loadMessagesPage(currentFilter);
            }
        });
    });
}

/**
 * Cria um card HTML para uma mensagem (mantido para compatibilidade, mas não usado mais)
 * @param {Object} message - Dados da mensagem
 * @returns {Promise<HTMLElement>} Elemento HTML do card
 * @deprecated Use createConversationCard instead
 */
async function createMessageCard(message) {
    try {
        console.log('🎴 Criando card para mensagem:', message.id);
        
        const div = document.createElement('div');

        const readClass = message.read ? 'read' : 'unread';
        const readBadge = message.read 
            ? '<span class="badge bg-secondary">Lida</span>' 
            : '<span class="badge bg-primary">Nova</span>';

        // Formatar data
        let dateStr = 'Data não disponível';
        if (message.createdAt) {
            try {
                const date = message.createdAt.toDate ? message.createdAt.toDate() : new Date(message.createdAt);
                dateStr = date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            } catch (dateError) {
                console.warn('⚠️ Erro ao formatar data:', dateError);
                dateStr = 'Data não disponível';
            }
        }

        // Buscar informações do item
        let donationTitle = 'Item não encontrado';
        try {
            if (message.donationId) {
                const { getDonationById } = await import('./donations.js');
                const donationResult = await getDonationById(message.donationId);
                if (donationResult.success) {
                    donationTitle = donationResult.data.title || 'Item sem título';
                }
            }
        } catch (error) {
            console.error('❌ Erro ao buscar item:', error);
            donationTitle = 'Erro ao carregar item';
        }

        // Escapar HTML para evitar XSS
        const escapeHtml = (text) => {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return String(text).replace(/[&<>"']/g, m => map[m]);
        };

        div.className = `message-card ${readClass} card mb-3 shadow-sm`;
        div.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5 class="mb-1">
                            <i class="bi bi-person-circle"></i> ${escapeHtml(message.senderName || 'Usuário')}
                        </h5>
                        <h6 class="text-muted mb-2">
                            <i class="bi bi-box"></i> Item: <strong>${escapeHtml(donationTitle)}</strong>
                        </h6>
                    </div>
                    ${readBadge}
                </div>
                <p class="mb-3">${escapeHtml(message.message || 'Mensagem vazia')}</p>
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <small class="text-muted">
                            <i class="bi bi-clock"></i> ${dateStr}
                        </small>
                        <br>
                        <small class="text-muted">
                            <i class="bi bi-envelope"></i> ${escapeHtml(message.senderEmail || 'N/A')}
                        </small>
                    </div>
                    <div>
                        ${message.donationId ? `
                        <a href="detalhes.html?id=${message.donationId}" 
                           class="btn btn-sm btn-outline-success">
                            <i class="bi bi-eye"></i> Ver Item
                        </a>
                        ` : ''}
                        <button class="btn btn-sm btn-outline-primary ms-2 reply-btn" 
                                data-message-id="${message.id}">
                            <i class="bi bi-reply"></i> Responder
                        </button>
                        ${!message.read ? `
                        <button class="btn btn-sm btn-primary ms-2 mark-read-btn" 
                                data-message-id="${message.id}">
                            <i class="bi bi-check2"></i> Marcar como Lida
                        </button>
                        ` : ''}
                    </div>
                </div>
                <!-- Formulário de Resposta (oculto por padrão) -->
                <div class="reply-form-container d-none mt-3 pt-3 border-top" id="reply-form-${message.id}">
                    <form class="reply-form" data-message-id="${message.id}">
                        <div class="mb-2">
                            <label class="form-label small fw-bold">Responder:</label>
                            <textarea class="form-control form-control-sm reply-textarea" 
                                     rows="3" 
                                     placeholder="Digite sua resposta..." 
                                     required 
                                     minlength="10"></textarea>
                            <div class="invalid-feedback small">
                                A resposta deve ter no mínimo 10 caracteres.
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-sm btn-success">
                                <i class="bi bi-send"></i> Enviar Resposta
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary cancel-reply-btn">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Adicionar event listener para marcar como lida
        const markReadBtn = div.querySelector('.mark-read-btn');
        if (markReadBtn) {
            markReadBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const result = await markAsRead(message.id);
                if (result.success) {
                    // Obter filtro atual
                    const currentFilter = document.querySelector('input[name="message-filter"]:checked')?.value || 'all';
                    loadMessagesPage(currentFilter);
                }
            });
        }

        // Adicionar event listener para responder mensagem
        const replyBtn = div.querySelector('.reply-btn');
        if (replyBtn) {
            replyBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const replyFormContainer = div.querySelector(`#reply-form-${message.id}`);
                const allReplyForms = document.querySelectorAll('.reply-form-container');
                
                // Esconder todos os outros formulários de resposta
                allReplyForms.forEach(form => {
                    if (form !== replyFormContainer) {
                        form.classList.add('d-none');
                    }
                });
                
                // Mostrar/esconder formulário de resposta
                if (replyFormContainer) {
                    replyFormContainer.classList.toggle('d-none');
                    
                    // Focar no textarea quando mostrar
                    if (!replyFormContainer.classList.contains('d-none')) {
                        const textarea = replyFormContainer.querySelector('.reply-textarea');
                        if (textarea) {
                            setTimeout(() => textarea.focus(), 100);
                        }
                    }
                }
            });
        }

        // Adicionar event listener para cancelar resposta
        const cancelReplyBtn = div.querySelector('.cancel-reply-btn');
        if (cancelReplyBtn) {
            cancelReplyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const replyFormContainer = div.querySelector(`#reply-form-${message.id}`);
                if (replyFormContainer) {
                    replyFormContainer.classList.add('d-none');
                    const form = replyFormContainer.querySelector('.reply-form');
                    if (form) {
                        form.reset();
                        form.classList.remove('was-validated');
                    }
                }
            });
        }

        // Adicionar event listener para enviar resposta
        const replyForm = div.querySelector('.reply-form');
        if (replyForm) {
            replyForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('📨 Formulário de resposta submetido para mensagem:', message.id);

                if (!replyForm.checkValidity()) {
                    console.warn('⚠️ Formulário inválido');
                    replyForm.classList.add('was-validated');
                    return;
                }

                const textarea = replyForm.querySelector('.reply-textarea');
                const replyText = textarea ? textarea.value.trim() : '';
                const submitBtn = replyForm.querySelector('button[type="submit"]');
                const replyFormContainer = div.querySelector(`#reply-form-${message.id}`);

                console.log('📝 Texto da resposta:', replyText);
                console.log('📏 Tamanho:', replyText.length);
                console.log('📦 replyFormContainer encontrado:', !!replyFormContainer);

                if (!replyText || replyText.length < 10) {
                    console.warn('⚠️ Resposta muito curta (mínimo 10 caracteres)');
                    replyForm.classList.add('was-validated');
                    return;
                }

                // Loading
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
                }

                try {
                    console.log('🔄 Chamando replyToMessage...');
                    console.log('   - Mensagem original:', message.id);
                    console.log('   - donationId:', message.donationId);
                    console.log('   - senderId (quem enviou original):', message.senderId);
                    console.log('   - receiverId (quem recebeu original):', message.receiverId);
                    
                    // Chamar função de resposta (já importada no módulo)
                    const result = await replyToMessage(message, replyText);
                    
                    console.log('✅ Resultado de replyToMessage:', result);

                    if (result.success) {
                        console.log('✅ Resposta enviada com sucesso!');
                        
                        // Esconder formulário imediatamente
                        if (replyFormContainer) {
                            // Limpar alertas anteriores
                            const existingAlerts = replyFormContainer.querySelectorAll('.alert');
                            existingAlerts.forEach(alert => alert.remove());
                            
                            // Mostrar mensagem de sucesso
                            const alertDiv = document.createElement('div');
                            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-2';
                            alertDiv.innerHTML = `
                                <i class="bi bi-check-circle"></i> Resposta enviada com sucesso!
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            `;
                            replyFormContainer.insertBefore(alertDiv, replyForm);
                            
                            // Resetar formulário
                            replyForm.reset();
                            replyForm.classList.remove('was-validated');
                        }
                        
                        // Recarregar mensagens imediatamente (sem delay)
                        console.log('🔄 Recarregando página de mensagens...');
                        const currentFilter = document.querySelector('input[name="message-filter"]:checked')?.value || 'all';
                        
                        // Pequeno delay para garantir que o Firestore salvou
                        await new Promise(resolve => setTimeout(resolve, 500));
                        
                        await loadMessagesPage(currentFilter);
                        
                        // Esconder formulário após recarregar
                        if (replyFormContainer) {
                            setTimeout(() => {
                                replyFormContainer.classList.add('d-none');
                            }, 1000);
                        }
                    } else {
                        console.error('❌ Erro ao enviar resposta:', result.error);
                        
                        // Mostrar erro
                        if (replyFormContainer) {
                            // Limpar alertas anteriores
                            const existingAlerts = replyFormContainer.querySelectorAll('.alert');
                            existingAlerts.forEach(alert => alert.remove());
                            
                            const alertDiv = document.createElement('div');
                            alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-2';
                            alertDiv.innerHTML = `
                                <i class="bi bi-exclamation-triangle"></i> ${result.error || 'Erro ao enviar resposta.'}
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            `;
                            replyFormContainer.insertBefore(alertDiv, replyForm);
                        }
                    }
                } catch (error) {
                    console.error('❌ Erro ao enviar resposta (catch):', error);
                    console.error('   - Erro completo:', error.message);
                    console.error('   - Stack:', error.stack);
                    
                    if (replyFormContainer) {
                        // Limpar alertas anteriores
                        const existingAlerts = replyFormContainer.querySelectorAll('.alert');
                        existingAlerts.forEach(alert => alert.remove());
                        
                        const alertDiv = document.createElement('div');
                        alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-2';
                        alertDiv.innerHTML = `
                            <i class="bi bi-exclamation-triangle"></i> Erro ao enviar resposta: ${error.message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        `;
                        replyFormContainer.insertBefore(alertDiv, replyForm);
                    }
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="bi bi-send"></i> Enviar Resposta';
                    }
                }
            });
        }

        // Marcar como lida ao clicar no card (se não estiver lida)
        if (!message.read) {
            div.addEventListener('click', async (e) => {
                // Não marcar se clicar em botões, links ou formulários
                if (e.target.closest('button') || e.target.closest('a') || e.target.closest('form')) return;
                
                await markAsRead(message.id);
                const currentFilter = document.querySelector('input[name="message-filter"]:checked')?.value || 'all';
                loadMessagesPage(currentFilter);
            });
        }

        console.log('✅ Card de mensagem criado com sucesso:', message.id);
        return div;
    } catch (error) {
        console.error('❌ Erro ao criar card de mensagem:', error);
        // Retornar card de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mb-3';
        errorDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle"></i> 
            Erro ao carregar mensagem: ${error.message}
        `;
        return errorDiv;
    }
}

/**
 * Atualiza o contador de mensagens não lidas na navbar
 */
export async function updateUnreadBadge() {
    const user = auth.currentUser;
    if (!user) return;

    const badge = document.getElementById('unread-count');
    if (!badge) return;

    const count = await getUnreadCount(user.uid);
    
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-block';
    } else {
        badge.style.display = 'none';
    }
}

// Atualizar contador a cada 30 segundos (se usuário logado)
setInterval(() => {
    if (auth.currentUser) {
        updateUnreadBadge();
    }
}, 30000);

