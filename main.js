// Enhanced Portfolio App - Dynamic artworks & achievements detection
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
            imageDimensions: new Map(),
            // Achievement state
            loadedAchievements: 0,
            totalAchievements: null,
            maxAchievementNumber: 0,
            allAchievements: [],
            achievementDetectionComplete: false,
            achievementFormats: new Map(),
            achievementDimensions: new Map()
        };

        this.supportedFormats = ['png', 'jpg'];
        this.init();
    }

    init() {
        console.log('🚀 Enhanced Portfolio App initializing...');
        this.setupStyles();
        this.setupEventListeners();
        this.startDynamicDetection();
        this.startAchievementDetection();
        this.setupScrollEffects();
    }

    setupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Reset and base styles */
            * {
                box-sizing: border-box;
            }
            
            body {
                margin: 0;
                padding: 0;
                font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
                background: #0f0f14;
                color: #e2e8f0;
                line-height: 1.6;
            }

            /* Gallery Styles */
            .gallery {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 2rem;
                max-width: 1800px;
                margin: 0 auto;
                padding: 2rem 1rem;
                align-items: start;
            }
            
            @media (min-width: 640px) {
                .gallery {
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 2.5rem;
                    padding: 3rem 1.5rem;
                }
            }
            
            @media (min-width: 1024px) {
                .gallery {
                    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
                    gap: 3rem;
                    padding: 4rem 2rem;
                }
            }
            
            @media (min-width: 1400px) {
                .gallery {
                    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
                    gap: 3.5rem;
                }
            }

            /* Achievement Gallery Styles */
            .achievements-gallery {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
                max-width: 1600px;
                margin: 0 auto;
                padding: 2rem 1rem;
                align-items: start;
            }
            
            @media (min-width: 640px) {
                .achievements-gallery {
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                    padding: 3rem 1.5rem;
                }
            }
            
            @media (min-width: 1024px) {
                .achievements-gallery {
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 2.5rem;
                    padding: 4rem 2rem;
                }
            }

            /* Artwork Item Styles */
            .artwork-item, .achievement-item {
                position: relative;
                background: linear-gradient(145deg, #1a1a1f, #141419);
                border-radius: 20px;
                overflow: hidden;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                border: 1px solid rgba(255, 255, 255, 0.08);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                width: 100%;
                padding: 1rem;
            }
            
            .artwork-item:hover, .achievement-item:hover {
                transform: translateY(-8px) scale(1.02);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                border-color: rgba(226, 232, 240, 0.2);
                z-index: 10;
            }
            
            .artwork-item .image-container, .achievement-item .image-container {
                width: 100%;
                height: auto;
                position: relative;
                background: rgba(31, 31, 36, 0.4);
                border-radius: 16px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .artwork-item img, .achievement-item img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: center;
                display: block;
                transition: transform 0.3s ease;
                border-radius: 12px;
            }
            
            .artwork-item:hover img, .achievement-item:hover img {
                transform: scale(1.05);
            }

            /* Dynamic aspect ratios */
            .artwork-item.portrait .image-container, .achievement-item.portrait .image-container { aspect-ratio: 3/4; }
            .artwork-item.landscape .image-container, .achievement-item.landscape .image-container { aspect-ratio: 4/3; }
            .artwork-item.square .image-container, .achievement-item.square .image-container { aspect-ratio: 1/1; }
            .artwork-item.wide .image-container, .achievement-item.wide .image-container { aspect-ratio: 16/9; }
            .artwork-item.tall .image-container, .achievement-item.tall .image-container { aspect-ratio: 2/3; }
            .artwork-item.ultra-wide .image-container, .achievement-item.ultra-wide .image-container { aspect-ratio: 21/9; }

            /* Wide images span multiple columns on larger screens */
            @media (min-width: 1024px) {
                .artwork-item.ultra-wide, .achievement-item.ultra-wide {
                    grid-column: span 2;
                }
            }

            /* Info overlays */
            .artwork-number, .achievement-number {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(12px);
                color: #94a3b8;
                padding: 8px 12px;
                border-radius: 10px;
                font-size: 0.75rem;
                font-weight: 600;
                font-family: 'Space Grotesk', monospace;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                z-index: 2;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .artwork-item:hover .artwork-number, .achievement-item:hover .achievement-number {
                opacity: 1;
                transform: translateY(0);
            }
            
            .image-info {
                position: absolute;
                bottom: 1rem;
                left: 1rem;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(12px);
                color: #94a3b8;
                padding: 6px 10px;
                border-radius: 8px;
                font-size: 0.7rem;
                font-weight: 500;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                z-index: 2;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .artwork-item:hover .image-info, .achievement-item:hover .image-info {
                opacity: 1;
                transform: translateY(0);
            }
            
            .aspect-ratio-indicator {
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: rgba(34, 197, 94, 0.9);
                color: white;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 0.65rem;
                font-weight: 600;
                text-transform: uppercase;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                z-index: 2;
            }

            /* Achievement-specific indicator color */
            .achievement-item .aspect-ratio-indicator {
                background: rgba(255, 193, 7, 0.9);
            }

            /* Orientation-specific colors */
            .artwork-item.landscape .aspect-ratio-indicator { background: rgba(59, 130, 246, 0.9); }
            .artwork-item.portrait .aspect-ratio-indicator { background: rgba(236, 72, 153, 0.9); }
            .artwork-item.square .aspect-ratio-indicator { background: rgba(34, 197, 94, 0.9); }
            .artwork-item.wide .aspect-ratio-indicator,
            .artwork-item.ultra-wide .aspect-ratio-indicator { background: rgba(245, 158, 11, 0.9); }
            .artwork-item.tall .aspect-ratio-indicator { background: rgba(139, 92, 246, 0.9); }
            
            .achievement-item.landscape .aspect-ratio-indicator { background: rgba(255, 193, 7, 0.9); }
            .achievement-item.portrait .aspect-ratio-indicator { background: rgba(255, 193, 7, 0.9); }
            .achievement-item.square .aspect-ratio-indicator { background: rgba(255, 193, 7, 0.9); }
            .achievement-item.wide .aspect-ratio-indicator,
            .achievement-item.ultra-wide .aspect-ratio-indicator { background: rgba(255, 193, 7, 0.9); }
            .achievement-item.tall .aspect-ratio-indicator { background: rgba(255, 193, 7, 0.9); }
            
            .artwork-item:hover .aspect-ratio-indicator, .achievement-item:hover .aspect-ratio-indicator {
                opacity: 1;
                transform: translateY(0);
            }

            /* Loading skeleton */
            .loading-skeleton {
                background: linear-gradient(90deg, #1f1f24 25%, #2a2a2f 50%, #1f1f24 75%);
                background-size: 200% 100%;
                animation: shimmer 2s infinite;
                border-radius: 20px;
                min-height: 300px;
            }
            
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }

            /* Lightbox Styles */
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(24px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.4s ease;
                padding: 2rem;
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
                border-radius: 12px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
                display: block;
            }

            .lightbox-close,
            .lightbox-nav {
                position: absolute;
                width: 48px;
                height: 48px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                font-size: 18px;
                font-weight: bold;
                z-index: 10;
                border: none;
                outline: none;
            }

            .lightbox-close {
                top: 20px;
                right: 20px;
                font-size: 20px;
            }

            .lightbox-close:hover,
            .lightbox-nav:hover {
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

            .lightbox-nav:disabled:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-50%) scale(0.9);
            }

            .lightbox-prev { left: 20px; }
            .lightbox-next { right: 20px; }

            .lightbox-info {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: #94a3b8;
                font-size: 0.875rem;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                padding: 12px 24px;
                border-radius: 25px;
                text-align: center;
                white-space: nowrap;
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 90vw;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* Detection status */
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

            /* Mobile responsive */
            @media (max-width: 768px) {
                .gallery, .achievements-gallery {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    padding: 1rem 0.5rem;
                }
                
                .artwork-item, .achievement-item {
                    padding: 1rem;
                }
                
                .artwork-item.ultra-wide, .achievement-item.ultra-wide {
                    grid-column: span 1;
                }
                
                .lightbox-overlay {
                    padding: 1rem;
                }
                
                .lightbox-content img {
                    max-width: 90vw;
                    max-height: 80vh;
                }
                
                .lightbox-close,
                .lightbox-prev,
                .lightbox-next {
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                }

                .lightbox-close {
                    top: 10px;
                    right: 10px;
                }

                .lightbox-prev { left: 10px; }
                .lightbox-next { right: 10px; }
                
                .lightbox-info {
                    bottom: 10px;
                    font-size: 0.75rem;
                    padding: 8px 16px;
                    max-width: 85vw;
                }
                
                .artwork-number, .achievement-number,
                .image-info,
                .aspect-ratio-indicator {
                    font-size: 0.65rem;
                    padding: 4px 6px;
                }
            }

            @media (max-width: 480px) {
                .gallery, .achievements-gallery {
                    gap: 1rem;
                    padding: 0.75rem 0.25rem;
                }
                
                .artwork-item, .achievement-item {
                    padding: 0.75rem;
                }
            }

            /* Utility classes */
            .hidden {
                display: none !important;
            }

            .loading {
                pointer-events: none;
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Mobile navigation
        this.setupMobileNavigation();
        
        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreImages());
        }
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Back to top
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Keyboard shortcuts
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
        
        // Close mobile nav when clicking links
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

    handleResize() {
        if (window.innerWidth >= 768 && this.state.isMobileNavOpen) {
            this.state.isMobileNavOpen = false;
            const mobileNav = document.getElementById('mobile-nav');
            mobileNav?.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    handleKeyboard(e) {
        const lightbox = document.getElementById('custom-lightbox');
        if (!lightbox?.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                this.closeLightbox();
                break;
            case 'ArrowLeft':
                this.navigateLightbox(-1);
                break;
            case 'ArrowRight':
                this.navigateLightbox(1);
                break;
        }
    }

    // ARTWORK DETECTION (existing methods)
    startDynamicDetection() {
        console.log('🔍 Starting artwork detection...');
        
        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'detection-status visible';
        statusIndicator.textContent = 'Detecting artworks...';
        document.body.appendChild(statusIndicator);
        
        this.statusIndicator = statusIndicator;
        this.detectImages(1);
    }

    // ACHIEVEMENT DETECTION (new methods)
    startAchievementDetection() {
        console.log('🏆 Starting achievement detection...');
        this.detectAchievements(1);
    }

    detectAchievements(startNumber, batchSize = 50) {
        const promises = [];
        const currentBatch = [];
        
        console.log(`🏆 Detecting achievement batch starting from ${startNumber}...`);
        
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
            
            console.log(`🏆 Achievement batch ${startNumber}-${startNumber + batchSize - 1}: Found ${foundInBatch} achievements`);
            
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
        
        const pngCount = Array.from(this.state.achievementFormats.values()).filter(f => f === 'png').length;
        const jpgCount = Array.from(this.state.achievementFormats.values()).filter(f => f === 'jpg').length;
        
        console.log(`✅ Achievement detection complete! Found ${this.state.totalAchievements} achievements (${pngCount} PNG, ${jpgCount} JPG).`);
        
        this.loadAllAchievements();
    }

    loadAllAchievements() {
        if (!this.state.achievementDetectionComplete) {
            console.log('⏳ Waiting for achievement detection to complete...');
            return;
        }
        
        console.log(`🏆 Loading all achievements... (Total: ${this.state.totalAchievements})`);
        
        const achievementContainer = document.getElementById('achievements-container');
        if (!achievementContainer) {
            console.log('No achievements container found');
            return;
        }

        if (this.state.totalAchievements === 0) {
            achievementContainer.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">No achievements found.</p>';
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
                    achievementContainer.appendChild(result.value.element);
                    
                    this.state.allAchievements.push({
                        number: achievementNumber,
                        index: this.state.loadedAchievements + index,
                        format: this.state.achievementFormats.get(achievementNumber),
                        dimensions: result.value.dimensions
                    });
                }
            });
            
            this.state.loadedAchievements += numbersToLoad.length;
            console.log(`✅ Loaded ${this.state.loadedAchievements} achievements`);
        });
    }

    createAchievementItem(achievementNumber) {
        return new Promise((resolve) => {
            const item = document.createElement('div');
            item.className = 'achievement-item loading-skeleton';
            item.dataset.number = achievementNumber;
            
            const format = this.state.achievementFormats.get(achievementNumber);
            if (!format) {
                console.error(`No format found for achievement ${achievementNumber}`);
                resolve({ element: item, dimensions: null });
                return;
            }
            
            const img = new Image();
            const imagePath = `achievements/${achievementNumber}.${format}`;
            
            img.onload = () => {
                console.log(`✓ Loaded achievement: ${imagePath} (${img.naturalWidth}x${img.naturalHeight})`);
                
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                const aspectRatio = width / height;
                const dimensions = { width, height, aspectRatio };
                
                this.state.achievementDimensions.set(achievementNumber, dimensions);
                
                // Determine orientation
                let orientationClass = '';
                let orientationLabel = '';
                
                if (aspectRatio > 2.5) {
                    orientationClass = 'ultra-wide';
                    orientationLabel = 'Ultra Wide';
                } else if (aspectRatio > 1.8) {
                    orientationClass = 'wide';
                    orientationLabel = 'Wide';
                } else if (aspectRatio > 1.3) {
                    orientationClass = 'landscape';
                    orientationLabel = 'Landscape';
                } else if (aspectRatio > 0.8) {
                    orientationClass = 'square';
                    orientationLabel = 'Square';
                } else if (aspectRatio > 0.5) {
                    orientationClass = 'portrait';
                    orientationLabel = 'Portrait';
                } else {
                    orientationClass = 'tall';
                    orientationLabel = 'Tall';
                }
                
                item.className = `achievement-item ${orientationClass}`;
                
                const paddedNumber = achievementNumber.toString().padStart(4, '0');
                const sizeText = `${width}×${height}`;
                
                item.innerHTML = `
                    <div class="image-container">
                        <img src="${imagePath}" alt="Achievement ${achievementNumber}" loading="lazy" />
                    </div>
                    <div class="achievement-number">#${paddedNumber}</div>
                    <div class="image-info">${sizeText}</div>
                    <div class="aspect-ratio-indicator">${orientationLabel}</div>
                `;
                
                item.addEventListener('click', () => this.openAchievementLightboxByNumber(achievementNumber));
                
                resolve({ element: item, dimensions });
            };
            
            img.onerror = () => {
                console.warn(`✗ Failed to load achievement: ${imagePath}`);
                
                item.className = 'achievement-item';
                const paddedNumber = achievementNumber.toString().padStart(4, '0');
                
                item.innerHTML = `
                    <div class="image-container" style="aspect-ratio: 4/3;">
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #64748b; text-align: center; padding: 2rem;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
                            <div style="font-size: 0.875rem; margin-bottom: 0.25rem;">Achievement ${achievementNumber}</div>
                            <div style="font-size: 0.75rem; opacity: 0.7;">Image not found</div>
                        </div>
                    </div>
                    <div class="achievement-number">#${paddedNumber}</div>
                `;
                
                resolve({ element: item, dimensions: null });
            };
            
            img.src = imagePath;
        });
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
        const dimensions = this.state.achievementDimensions.get(achievementData.number);
        
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
        
        let infoText = `${index + 1} / ${this.state.allAchievements.length} - Achievement #${achievementData.number}`;
        if (dimensions) {
            const ratio = dimensions.aspectRatio.toFixed(2);
            infoText += ` • ${dimensions.width}×${dimensions.height} • ${ratio}:1`;
        }
        info.textContent = infoText;
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === this.state.allAchievements.length - 1;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
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
        
        // Event listeners
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

    closeAchievementLightbox() {
        const lightbox = document.getElementById('achievement-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    navigateAchievementLightbox(direction) {
        const newIndex = this.state.currentLightboxIndex + direction;
        if (newIndex >= 0 && newIndex < this.state.allAchievements.length) {
            this.openAchievementLightbox(newIndex);
        }
    }

    // EXISTING ARTWORK METHODS (keeping all existing functionality)
    detectImages(startNumber, batchSize = 50) {
        const promises = [];
        const currentBatch = [];
        
        console.log(`🔍 Detecting batch starting from ${startNumber}...`);
        
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
            
            console.log(`📊 Batch ${startNumber}-${startNumber + batchSize - 1}: Found ${foundInBatch} images`);
            
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
        
        console.log(`✅ Artwork detection complete! Found ${this.state.totalImages} images (${pngCount} PNG, ${jpgCount} JPG).`);
        
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
        if (!this.state.detectionComplete) {
            console.log('⏳ Waiting for detection to complete...');
            return;
        }
        
        console.log(`📷 Loading initial images... (Total: ${this.state.totalImages})`);
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
        
        console.log(`📷 Loading ${count} images starting from #${startNumber}`);
        
        const galleryContainer = document.getElementById('gallery-container');
        if (!galleryContainer) {
            console.error('Gallery container not found');
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
                    galleryContainer.appendChild(result.value.element);
                    
                    this.state.allImages.push({
                        number: imageNumber,
                        index: this.state.loadedImages + index,
                        format: this.state.imageFormats.get(imageNumber),
                        dimensions: result.value.dimensions
                    });
                }
            });
            
            this.state.loadedImages += numbersToLoad.length;
            this.hideLoading();
            this.updateLoadMoreButton();
            this.state.isLoading = false;
            
            console.log(`✅ Loaded ${this.state.loadedImages}/${this.state.totalImages} images`);
        });
    }

    createArtworkItem(imageNumber) {
        return new Promise((resolve) => {
            const item = document.createElement('div');
            item.className = 'artwork-item loading-skeleton';
            item.dataset.number = imageNumber;
            
            const format = this.state.imageFormats.get(imageNumber);
            if (!format) {
                console.error(`No format found for image ${imageNumber}`);
                resolve({ element: item, dimensions: null });
                return;
            }
            
            const img = new Image();
            const imagePath = `images/${imageNumber}.${format}`;
            
            img.onload = () => {
                console.log(`✓ Loaded: ${imagePath} (${img.naturalWidth}x${img.naturalHeight})`);
                
                const width = img.naturalWidth;
                const height = img.naturalHeight;
                const aspectRatio = width / height;
                const dimensions = { width, height, aspectRatio };
                
                this.state.imageDimensions.set(imageNumber, dimensions);
                
                // Determine orientation
                let orientationClass = '';
                let orientationLabel = '';
                
                if (aspectRatio > 2.5) {
                    orientationClass = 'ultra-wide';
                    orientationLabel = 'Ultra Wide';
                } else if (aspectRatio > 1.8) {
                    orientationClass = 'wide';
                    orientationLabel = 'Wide';
                } else if (aspectRatio > 1.3) {
                    orientationClass = 'landscape';
                    orientationLabel = 'Landscape';
                } else if (aspectRatio > 0.8) {
                    orientationClass = 'square';
                    orientationLabel = 'Square';
                } else if (aspectRatio > 0.5) {
                    orientationClass = 'portrait';
                    orientationLabel = 'Portrait';
                } else {
                    orientationClass = 'tall';
                    orientationLabel = 'Tall';
                }
                
                item.className = `artwork-item ${orientationClass}`;
                
                const paddedNumber = imageNumber.toString().padStart(4, '0');
                const sizeText = `${width}×${height}`;
                
                item.innerHTML = `
                    <div class="image-container">
                        <img src="${imagePath}" alt="Artwork ${imageNumber}" loading="lazy" />
                    </div>
                    <div class="artwork-number">#${paddedNumber}</div>
                    <div class="image-info">${sizeText}</div>
                    <div class="aspect-ratio-indicator">${orientationLabel}</div>
                `;
                
                item.addEventListener('click', () => this.openLightboxByNumber(imageNumber));
                
                resolve({ element: item, dimensions });
            };
            
            img.onerror = () => {
                console.warn(`✗ Failed to load: ${imagePath}`);
                
                item.className = 'artwork-item';
                const paddedNumber = imageNumber.toString().padStart(4, '0');
                
                item.innerHTML = `
                    <div class="image-container" style="aspect-ratio: 4/3;">
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #64748b; text-align: center; padding: 2rem;">
                            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📷</div>
                            <div style="font-size: 0.875rem; margin-bottom: 0.25rem;">Artwork ${imageNumber}</div>
                            <div style="font-size: 0.75rem; opacity: 0.7;">Image not found</div>
                        </div>
                    </div>
                    <div class="artwork-number">#${paddedNumber}</div>
                `;
                
                resolve({ element: item, dimensions: null });
            };
            
            img.src = imagePath;
        });
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
        const dimensions = this.state.imageDimensions.get(imageData.number);
        
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
        
        let infoText = `${index + 1} / ${this.state.allImages.length} - Artwork #${imageData.number}`;
        if (dimensions) {
            const ratio = dimensions.aspectRatio.toFixed(2);
            infoText += ` • ${dimensions.width}×${dimensions.height} • ${ratio}:1`;
        }
        info.textContent = infoText;
        
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === this.state.allImages.length - 1;
        
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
        
        // Event listeners
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

    closeLightbox() {
        const lightbox = document.getElementById('custom-lightbox');
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

    // UTILITY METHODS
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

    getImageStats() {
        const stats = {
            total: this.state.totalImages,
            png: 0,
            jpg: 0,
            loaded: this.state.loadedImages,
            orientations: {
                portrait: 0,
                landscape: 0,
                square: 0,
                wide: 0,
                'ultra-wide': 0,
                tall: 0
            },
            achievements: {
                total: this.state.totalAchievements,
                png: 0,
                jpg: 0,
                loaded: this.state.loadedAchievements
            }
        };
        
        this.state.imageFormats.forEach(format => {
            stats[format]++;
        });

        this.state.achievementFormats.forEach(format => {
            stats.achievements[format]++;
        });
        
        this.state.imageDimensions.forEach(dimensions => {
            const aspectRatio = dimensions.aspectRatio;
            if (aspectRatio > 2.5) {
                stats.orientations['ultra-wide']++;
            } else if (aspectRatio > 1.8) {
                stats.orientations.wide++;
            } else if (aspectRatio > 1.3) {
                stats.orientations.landscape++;
            } else if (aspectRatio > 0.8) {
                stats.orientations.square++;
            } else if (aspectRatio > 0.5) {
                stats.orientations.portrait++;
            } else {
                stats.orientations.tall++;
            }
        });
        
        return stats;
    }

    logDetectionResults() {
        const stats = this.getImageStats();
        console.log('📊 Portfolio Statistics:', {
            'Artworks': {
                'Total': stats.total,
                'PNG Files': stats.png,
                'JPG Files': stats.jpg,
                'Currently Loaded': stats.loaded,
                'Orientations': stats.orientations
            },
            'Achievements': {
                'Total': stats.achievements.total,
                'PNG Files': stats.achievements.png,
                'JPG Files': stats.achievements.jpg,
                'Loaded': stats.achievements.loaded
            },
            'Detection Complete': {
                'Artworks': this.state.detectionComplete,
                'Achievements': this.state.achievementDetectionComplete
            }
        });
    }
}

// Simple interactive background
class SimpleInteractiveBackground {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.setupCursorFollower();
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

    setupCursorFollower() {
        const follower = document.getElementById('cursor-follower');
        if (!follower || window.innerWidth <= 768) return;
        
        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Enhanced Portfolio App...');

    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) {
        console.error('❌ Gallery container not found! Make sure element with id="gallery-container" exists.');
        return;
    }

    // Initialize main app
    window.portfolioApp = new EnhancedPortfolioApp();

    // Initialize background effects
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.interactiveBackground = new SimpleInteractiveBackground();
    }

    // Global utilities
    window.showImageStats = () => {
        if (window.portfolioApp) {
            window.portfolioApp.logDetectionResults();
        }
    };

    console.log('✅ Enhanced Portfolio App initialized successfully!');
    console.log('💡 Tip: Run showImageStats() in console for detailed statistics');
});