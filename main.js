class EnhancedPortfolioApp {
    constructor() {
        this.state = {
            currentLightboxIndex: 0,
            loadedImages: 0,
            totalImages: null,
            maxImageNumber: 0,
            imagesPerLoad: 12,
            isLoading: false,
            isMobileNavOpen: false,
            allImages: [],
            detectionComplete: false,
            consecutiveFailures: 0,
            maxConsecutiveFailures: 10,
            imageFormats: new Map(),
            loadedAchievements: 0,
            totalAchievements: null,
            maxAchievementNumber: 0,
            allAchievements: [],
            achievementDetectionComplete: false,
            achievementFormats: new Map()
        };

        this.supportedFormats = ['png', 'jpg'];
        this.init();
    }

    init() {
        this.setupStyles();
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupScrollReveal();
        this.startDynamicDetection();
        this.startAchievementDetection();
    }

    setupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .gallery {
                columns: 1;
                column-gap: 8px;
                max-width: 1200px;
                margin: 0 auto;
                padding: 8px;
            }
            
            @media (min-width: 480px) {
                .gallery {
                    columns: 2;
                    column-gap: 12px;
                    padding: 12px;
                }
            }
            
            @media (min-width: 768px) {
                .gallery {
                    columns: 3;
                    column-gap: 16px;
                    padding: 16px;
                }
            }
            
            @media (min-width: 1024px) {
                .gallery {
                    columns: 4;
                    column-gap: 20px;
                    padding: 20px;
                }
            }
            
            @media (min-width: 1400px) {
                .gallery {
                    columns: 5;
                    column-gap: 24px;
                    padding: 24px;
                }
            }

            .achievements-gallery {
                columns: 1;
                column-gap: 8px;
                max-width: 1000px;
                margin: 0 auto;
                padding: 8px;
            }
            
            @media (min-width: 480px) {
                .achievements-gallery {
                    columns: 2;
                    column-gap: 12px;
                    padding: 12px;
                }
            }
            
            @media (min-width: 768px) {
                .achievements-gallery {
                    columns: 3;
                    column-gap: 16px;
                    padding: 16px;
                }
            }
            
            @media (min-width: 1024px) {
                .achievements-gallery {
                    columns: 4;
                    column-gap: 20px;
                    padding: 20px;
                }
            }

            .artwork-item, .achievement-item {
                break-inside: avoid;
                margin-bottom: 8px;
                background: linear-gradient(145deg, #1a1a1f, #141419);
                border-radius: 12px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.06);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                opacity: 0;
                transform: translateY(20px);
                position: relative;
            }
            
            @media (min-width: 480px) {
                .artwork-item, .achievement-item {
                    margin-bottom: 12px;
                    border-radius: 16px;
                }
            }
            
            @media (min-width: 768px) {
                .artwork-item, .achievement-item {
                    margin-bottom: 16px;
                    border-radius: 20px;
                }
            }
            
            .artwork-item.revealed, .achievement-item.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .artwork-item:hover, .achievement-item:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                border-color: rgba(226, 232, 240, 0.15);
            }
            
            .artwork-item img, .achievement-item img {
                width: 100%;
                height: auto;
                display: block;
                transition: transform 0.3s ease;
            }
            
            .artwork-item:hover img, .achievement-item:hover img {
                transform: scale(1.02);
            }

            .artwork-number, .achievement-number {
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(8px);
                color: #94a3b8;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 0.7rem;
                font-weight: 600;
                font-family: 'Space Grotesk', monospace;
                opacity: 0;
                transform: translateY(-8px);
                transition: all 0.3s ease;
                z-index: 2;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            @media (min-width: 768px) {
                .artwork-number, .achievement-number {
                    top: 12px;
                    right: 12px;
                    padding: 6px 10px;
                    border-radius: 8px;
                    font-size: 0.75rem;
                }
            }
            
            .artwork-item:hover .artwork-number, .achievement-item:hover .achievement-number {
                opacity: 1;
                transform: translateY(0);
            }

            .loading-skeleton {
                break-inside: avoid;
                margin-bottom: 12px;
                background: linear-gradient(90deg, #1f1f24 25%, #2a2a2f 50%, #1f1f24 75%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite;
                border-radius: 12px;
                height: 200px;
                width: 100%;
            }
            
            @media (min-width: 480px) {
                .loading-skeleton {
                    height: 250px;
                    border-radius: 16px;
                }
            }
            
            @media (min-width: 768px) {
                .loading-skeleton {
                    height: 300px;
                    border-radius: 20px;
                }
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }

            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(20px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s ease;
                padding: 20px;
                box-sizing: border-box;
            }
            
            .lightbox-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .lightbox-content {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                max-width: 95vw;
                max-height: 95vh;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 100%;
                width: auto;
                height: auto;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
                display: block;
            }

            .lightbox-close, .lightbox-nav {
                position: absolute;
                width: 44px;
                height: 44px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                font-size: 16px;
                font-weight: bold;
                z-index: 10;
                outline: none;
            }

            .lightbox-close {
                top: 15px;
                right: 15px;
                font-size: 18px;
            }

            .lightbox-close:hover, .lightbox-nav:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }

            .lightbox-nav {
                top: 50%;
                transform: translateY(-50%);
            }

            .lightbox-nav:hover {
                transform: translateY(-50%) scale(1.1);
            }

            .lightbox-nav:disabled {
                opacity: 0.3;
                cursor: not-allowed;
                transform: translateY(-50%) scale(0.9);
            }

            .lightbox-prev { left: 15px; }
            .lightbox-next { right: 15px; }

            .lightbox-info {
                position: absolute;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                color: #94a3b8;
                font-size: 0.85rem;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(8px);
                padding: 10px 20px;
                border-radius: 20px;
                text-align: center;
                white-space: nowrap;
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 85vw;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .detection-status {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
                color: #94a3b8;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 0.8rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 100;
                opacity: 0;
                transition: all 0.3s ease;
                font-weight: 500;
            }
            
            .detection-status.visible {
                opacity: 1;
            }
            
            .detection-status.complete {
                background: rgba(34, 197, 94, 0.9);
                color: white;
                border-color: rgba(34, 197, 94, 0.3);
            }

            .scroll-reveal {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }

            .scroll-reveal.revealed {
                opacity: 1;
                transform: translateY(0);
            }

            .scroll-reveal-left {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.6s ease;
            }

            .scroll-reveal-left.revealed {
                opacity: 1;
                transform: translateX(0);
            }

            .scroll-reveal-right {
                opacity: 0;
                transform: translateX(30px);
                transition: all 0.6s ease;
            }

            .scroll-reveal-right.revealed {
                opacity: 1;
                transform: translateX(0);
            }

            .stagger-item {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease;
            }

            .stagger-item.revealed {
                opacity: 1;
                transform: translateY(0);
            }

            @media (max-width: 479px) {
                .lightbox-close, .lightbox-prev, .lightbox-next {
                    width: 36px;
                    height: 36px;
                    font-size: 14px;
                }

                .lightbox-close { top: 10px; right: 10px; }
                .lightbox-prev { left: 10px; }
                .lightbox-next { right: 10px; }
                
                .lightbox-info {
                    bottom: 10px;
                    font-size: 0.75rem;
                    padding: 8px 16px;
                    max-width: 90vw;
                }
                
                .lightbox-overlay {
                    padding: 10px;
                }
            }

            .hidden { display: none !important; }
            .loading { pointer-events: none; opacity: 0.7; }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        this.setupMobileNavigation();
        
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreImages());
        }
        
        this.setupSmoothScrolling();
        
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        window.addEventListener('resize', this.handleResize.bind(this));
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }

    setupMobileNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (navToggle && mobileNav) {
            navToggle.addEventListener('click', () => {
                this.state.isMobileNavOpen = !this.state.isMobileNavOpen;
                mobileNav.classList.toggle('open', this.state.isMobileNavOpen);
                document.body.style.overflow = this.state.isMobileNavOpen ? 'hidden' : '';
            });
        }
        
        document.querySelectorAll('#mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                this.state.isMobileNavOpen = false;
                mobileNav?.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    setupScrollReveal() {
        if (!window.IntersectionObserver) return;

        const revealElements = document.querySelectorAll('[class*="scroll-reveal"], .stat-responsive, .social-responsive');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            if (!el.classList.contains('scroll-reveal')) {
                el.classList.add('scroll-reveal');
            }
            revealObserver.observe(el);
        });
    }

    handleResize() {
        if (window.innerWidth >= 768 && this.state.isMobileNavOpen) {
            this.state.isMobileNavOpen = false;
            const mobileNav = document.getElementById('mobile-nav');
            mobileNav?.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    handleKeyboard(e) {
        const lightbox = document.getElementById('custom-lightbox') || document.getElementById('achievement-lightbox');
        if (!lightbox?.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                this.closeLightbox();
                this.closeAchievementLightbox();
                break;
            case 'ArrowLeft':
                this.navigateLightbox(-1);
                this.navigateAchievementLightbox(-1);
                break;
            case 'ArrowRight':
                this.navigateLightbox(1);
                this.navigateAchievementLightbox(1);
                break;
        }
    }

    startDynamicDetection() {
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'detection-status visible';
        statusIndicator.textContent = 'Detecting artworks...';
        document.body.appendChild(statusIndicator);
        
        this.statusIndicator = statusIndicator;
        this.detectImages(1);
    }

    startAchievementDetection() {
        this.detectAchievements(1);
    }

    detectAchievements(startNumber, batchSize = 50) {
        const promises = [];
        const currentBatch = [];
        
        for (let i = 0; i < batchSize; i++) {
            const achievementNumber = startNumber + i;
            const promise = this.checkAchievementExistsMultiFormat(achievementNumber);
            promises.push(promise);
            currentBatch.push(achievementNumber);
        }
        
        Promise.allSettled(promises).then(results => {
            let foundInBatch = 0;
            let consecutiveFails = 0;
            
            results.forEach((result, index) => {
                const achievementNumber = currentBatch[index];
                
                if (result.status === 'fulfilled' && result.value) {
                    foundInBatch++;
                    consecutiveFails = 0;
                    this.state.maxAchievementNumber = Math.max(this.state.maxAchievementNumber, achievementNumber);
                    this.state.achievementFormats.set(achievementNumber, result.value);
                } else {
                    consecutiveFails++;
                }
            });
            
            if (foundInBatch === 0 || consecutiveFails >= this.state.maxConsecutiveFailures) {
                this.completeAchievementDetection();
            } else {
                this.detectAchievements(startNumber + batchSize, batchSize);
            }
        });
    }

    checkAchievementExistsMultiFormat(achievementNumber) {
        return new Promise(async (resolve) => {
            for (const format of this.supportedFormats) {
                const exists = await this.checkAchievementExists(achievementNumber, format);
                if (exists) {
                    resolve(format);
                    return;
                }
            }
            resolve(null);
        });
    }

    checkAchievementExists(achievementNumber, format) {
        return new Promise((resolve) => {
            const img = new Image();
            const imagePath = `achievements/${achievementNumber}.${format}`;
            
            const timeout = setTimeout(() => resolve(false), 3000);
            
            img.onload = () => {
                clearTimeout(timeout);
                resolve(true);
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };
            
            img.src = imagePath;
        });
    }

    completeAchievementDetection() {
        this.state.totalAchievements = this.state.maxAchievementNumber;
        this.state.achievementDetectionComplete = true;
        this.loadAllAchievements();
    }

    loadAllAchievements() {
        if (!this.state.achievementDetectionComplete) return;
        
        const achievementContainer = document.getElementById('achievements-container');
        if (!achievementContainer) return;

        if (this.state.totalAchievements === 0) {
            const noAchievements = document.getElementById('no-achievements');
            if (noAchievements) {
                noAchievements.classList.remove('hidden');
            }
            return;
        }

        const numbersToLoad = [];
        for (let i = 1; i <= this.state.totalAchievements; i++) {
            if (this.state.achievementFormats.has(i)) {
                numbersToLoad.push(i);
            }
        }
        
        const loadPromises = numbersToLoad.map(achievementNumber => this.createAchievementItem(achievementNumber));
        
        Promise.allSettled(loadPromises).then(results => {
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    const achievementNumber = numbersToLoad[index];
                    achievementContainer.appendChild(result.value);
                    
                    this.state.allAchievements.push({
                        number: achievementNumber,
                        index: this.state.loadedAchievements + index,
                        format: this.state.achievementFormats.get(achievementNumber)
                    });
                }
            });
            
            this.state.loadedAchievements += numbersToLoad.length;
            this.setupRevealForNewItems();
        });
    }

    createAchievementItem(achievementNumber) {
        return new Promise((resolve) => {
            const item = document.createElement('div');
            item.className = 'achievement-item loading-skeleton';
            item.dataset.number = achievementNumber;
            
            const format = this.state.achievementFormats.get(achievementNumber);
            if (!format) {
                resolve(item);
                return;
            }
            
            const img = new Image();
            const imagePath = `achievements/${achievementNumber}.${format}`;
            
            img.onload = () => {
                item.className = 'achievement-item';
                const paddedNumber = achievementNumber.toString().padStart(4, '0');
                
                item.innerHTML = `
                    <img src="${imagePath}" alt="Achievement ${achievementNumber}" loading="lazy" />
                    <div class="achievement-number">#${paddedNumber}</div>
                `;
                
                item.addEventListener('click', () => this.openAchievementLightboxByNumber(achievementNumber));
                resolve(item);
            };
            
            img.onerror = () => {
                item.className = 'achievement-item';
                const paddedNumber = achievementNumber.toString().padStart(4, '0');
                
                item.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; background: rgba(31, 31, 36, 0.4); border-radius: 12px; color: #64748b; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
                        <div style="font-size: 0.875rem;">Achievement ${achievementNumber}</div>
                    </div>
                    <div class="achievement-number">#${paddedNumber}</div>
                `;
                
                resolve(item);
            };
            
            img.src = imagePath;
        });
    }

    detectImages(startNumber, batchSize = 50) {
        const promises = [];
        const currentBatch = [];
        
        for (let i = 0; i < batchSize; i++) {
            const imageNumber = startNumber + i;
            const promise = this.checkImageExistsMultiFormat(imageNumber);
            promises.push(promise);
            currentBatch.push(imageNumber);
        }
        
        Promise.allSettled(promises).then(results => {
            let foundInBatch = 0;
            let consecutiveFails = 0;
            
            results.forEach((result, index) => {
                const imageNumber = currentBatch[index];
                
                if (result.status === 'fulfilled' && result.value) {
                    foundInBatch++;
                    consecutiveFails = 0;
                    this.state.maxImageNumber = Math.max(this.state.maxImageNumber, imageNumber);
                    this.state.imageFormats.set(imageNumber, result.value);
                } else {
                    consecutiveFails++;
                }
            });
            
            const pngCount = Array.from(this.state.imageFormats.values()).filter(f => f === 'png').length;
            const jpgCount = Array.from(this.state.imageFormats.values()).filter(f => f === 'jpg').length;
            this.statusIndicator.textContent = `Found ${this.state.maxImageNumber} artworks (${pngCount} PNG, ${jpgCount} JPG)...`;
            
            if (foundInBatch === 0 || consecutiveFails >= this.state.maxConsecutiveFailures) {
                this.completeDetection();
            } else {
                this.detectImages(startNumber + batchSize, batchSize);
            }
        });
    }

    checkImageExistsMultiFormat(imageNumber) {
        return new Promise(async (resolve) => {
            for (const format of this.supportedFormats) {
                const exists = await this.checkImageExists(imageNumber, format);
                if (exists) {
                    resolve(format);
                    return;
                }
            }
            resolve(null);
        });
    }

    checkImageExists(imageNumber, format) {
        return new Promise((resolve) => {
            const img = new Image();
            const imagePath = `images/${imageNumber}.${format}`;
            
            const timeout = setTimeout(() => resolve(false), 3000);
            
            img.onload = () => {
                clearTimeout(timeout);
                resolve(true);
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                resolve(false);
            };
            
            img.src = imagePath;
        });
    }

    completeDetection() {
        this.state.totalImages = this.state.maxImageNumber;
        this.state.detectionComplete = true;
        
        const pngCount = Array.from(this.state.imageFormats.values()).filter(f => f === 'png').length;
        const jpgCount = Array.from(this.state.imageFormats.values()).filter(f => f === 'jpg').length;
        
        this.statusIndicator.textContent = `Found ${this.state.totalImages} artworks total!`;
        this.statusIndicator.classList.add('complete');
        
        setTimeout(() => {
            this.statusIndicator.classList.remove('visible');
        }, 3000);
        
        this.loadInitialImages();
        this.setupInfiniteScroll();
    }

    setupInfiniteScroll() {
        const sentinel = document.getElementById('sentinel');
        if (sentinel && window.IntersectionObserver && this.state.detectionComplete) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.state.isLoading && 
                        this.state.loadedImages < this.state.totalImages) {
                        this.loadMoreImages();
                    }
                });
            }, { rootMargin: '300px' });
            
            observer.observe(sentinel);
        }
    }

    loadInitialImages() {
        if (!this.state.detectionComplete) return;
        this.loadImages(1, this.state.imagesPerLoad);
    }

    loadMoreImages() {
        if (this.state.isLoading || !this.state.detectionComplete) return;
        
        const nextStartNumber = this.getNextImageNumber();
        if (nextStartNumber > this.state.totalImages) return;
        
        const remaining = this.state.totalImages - nextStartNumber + 1;
        const toLoad = Math.min(this.state.imagesPerLoad, remaining);
        
        this.loadImages(nextStartNumber, toLoad);
    }

    getNextImageNumber() {
        const loadedNumbers = this.state.allImages.map(img => img.number);
        
        for (let i = 1; i <= this.state.totalImages; i++) {
            if (!loadedNumbers.includes(i) && this.state.imageFormats.has(i)) {
                return i;
            }
        }
        
        return this.state.totalImages + 1;
    }

    loadImages(startNumber, count) {
        if (this.state.isLoading) return;
        
        this.state.isLoading = true;
        this.showLoading();
        
        const galleryContainer = document.getElementById('gallery-container');
        if (!galleryContainer) {
            this.state.isLoading = false;
            return;
        }
        
        const numbersToLoad = [];
        const loadedNumbers = this.state.allImages.map(img => img.number);
        let loaded = 0;
        
        for (let i = startNumber; i <= this.state.totalImages && loaded < count; i++) {
            if (!loadedNumbers.includes(i) && this.state.imageFormats.has(i)) {
                numbersToLoad.push(i);
                loaded++;
            }
        }
        
        const loadPromises = numbersToLoad.map(imageNumber => this.createArtworkItem(imageNumber));
        
        Promise.allSettled(loadPromises).then(results => {
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    const imageNumber = numbersToLoad[index];
                    galleryContainer.appendChild(result.value);
                    
                    this.state.allImages.push({
                        number: imageNumber,
                        index: this.state.loadedImages + index,
                        format: this.state.imageFormats.get(imageNumber)
                    });
                }
            });
            
            this.state.loadedImages += numbersToLoad.length;
            this.hideLoading();
            this.updateLoadMoreButton();
            this.state.isLoading = false;
            this.setupRevealForNewItems();
        });
    }

    createArtworkItem(imageNumber) {
        return new Promise((resolve) => {
            const item = document.createElement('div');
            item.className = 'artwork-item loading-skeleton';
            item.dataset.number = imageNumber;
            
            const format = this.state.imageFormats.get(imageNumber);
            if (!format) {
                resolve(item);
                return;
            }
            
            const img = new Image();
            const imagePath = `images/${imageNumber}.${format}`;
            
            img.onload = () => {
                item.className = 'artwork-item';
                const paddedNumber = imageNumber.toString().padStart(4, '0');
                
                item.innerHTML = `
                    <img src="${imagePath}" alt="Artwork ${imageNumber}" loading="lazy" />
                    <div class="artwork-number">#${paddedNumber}</div>
                `;
                
                item.addEventListener('click', () => this.openLightboxByNumber(imageNumber));
                resolve(item);
            };
            
            img.onerror = () => {
                item.className = 'artwork-item';
                const paddedNumber = imageNumber.toString().padStart(4, '0');
                
                item.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; background: rgba(31, 31, 36, 0.4); border-radius: 12px; color: #64748b; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📷</div>
                        <div style="font-size: 0.875rem;">Artwork ${imageNumber}</div>
                    </div>
                    <div class="artwork-number">#${paddedNumber}</div>
                `;
                
                resolve(item);
            };
            
            img.src = imagePath;
        });
    }

    setupRevealForNewItems() {
        const newItems = document.querySelectorAll('.artwork-item:not(.revealed), .achievement-item:not(.revealed)');
        
        if (window.IntersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            newItems.forEach(item => observer.observe(item));
        } else {
            newItems.forEach(item => item.classList.add('revealed'));
        }
    }

    openLightboxByNumber(imageNumber) {
        const imageIndex = this.state.allImages.findIndex(img => img.number === imageNumber);
        if (imageIndex !== -1) {
            this.openLightbox(imageIndex);
        }
    }

    openLightbox(index) {
        if (index >= this.state.allImages.length) return;
        
        this.state.currentLightboxIndex = index;
        const imageData = this.state.allImages[index];
        const format = imageData.format || this.state.imageFormats.get(imageData.number) || 'png';
        const imagePath = `images/${imageData.number}.${format}`;
        
        let lightbox = document.getElementById('custom-lightbox');
        if (!lightbox) {
            lightbox = this.createLightbox();
            document.body.appendChild(lightbox);
        }
        
        const img = lightbox.querySelector('.lightbox-content img');
        const info = lightbox.querySelector('.lightbox-info');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        img.src = imagePath;
        img.alt = `Artwork ${imageData.number}`;
        
        info.textContent = `${index + 1} / ${this.state.allImages.length} - Artwork #${imageData.number}`;
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === this.state.allImages.length - 1;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    openAchievementLightboxByNumber(achievementNumber) {
        const achievementIndex = this.state.allAchievements.findIndex(ach => ach.number === achievementNumber);
        if (achievementIndex !== -1) {
            this.openAchievementLightbox(achievementIndex);
        }
    }

    openAchievementLightbox(index) {
        if (index >= this.state.allAchievements.length) return;
        
        this.state.currentLightboxIndex = index;
        const achievementData = this.state.allAchievements[index];
        const format = achievementData.format || this.state.achievementFormats.get(achievementData.number) || 'png';
        const imagePath = `achievements/${achievementData.number}.${format}`;
        
        let lightbox = document.getElementById('achievement-lightbox');
        if (!lightbox) {
            lightbox = this.createAchievementLightboxElement();
            document.body.appendChild(lightbox);
        }
        
        const img = lightbox.querySelector('.lightbox-content img');
        const info = lightbox.querySelector('.lightbox-info');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        img.src = imagePath;
        img.alt = `Achievement ${achievementData.number}`;
        
        info.textContent = `${index + 1} / ${this.state.allAchievements.length} - Achievement #${achievementData.number}`;
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === this.state.allAchievements.length - 1;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'custom-lightbox';
        lightbox.className = 'lightbox-overlay';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="" />
                <button class="lightbox-close" type="button">×</button>
                <button class="lightbox-nav lightbox-prev" type="button">‹</button>
                <button class="lightbox-nav lightbox-next" type="button">›</button>
                <div class="lightbox-info"></div>
            </div>
        `;
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.navigateLightbox(-1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.navigateLightbox(1));
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        return lightbox;
    }

    createAchievementLightboxElement() {
        const lightbox = document.createElement('div');
        lightbox.id = 'achievement-lightbox';
        lightbox.className = 'lightbox-overlay';
        
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="" />
                <button class="lightbox-close" type="button">×</button>
                <button class="lightbox-nav lightbox-prev" type="button">‹</button>
                <button class="lightbox-nav lightbox-next" type="button">›</button>
                <div class="lightbox-info"></div>
            </div>
        `;
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeAchievementLightbox());
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.navigateAchievementLightbox(-1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.navigateAchievementLightbox(1));
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeAchievementLightbox();
            }
        });
        
        return lightbox;
    }

    closeLightbox() {
        const lightbox = document.getElementById('custom-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeAchievementLightbox() {
        const lightbox = document.getElementById('achievement-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    navigateLightbox(direction) {
        const newIndex = this.state.currentLightboxIndex + direction;
        if (newIndex >= 0 && newIndex < this.state.allImages.length) {
            this.openLightbox(newIndex);
        }
    }

    navigateAchievementLightbox(direction) {
        const newIndex = this.state.currentLightboxIndex + direction;
        if (newIndex >= 0 && newIndex < this.state.allAchievements.length) {
            this.openAchievementLightbox(newIndex);
        }
    }

    showLoading() {
        const indicator = document.getElementById('loading-indicator');
        if (indicator) {
            indicator.classList.remove('hidden');
        }
    }

    hideLoading() {
        const indicator = document.getElementById('loading-indicator');
        if (indicator) {
            indicator.classList.add('hidden');
        }
    }

    updateLoadMoreButton() {
        const btn = document.getElementById('load-more-btn');
        if (!btn) return;
        
        if (this.state.loadedImages >= this.state.totalImages) {
            btn.classList.add('hidden');
        } else {
            btn.classList.remove('hidden');
        }
    }

    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            this.updateProgressBar();
            this.updateBackToTopButton();
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;
        
        const scrollTop = window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        progressBar.style.transform = `scaleX(${scrollProgress / 100})`;
    }

    updateBackToTopButton() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;
        
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 500) {
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    }
}

class SimpleInteractiveBackground {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
    }

    createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const count = window.innerWidth < 768 ? 10 : 20;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(148, 163, 184, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: float-particle ${15 + Math.random() * 10}s infinite linear;
                animation-delay: ${Math.random() * 20}s;
            `;
            container.appendChild(particle);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) {
        console.error('Gallery container not found!');
        return;
    }

    window.portfolioApp = new EnhancedPortfolioApp();

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.interactiveBackground = new SimpleInteractiveBackground();
    }
});