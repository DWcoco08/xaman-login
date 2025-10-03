// Filter tabs functionality
const filterTabs = document.querySelectorAll('.filter-tab');
const nftCards = document.querySelectorAll('.nft-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.textContent.trim();

        nftCards.forEach(card => {
            if (category === 'All') {
                card.style.display = 'block';
            } else {
                const cardBadge = card.querySelector('.nft-badge').textContent;
                if (cardBadge === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });

        toast.info(`Filtering by: ${category}`);
    });
});

// List for Sale button functionality
const sellButtons = document.querySelectorAll('.btn-sell');

sellButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const nftCard = button.closest('.nft-card');
        const nftTitle = nftCard.querySelector('.nft-title').textContent;
        const price = nftCard.querySelector('.price-value').textContent;

        toast.info(`Listing ${nftTitle} for sale at ${price}...`);

        button.textContent = 'Processing...';
        button.disabled = true;

        setTimeout(() => {
            toast.success(`${nftTitle} is now listed for sale!`);
            button.textContent = 'Listed';
            button.style.background = 'rgba(249, 115, 22, 0.8)';
        }, 2000);
    });
});

// Sort functionality
const sortSelect = document.querySelector('.sort-select');

sortSelect.addEventListener('change', (e) => {
    const sortType = e.target.value;
    toast.info(`Sorting by: ${sortType}`);
});

// NFT Card click to view details
nftCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-sell')) return;

        const nftTitle = card.querySelector('.nft-title').textContent;
        toast.info(`Viewing ${nftTitle} details`);
    });
});
