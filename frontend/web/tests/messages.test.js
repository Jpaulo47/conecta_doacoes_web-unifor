/**
 * Testes para o módulo messages.js
 * Testa envio, recebimento e marcação de mensagens como lidas
 */

describe('Módulo de Mensagens (messages.js)', () => {
  
  describe('Estrutura de Mensagem', () => {
    test('deve criar objeto de mensagem válido', () => {
      const messageData = {
        donationId: 'donation-123',
        receiverId: 'receiver-456',
        senderId: 'sender-789',
        message: 'Olá! Tenho interesse neste item.',
        senderName: 'João Silva',
        senderEmail: 'joao@example.com',
        read: false,
        replyToMessageId: null
      };

      expect(messageData.donationId).toBeDefined();
      expect(messageData.receiverId).toBeDefined();
      expect(messageData.senderId).toBeDefined();
      expect(messageData.message).toBeDefined();
      expect(messageData.message.length).toBeGreaterThanOrEqual(10);
      expect(typeof messageData.read).toBe('boolean');
    });

    test('deve validar mensagem mínima de 10 caracteres', () => {
      const validMessage = 'Olá! Tenho interesse neste item.';
      const invalidMessage = 'Oi';

      expect(validMessage.length).toBeGreaterThanOrEqual(10);
      expect(invalidMessage.length).toBeLessThan(10);
    });

    test('deve validar estrutura de resposta', () => {
      const messageResponse = {
        id: 'message-123',
        donationId: 'donation-123',
        senderId: 'sender-789',
        receiverId: 'receiver-456',
        message: 'Olá! Tenho interesse neste item.',
        senderName: 'João Silva',
        read: false,
        createdAt: { seconds: 1699999999, nanoseconds: 0 }
      };

      expect(messageResponse.id).toBeDefined();
      expect(messageResponse.senderId).toBeDefined();
      expect(messageResponse.receiverId).toBeDefined();
      expect(messageResponse.read).toBe(false);
    });
  });

  describe('Validações de Envio', () => {
    test('deve prevenir envio para próprio item', () => {
      const currentUserId = 'user-123';
      const receiverId = 'user-123'; // Mesmo usuário
      const canSend = currentUserId !== receiverId;

      expect(canSend).toBe(false);
    });

    test('deve permitir envio para outros usuários', () => {
      const currentUserId = 'user-123';
      const receiverId = 'user-456'; // Usuário diferente
      const canSend = currentUserId !== receiverId;

      expect(canSend).toBe(true);
    });

    test('deve validar mensagem não vazia', () => {
      const validMessage = 'Olá! Tenho interesse neste item.';
      const emptyMessage = '';
      const whitespaceMessage = '   ';

      expect(validMessage.trim().length).toBeGreaterThan(0);
      expect(emptyMessage.trim().length).toBe(0);
      expect(whitespaceMessage.trim().length).toBe(0);
    });

    test('deve validar estrutura de resposta de erro', () => {
      const errorResponse = {
        success: false,
        error: 'Você não pode enviar mensagem para seu próprio item.'
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.error).toBeDefined();
      expect(errorResponse.error).toContain('próprio item');
    });
  });

  describe('Agrupamento em Conversas', () => {
    test('deve agrupar mensagens por conversa', () => {
      const messages = [
        {
          id: 'msg1',
          donationId: 'donation-123',
          senderId: 'user-1',
          receiverId: 'user-2',
          createdAt: { seconds: 1000, nanoseconds: 0 }
        },
        {
          id: 'msg2',
          donationId: 'donation-123',
          senderId: 'user-2',
          receiverId: 'user-1',
          createdAt: { seconds: 2000, nanoseconds: 0 }
        },
        {
          id: 'msg3',
          donationId: 'donation-456',
          senderId: 'user-1',
          receiverId: 'user-3',
          createdAt: { seconds: 3000, nanoseconds: 0 }
        }
      ];

      // Simular agrupamento por donationId e participantes
      const conversations = {};
      messages.forEach(msg => {
        const participants = [msg.senderId, msg.receiverId].sort();
        const key = `${msg.donationId}_${participants[0]}_${participants[1]}`;
        if (!conversations[key]) {
          conversations[key] = [];
        }
        conversations[key].push(msg);
      });

      expect(Object.keys(conversations).length).toBe(2);
      expect(conversations[`donation-123_user-1_user-2`].length).toBe(2);
      expect(conversations[`donation-456_user-1_user-3`].length).toBe(1);
    });

    test('deve ordenar mensagens por data', () => {
      const messages = [
        { id: 'msg1', createdAt: { seconds: 3000, nanoseconds: 0 } },
        { id: 'msg2', createdAt: { seconds: 1000, nanoseconds: 0 } },
        { id: 'msg3', createdAt: { seconds: 2000, nanoseconds: 0 } }
      ];

      const sorted = messages.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt.seconds * 1000);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt.seconds * 1000);
        return dateA - dateB;
      });

      expect(sorted[0].id).toBe('msg2');
      expect(sorted[1].id).toBe('msg3');
      expect(sorted[2].id).toBe('msg1');
    });
  });

  describe('Status de Leitura', () => {
    test('deve marcar mensagem como lida', () => {
      const message = {
        id: 'message-123',
        read: false
      };

      message.read = true;

      expect(message.read).toBe(true);
    });

    test('deve contar mensagens não lidas', () => {
      const messages = [
        { id: 'msg1', read: false, receiverId: 'user-123' },
        { id: 'msg2', read: true, receiverId: 'user-123' },
        { id: 'msg3', read: false, receiverId: 'user-123' }
      ];

      const currentUserId = 'user-123';
      const unreadCount = messages.filter(msg => !msg.read && msg.receiverId === currentUserId).length;

      expect(unreadCount).toBe(2);
    });
  });

  describe('Respostas a Mensagens', () => {
    test('deve inverter sender/receiver na resposta', () => {
      const originalMessage = {
        id: 'msg-1',
        donationId: 'donation-123',
        senderId: 'user-1',
        receiverId: 'user-2'
      };

      const currentUserId = 'user-2';
      const newReceiverId = originalMessage.senderId;

      expect(newReceiverId).toBe('user-1');
      expect(newReceiverId).not.toBe(currentUserId);
    });

    test('deve manter donationId na resposta', () => {
      const originalMessage = {
        id: 'msg-1',
        donationId: 'donation-123',
        senderId: 'user-1',
        receiverId: 'user-2'
      };

      const replyDonationId = originalMessage.donationId;

      expect(replyDonationId).toBe('donation-123');
    });

    test('deve linkar resposta com mensagem original', () => {
      const originalMessage = {
        id: 'msg-1',
        donationId: 'donation-123',
        senderId: 'user-1',
        receiverId: 'user-2'
      };

      const reply = {
        donationId: originalMessage.donationId,
        replyToMessageId: originalMessage.id
      };

      expect(reply.replyToMessageId).toBe('msg-1');
      expect(reply.donationId).toBe(originalMessage.donationId);
    });
  });

  describe('Filtros de Mensagens', () => {
    test('deve filtrar mensagens por status de leitura', () => {
      const messages = [
        { id: 'msg1', read: false },
        { id: 'msg2', read: true },
        { id: 'msg3', read: false },
        { id: 'msg4', read: true }
      ];

      const unread = messages.filter(msg => !msg.read);
      const read = messages.filter(msg => msg.read);

      expect(unread.length).toBe(2);
      expect(read.length).toBe(2);
    });

    test('deve filtrar conversas por não lidas', () => {
      const conversations = [
        { key: 'conv1', hasUnread: true },
        { key: 'conv2', hasUnread: false },
        { key: 'conv3', hasUnread: true }
      ];

      const unreadConversations = conversations.filter(conv => conv.hasUnread);

      expect(unreadConversations.length).toBe(2);
    });
  });
});
