// Módulo de Doações - Conecta Doações
// Gerencia CRUD de doações no Firestore

import { db, auth } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    getDocs, 
    getDoc,
    doc, 
    updateDoc, 
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

/**
 * Cria uma nova doação
 * @param {Object} donationData - Dados da doação
 * @returns {Promise<Object>} Resultado da operação
 */
export async function createDonation(donationData) {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        // Garantir que imageUrls seja sempre um array válido
        let imageUrlsArray = [];
        if (donationData.imageUrls && Array.isArray(donationData.imageUrls)) {
            imageUrlsArray = donationData.imageUrls;
        } else if (donationData.imageUrl) {
            imageUrlsArray = [donationData.imageUrl];
        } else {
            imageUrlsArray = ['https://via.placeholder.com/400x300?text=Sem+Imagem'];
        }

        const donation = {
            userId: user.uid,
            userName: user.displayName || 'Anônimo',
            title: donationData.title,
            description: donationData.description,
            category: donationData.category,
            condition: donationData.condition,
            location: donationData.location || '',
            // Endereço completo (se disponível)
            address: donationData.address || null,
            // Suporte a múltiplas imagens - SEMPRE salvar como array
            imageUrls: imageUrlsArray,
            // Manter imageUrl para compatibilidade com código antigo
            imageUrl: imageUrlsArray[0] || 'https://via.placeholder.com/400x300?text=Sem+Imagem',
            status: 'available',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        console.log('💾 Salvando doação no Firestore:');
        console.log('  - donationData recebido:', donationData);
        console.log('  - donationData.imageUrls:', donationData.imageUrls);
        console.log('  - donationData.imageUrls é array?', Array.isArray(donationData.imageUrls));
        console.log('  - imageUrlsArray criado:', imageUrlsArray);
        console.log('  - imageUrlsArray.length:', imageUrlsArray.length);
        console.log('  - donation.imageUrls:', donation.imageUrls);
        console.log('  - donation.imageUrls é array?', Array.isArray(donation.imageUrls));
        console.log('  - donation.imageUrl:', donation.imageUrl);
        console.log('  - Objeto donation completo:', donation);

        const docRef = await addDoc(collection(db, 'donations'), donation);
        console.log('✅ Doação criada com sucesso:', docRef.id);
        console.log('✅ Doação salva com', donation.imageUrls?.length || 0, 'imagem(ns)');
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('❌ Erro ao criar doação:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Busca todas as doações disponíveis
 * @param {Object} filters - Filtros opcionais (categoria, localização, etc.)
 * @returns {Promise<Array>} Lista de doações
 */
export async function getDonations(filters = {}) {
    try {
        let q;
        
        // Se há filtros, usar query simples para evitar necessidade de índice
        // Caso contrário, usar orderBy diretamente
        if (filters.status) {
            q = query(collection(db, 'donations'), where('status', '==', filters.status));
        } else {
            q = query(collection(db, 'donations'), orderBy('createdAt', 'desc'));
        }

        const querySnapshot = await getDocs(q);
        let donations = [];
        
        querySnapshot.forEach((doc) => {
            donations.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Se usou filtro sem orderBy, ordenar no JavaScript
        if (filters.status) {
            donations.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
                return dateB - dateA; // Ordem decrescente (mais recente primeiro)
            });
        }

        console.log(`✅ ${donations.length} doações carregadas`);
        return donations;
    } catch (error) {
        console.error('❌ Erro ao buscar doações:', error);
        return [];
    }
}

/**
 * Busca uma doação específica por ID
 * @param {string} donationId - ID da doação
 * @returns {Promise<Object>} Dados da doação
 */
export async function getDonationById(donationId) {
    try {
        const donationDoc = await getDoc(doc(db, 'donations', donationId));
        if (donationDoc.exists()) {
            return { 
                success: true, 
                data: { id: donationDoc.id, ...donationDoc.data() } 
            };
        } else {
            return { success: false, error: 'Doação não encontrada' };
        }
    } catch (error) {
        console.error('❌ Erro ao buscar doação:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Busca doações de um usuário específico
 * @param {string} userId - ID do usuário
 * @returns {Promise<Array>} Lista de doações do usuário
 */
export async function getUserDonations(userId) {
    try {
        // Query sem orderBy para evitar necessidade de índice composto
        const q = query(
            collection(db, 'donations'), 
            where('userId', '==', userId)
        );
        
        const querySnapshot = await getDocs(q);
        let donations = [];
        
        querySnapshot.forEach((doc) => {
            donations.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Ordenar no JavaScript por data de criação (mais recente primeiro)
        donations.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt ? new Date(a.createdAt) : new Date(0));
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt ? new Date(b.createdAt) : new Date(0));
            return dateB - dateA; // Ordem decrescente (mais recente primeiro)
        });

        console.log(`✅ ${donations.length} doações do usuário carregadas`);
        return donations;
    } catch (error) {
        console.error('❌ Erro ao buscar doações do usuário:', error);
        return [];
    }
}

/**
 * Atualiza uma doação existente
 * @param {string} donationId - ID da doação
 * @param {Object} updateData - Dados a serem atualizados
 * @returns {Promise<Object>} Resultado da operação
 */
export async function updateDonation(donationId, updateData) {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        // Adicionar timestamp de atualização
        updateData.updatedAt = serverTimestamp();

        await updateDoc(doc(db, 'donations', donationId), updateData);
        console.log('✅ Doação atualizada com sucesso:', donationId);
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao atualizar doação:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Exclui uma doação
 * @param {string} donationId - ID da doação
 * @returns {Promise<Object>} Resultado da operação
 */
export async function deleteDonation(donationId) {
    try {
        const user = auth.currentUser;
        if (!user) {
            return { success: false, error: 'Usuário não autenticado' };
        }

        await deleteDoc(doc(db, 'donations', donationId));
        console.log('✅ Doação excluída com sucesso:', donationId);
        return { success: true };
    } catch (error) {
        console.error('❌ Erro ao excluir doação:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Carrega e exibe doações na página principal
 */
export async function loadDonations() {
    const donationsGrid = document.getElementById('donations-grid');
    const loading = document.getElementById('loading');
    const noDonations = document.getElementById('no-donations');

    if (!donationsGrid) return;

    // Mostrar loading
    if (loading) loading.classList.remove('d-none');
    if (noDonations) noDonations.classList.add('d-none');

    // Buscar doações
    const donations = await getDonations();

    // Esconder loading
    if (loading) loading.classList.add('d-none');

    // Limpar grid
    donationsGrid.innerHTML = '';

    if (donations.length === 0) {
        if (noDonations) noDonations.classList.remove('d-none');
        return;
    }

    // Renderizar cards
    donations.forEach(donation => {
        const card = createDonationCard(donation);
        donationsGrid.appendChild(card);
    });
}

/**
 * Cria um card HTML para uma doação
 * @param {Object} donation - Dados da doação
 * @returns {HTMLElement} Elemento HTML do card
 */
function createDonationCard(donation) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const statusBadge = getStatusBadge(donation.status);
    const conditionColor = getConditionColor(donation.condition);
    
    // Obter array de imagens
    const imageUrls = donation.imageUrls || (donation.imageUrl ? [donation.imageUrl] : ['https://via.placeholder.com/400x300?text=Sem+Imagem']);
    const mainImage = imageUrls[0] || 'https://via.placeholder.com/400x300?text=Sem+Imagem';
    const hasMultipleImages = imageUrls.length > 1;
    
    console.log(`🖼️ Card ${donation.id}:`, {
        hasImageUrls: !!donation.imageUrls,
        imageUrlsCount: donation.imageUrls?.length || 0,
        imageUrl: donation.imageUrl,
        finalImageUrls: imageUrls.length,
        hasMultiple: hasMultipleImages
    });
    
    // Criar HTML do carrossel de imagens
    let imagesHTML = '';
    if (hasMultipleImages) {
        imagesHTML = `
            <div class="card-img-top donation-card-img position-relative" style="height: 250px; overflow: hidden;">
                <div id="carousel-${donation.id}" class="carousel slide h-100" data-bs-ride="carousel">
                    <div class="carousel-inner h-100">
                        ${imageUrls.map((url, index) => `
                            <div class="carousel-item h-100 ${index === 0 ? 'active' : ''}">
                                <img src="${url}" class="d-block w-100 h-100" style="object-fit: cover;" alt="${donation.title} - Imagem ${index + 1}" onerror="this.src='https://via.placeholder.com/400x300?text=Sem+Imagem'">
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${donation.id}" data-bs-slide="prev" onclick="event.stopPropagation()">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${donation.id}" data-bs-slide="next" onclick="event.stopPropagation()">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                    <div class="position-absolute top-0 end-0 m-2">
                        <span class="badge bg-dark bg-opacity-75">
                            <i class="bi bi-images"></i> ${imageUrls.length}
                        </span>
                    </div>
                </div>
            </div>
        `;
    } else {
        imagesHTML = `<img src="${mainImage}" class="card-img-top donation-card-img" alt="${donation.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Sem+Imagem'">`;
    }

    col.innerHTML = `
        <div class="card donation-card shadow-sm h-100" onclick="window.location.href='detalhes.html?id=${donation.id}'">
            ${imagesHTML}
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="donation-card-title mb-0">${donation.title}</h5>
                    ${statusBadge}
                </div>
                <p class="donation-card-text mb-3">${donation.description}</p>
                <div class="d-flex flex-wrap gap-2 mb-3">
                    <span class="badge bg-primary">
                        <i class="bi bi-tag"></i> ${donation.category}
                    </span>
                    <span class="badge" style="background-color: ${conditionColor};">
                        <i class="bi bi-star"></i> ${donation.condition}
                    </span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <i class="bi bi-geo-alt"></i> ${donation.location}
                    </small>
                    <a href="detalhes.html?id=${donation.id}" class="btn btn-sm btn-success">
                        Ver Item <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    return col;
}

/**
 * Retorna badge HTML com base no status
 */
function getStatusBadge(status) {
    const badges = {
        'available': '<span class="badge badge-available">Disponível</span>',
        'reserved': '<span class="badge badge-reserved">Reservado</span>',
        'donated': '<span class="badge badge-donated">Doado</span>'
    };
    return badges[status] || badges['available'];
}

/**
 * Retorna cor com base na condição
 */
function getConditionColor(condition) {
    const colors = {
        'Novo': '#198754',
        'Usado - Ótimo': '#20c997',
        'Usado - Bom': '#0dcaf0',
        'Precisa Reparo': '#ffc107'
    };
    return colors[condition] || '#6c757d';
}

/**
 * Configura filtros e busca na página principal
 */
export function setupFilters() {
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.querySelectorAll('.filter-category');
    const filterCondition = document.querySelectorAll('.filter-condition');
    const filterStatus = document.querySelectorAll('.filter-status');
    const filterLocation = document.getElementById('filter-location');
    const btnClearFilters = document.getElementById('btn-clear-filters');

    // Busca por texto
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    // Filtros de categoria
    if (filterCategory) {
        filterCategory.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    // Filtros de condição
    if (filterCondition) {
        filterCondition.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    // Filtros de status
    if (filterStatus) {
        filterStatus.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    // Filtro de localização
    if (filterLocation) {
        filterLocation.addEventListener('input', applyFilters);
    }

    // Limpar filtros
    if (btnClearFilters) {
        btnClearFilters.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (filterLocation) filterLocation.value = '';
            filterCategory.forEach(cb => cb.checked = false);
            filterCondition.forEach(cb => cb.checked = false);
            if (filterStatus) filterStatus.forEach(cb => cb.checked = false);
            applyFilters();
        });
    }
}

/**
 * Aplica filtros de busca e categoria
 */
async function applyFilters() {
    const searchInput = document.getElementById('search-input');
    const filterCategory = document.querySelectorAll('.filter-category:checked');
    const filterCondition = document.querySelectorAll('.filter-condition:checked');
    const filterStatus = document.querySelectorAll('.filter-status:checked');
    const filterLocation = document.getElementById('filter-location');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const locationTerm = filterLocation ? filterLocation.value.toLowerCase() : '';
    const selectedCategories = Array.from(filterCategory).map(cb => cb.value);
    const selectedConditions = Array.from(filterCondition).map(cb => cb.value);
    const selectedStatuses = Array.from(filterStatus).map(cb => cb.value);

    // Buscar todas as doações
    const donations = await getDonations();

    // Filtrar no frontend
    let filtered = donations.filter(donation => {
        // Filtro de busca por texto
        const matchesSearch = !searchTerm || 
            donation.title.toLowerCase().includes(searchTerm) ||
            donation.description.toLowerCase().includes(searchTerm);

        // Filtro de categoria
        const matchesCategory = selectedCategories.length === 0 || 
            selectedCategories.includes(donation.category);

        // Filtro de condição
        const matchesCondition = selectedConditions.length === 0 || 
            selectedConditions.includes(donation.condition);

        // Filtro de status
        const donationStatus = donation.status?.toLowerCase() || 'available';
        const matchesStatus = selectedStatuses.length === 0 || 
            selectedStatuses.includes(donationStatus) ||
            (donationStatus === 'doado' && selectedStatuses.includes('donated'));

        // Filtro de localização
        const matchesLocation = !locationTerm || 
            (donation.location && donation.location.toLowerCase().includes(locationTerm)) ||
            (donation.address && donation.address.cidade && donation.address.cidade.toLowerCase().includes(locationTerm)) ||
            (donation.address && donation.address.uf && donation.address.uf.toLowerCase().includes(locationTerm));

        return matchesSearch && matchesCategory && matchesCondition && matchesStatus && matchesLocation;
    });

    // Renderizar resultados
    const donationsGrid = document.getElementById('donations-grid');
    const noDonations = document.getElementById('no-donations');

    if (donationsGrid) {
        donationsGrid.innerHTML = '';

        if (filtered.length === 0) {
            if (noDonations) noDonations.classList.remove('d-none');
        } else {
            if (noDonations) noDonations.classList.add('d-none');
            filtered.forEach(donation => {
                const card = createDonationCard(donation);
                donationsGrid.appendChild(card);
            }); 
        }
    }
}

/**
 * Busca estatísticas gerais do sistema
 * @returns {Promise<Object>} Estatísticas (total, doados, disponíveis, usuarios)
 */
export async function getStatistics() {
    try {
        console.log('📊 Buscando estatísticas do sistema...');
        
        const donationsSnapshot = await getDocs(collection(db, 'donations'));
        const usersSnapshot = await getDocs(collection(db, 'users'));
        
        let totalDonations = 0;
        let donatedCount = 0;
        let availableCount = 0;
        let reservedCount = 0;
        
        donationsSnapshot.forEach((doc) => {
            const data = doc.data();
            totalDonations++;
            
            // Verificar status (pode ser 'donated' ou 'doado' para compatibilidade)
            const status = data.status?.toLowerCase() || 'available';
            
            console.log(`  - Item ${doc.id}: status = "${data.status}" (normalizado: "${status}")`);
            
            if (status === 'donated' || status === 'doado') {
                donatedCount++;
                console.log(`    ✅ Contado como DOADO`);
            } else if (status === 'available' || status === 'disponível') {
                availableCount++;
                console.log(`    ✅ Contado como DISPONÍVEL`);
            } else if (status === 'reserved' || status === 'reservado') {
                reservedCount++;
                console.log(`    ✅ Contado como RESERVADO`);
            } else {
                // Se não tiver status definido, considerar como disponível
                availableCount++;
                console.log(`    ⚠️ Status desconhecido "${status}", contado como DISPONÍVEL`);
            }
        });
        
        const totalUsers = usersSnapshot.size;
        
        const stats = {
            success: true,
            data: {
                totalDonations,
                donatedCount,
                availableCount,
                reservedCount,
                totalUsers
            }
        };
        
        console.log('📊 Estatísticas calculadas:', stats.data);
        console.log(`  - Total de doações: ${totalDonations}`);
        console.log(`  - Itens doados: ${donatedCount}`);
        console.log(`  - Itens disponíveis: ${availableCount}`);
        console.log(`  - Itens reservados: ${reservedCount}`);
        console.log(`  - Total de usuários: ${totalUsers}`);
        
        return stats;
    } catch (error) {
        console.error('❌ Erro ao buscar estatísticas:', error);
        return {
            success: false,
            error: error.message,
            data: {
                totalDonations: 0,
                donatedCount: 0,
                availableCount: 0,
                reservedCount: 0,
                totalUsers: 0
            }
        };
    }
}

