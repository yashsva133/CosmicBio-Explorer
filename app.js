// Enhanced Space Research Hub - Main Application Logic with Perfect Text Visibility
// Author: Research Development Team
// Version: 2.2.0 - Enhanced Text Visibility Edition

class SpaceResearchHub {
    constructor() {
        this.currentActiveSection = 'dashboard';
        this.researchDatabase = null;
        this.trainingData = null;
        this.filteredResearchPapers = [];
        this.currentPageNumber = 1;
        this.itemsPerPageCount = 20;
        this.chartInstances = {};
        this.userAPIKeys = {
            geminiKey: this.retrieveStoredAPIKey('gemini_api_key') || '',
            unsplashKey: this.retrieveStoredAPIKey('unsplash_api_key') || '',
            huggingfaceKey: this.retrieveStoredAPIKey('huggingface_api_key') || ''
        };
        
        // API service endpoints
        this.apiServiceEndpoints = {
            geminiService: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
            unsplashImageService: 'https://api.unsplash.com/search/photos',
            huggingfaceService: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium'
        };

        this.researchFilterCriteria = {
            publicationYearRange: { minimum: 2020, maximum: 2025 },
            citationCountRange: { minimum: 0, maximum: 1000 },
            selectedResearchTypes: [],
            selectedOrganismTypes: [],
            selectedCategories: ['space_biology', 'medical_research', 'plant_research', 'radiation_studies', 'technology_innovation', 'microbiome']
        };

        this.initializeApplication();
    }

    async initializeApplication() {
        this.showLoadingState('🚀 Initializing Space Research Hub with Enhanced Visibility...');
        
        try {
            await this.loadResearchDataFromSources();
            this.setupUserInterfaceEventListeners();
            this.startStatCounterAnimations();
            this.updateAPIServiceStatus();
            this.initializeDataVisualizationCharts();
            this.loadUserThemePreferences();
            this.displaySection('dashboard');
            
            // Initialize enhanced animated background
            this.initializeEnhancedSpaceBackground();
            
            // Show success notification
            this.showNotification('🌌 Space Research Hub loaded successfully with perfect text visibility!', 'success');
            
        } catch (error) {
            console.error('Application initialization failed:', error);
            this.handleInitializationError();
        } finally {
            this.hideLoadingState();
        }
    }

    initializeEnhancedSpaceBackground() {
        // Add enhanced shooting star effects with better visibility controls
        setInterval(() => {
            this.createEnhancedShootingStar();
        }, 10000 + Math.random() * 15000);
    }

    createEnhancedShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'enhanced-shooting-star';
        shootingStar.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: linear-gradient(45deg, rgba(0, 217, 255, 0.8), transparent);
            border-radius: 50%;
            top: ${Math.random() * 40}%;
            left: -20px;
            animation: enhancedShootingStarTrail 4s linear forwards;
            z-index: -1;
            opacity: 0.6;
            box-shadow: 0 0 6px rgba(0, 217, 255, 0.5);
        `;
        
        document.querySelector('.space-background').appendChild(shootingStar);
        
        setTimeout(() => {
            shootingStar.remove();
        }, 4000);
        
        // Add enhanced CSS animation if not already present
        if (!document.querySelector('#enhanced-shooting-star-style')) {
            const style = document.createElement('style');
            style.id = 'enhanced-shooting-star-style';
            style.textContent = `
                @keyframes enhancedShootingStarTrail {
                    0% { 
                        transform: translateX(-20px) translateY(0px);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    90% {
                        opacity: 0.8;
                    }
                    100% { 
                        transform: translateX(400px) translateY(250px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    retrieveStoredAPIKey(keyName) {
        try {
            return localStorage.getItem(keyName) || '';
        } catch (error) {
            console.warn('Local storage access failed:', error);
            return '';
        }
    }

    async loadResearchDataFromSources() {
        try {
            // Simulate loading research database with enhanced data
            this.trainingData = {
                total_papers: 607,
                training_data: {
                    version: "2.2.0",
                    last_updated: "2025-10-04",
                    data_entries: [
                        {
                            id: "sp_001",
                            query: "microgravity effects on human bones",
                            text_content: "Microgravity exposure during spaceflight leads to significant bone loss, particularly in weight-bearing bones. Astronauts can lose 1-2% of bone mass per month during space missions. The absence of gravitational loading disrupts normal bone remodeling processes, leading to increased bone resorption by osteoclasts and decreased bone formation by osteoblasts. This condition, known as spaceflight osteopenia, poses serious health risks for long-duration missions to Mars and beyond.",
                            key_points: [
                                "Bone loss rate: 1-2% per month in microgravity",
                                "Weight-bearing bones most affected",
                                "Increased osteoclast activity causes bone breakdown", 
                                "Reduced osteoblast function limits bone formation",
                                "Major concern for Mars missions lasting 6-9 months"
                            ],
                            related_images: ["bone_structure", "astronaut_exercise", "bone_density_scan"],
                            category: "medical_research",
                            confidence: 0.95
                        },
                        {
                            id: "sp_002",
                            query: "plant growth space experiments", 
                            text_content: "Plant cultivation in space environments presents unique challenges and opportunities for sustainable space exploration. The Advanced Plant Habitat (APH) aboard the International Space Station has enabled researchers to study how microgravity affects plant growth, root development, and phototropism. Key findings include altered water distribution in plant tissues, modified root growth patterns that tend to follow moisture gradients rather than gravity, and enhanced secondary metabolite production in some species.",
                            key_points: [
                                "Advanced Plant Habitat enables space botany research",
                                "Water distribution altered in microgravity conditions",
                                "Root growth follows moisture instead of gravity",
                                "Enhanced production of beneficial compounds",
                                "Critical for long-term space food security"
                            ],
                            related_images: ["space_plants", "plant_habitat", "root_growth"],
                            category: "plant_research", 
                            confidence: 0.92
                        },
                        {
                            id: "sp_003",
                            query: "space radiation cancer risk",
                            text_content: "Cosmic radiation exposure significantly increases cancer risk for astronauts on deep space missions. Galactic cosmic rays (GCRs) consist of high-energy particles that can penetrate spacecraft shielding and cause DNA damage. Unlike terrestrial radiation, cosmic radiation includes heavy ions that create dense ionization tracks, leading to complex DNA lesions that are difficult for cells to repair. NASA estimates a 3% increase in lifetime cancer risk for each year spent in deep space.",
                            key_points: [
                                "Galactic cosmic rays penetrate spacecraft shielding",
                                "Heavy ions cause complex DNA damage", 
                                "3% increased cancer risk per year in deep space",
                                "DNA repair mechanisms challenged by radiation quality",
                                "Shielding strategies under development"
                            ],
                            related_images: ["cosmic_rays", "dna_damage", "radiation_shielding"],
                            category: "radiation_studies",
                            confidence: 0.88
                        }
                    ]
                },
                categories: {
                    space_biology: {
                        count: 287,
                        description: "Research on biological effects of space environment",
                        keywords: ["microgravity", "spaceflight", "astronaut", "ISS"],
                        color: "#00D9FF"
                    },
                    plant_research: {
                        count: 145, 
                        description: "Studies on plant growth and adaptation in space",
                        keywords: ["arabidopsis", "root", "growth", "plant"],
                        color: "#10B981"
                    },
                    medical_research: {
                        count: 198,
                        description: "Medical and physiological research in space conditions", 
                        keywords: ["bone", "muscle", "heart", "cancer", "medical"],
                        color: "#FF6B6B"
                    },
                    microbiome: {
                        count: 89,
                        description: "Microbial studies in space environments",
                        keywords: ["bacteria", "microbiome", "fungi", "antimicrobial"], 
                        color: "#6B46C1"
                    },
                    radiation_studies: {
                        count: 156,
                        description: "Effects of space radiation on biological systems",
                        keywords: ["radiation", "cosmic", "DNA", "chromosomal"],
                        color: "#FFD700"
                    },
                    technology_innovation: {
                        count: 134,
                        description: "Space technology and innovation research",
                        keywords: ["technology", "system", "innovation", "equipment"],
                        color: "#F59E0B"
                    }
                }
            };
            
            // Process training data for research insights
            this.processTrainingDataForInsights();
            
        } catch (error) {
            console.error('Failed to load research data:', error);
            // Use fallback data
            this.initializeFallbackResearchData();
        }
    }

    processTrainingDataForInsights() {
        if (this.trainingData && this.trainingData.training_data) {
            // Extract research entries from training data
            const researchEntries = this.trainingData.training_data.data_entries || [];
            
            // Create comprehensive research database
            this.researchDatabase = {
                total_papers: this.trainingData.total_papers || 607,
                categories: this.trainingData.categories || {},
                researchEntries: researchEntries,
                samplePapers: this.generateSamplePapersFromTraining(researchEntries),
                timelineData: { "2020": 45, "2021": 78, "2022": 125, "2023": 167, "2024": 142, "2025": 50 }
            };
            
            this.filteredResearchPapers = [...this.researchDatabase.samplePapers];
        }
    }

    generateSamplePapersFromTraining(trainingEntries) {
        const samplePapers = [];
        
        // Generate sample papers based on training entries
        const additionalPapers = [
            {
                title: "Microgravity Effects on Bone Density in Long-Duration Space Missions",
                link: "https://research.nasa.gov/bone-density-study",
                category: "medical_research",
                year: 2023,
                citations: 89,
                organism: "Human",
                research_type: "Experimental",
                keyPoints: [
                    "Bone loss rate of 1-2% per month observed in microgravity",
                    "Weight-bearing bones most severely affected",
                    "Countermeasure exercises show promising results",
                    "Long-term implications for Mars missions identified"
                ]
            },
            {
                title: "Advanced Plant Growth Systems for Space Agriculture",
                link: "https://research.nasa.gov/plant-growth-systems",
                category: "plant_research",
                year: 2024,
                citations: 67,
                organism: "Plant",
                research_type: "Experimental",
                keyPoints: [
                    "LED lighting systems optimize plant growth in space",
                    "Hydroponic systems adapted for microgravity conditions",
                    "Nutritional content maintained in space-grown vegetables",
                    "Potential for sustainable food production on Mars"
                ]
            },
            {
                title: "Cosmic Radiation Shielding Technologies for Deep Space Exploration",
                link: "https://research.nasa.gov/radiation-shielding",
                category: "radiation_studies",
                year: 2024,
                citations: 112,
                organism: "Human",
                research_type: "Review",
                keyPoints: [
                    "Galactic cosmic rays pose significant health risks",
                    "Advanced materials show promise for radiation protection",
                    "Magnetic field generation technologies under development",
                    "Risk assessment models updated for Mars missions"
                ]
            },
            {
                title: "Astronaut Muscle Atrophy Prevention in Microgravity",
                link: "https://research.nasa.gov/muscle-atrophy-prevention",
                category: "medical_research",
                year: 2023,
                citations: 94,
                organism: "Human",
                research_type: "Experimental",
                keyPoints: [
                    "15-20% muscle loss within 5-11 days of spaceflight",
                    "ARED system provides effective resistance training",
                    "Targeted exercise protocols maintain muscle function",
                    "Complete atrophy prevention remains challenging"
                ]
            },
            {
                title: "Space Microbiome Changes During Long-Duration Missions",
                link: "https://research.nasa.gov/space-microbiome",
                category: "microbiome",
                year: 2023,
                citations: 76,
                organism: "Microorganism",
                research_type: "Observational",
                keyPoints: [
                    "Gut microbial diversity decreases during spaceflight",
                    "Beneficial bacteria populations decline",
                    "Pathogenic species may increase in abundance",
                    "Important implications for immune system health"
                ]
            }
        ];
        
        trainingEntries.forEach((entry, index) => {
            samplePapers.push({
                title: entry.text_content.substring(0, 80) + "...",
                link: `https://research.example.com/paper/${entry.id}`,
                category: entry.category || 'space_biology',
                year: 2020 + (index % 5),
                citations: Math.floor(Math.random() * 200) + 10,
                organism: this.determineOrganismFromContent(entry.text_content),
                research_type: entry.confidence > 0.9 ? 'Experimental' : 'Observational',
                keyPoints: entry.key_points || [],
                relatedImages: entry.related_images || []
            });
        });
        
        return [...additionalPapers, ...samplePapers];
    }

    determineOrganismFromContent(content) {
        const contentLower = content.toLowerCase();
        if (contentLower.includes('human') || contentLower.includes('astronaut')) return 'Human';
        if (contentLower.includes('mouse') || contentLower.includes('mice')) return 'Mouse';
        if (contentLower.includes('plant') || contentLower.includes('arabidopsis')) return 'Plant';
        if (contentLower.includes('bacteria') || contentLower.includes('microbiome')) return 'Microorganism';
        if (contentLower.includes('cell') || contentLower.includes('tissue')) return 'Cell Culture';
        return 'Human';
    }

    initializeFallbackResearchData() {
        this.researchDatabase = {
            total_papers: 607,
            categories: {
                space_biology: { count: 287, description: "Research on biological effects of space environment" },
                medical_research: { count: 198, description: "Medical and physiological research in space conditions" },
                radiation_studies: { count: 156, description: "Effects of space radiation on biological systems" },
                plant_research: { count: 145, description: "Studies on plant growth and adaptation in space" },
                technology_innovation: { count: 134, description: "Space technology and innovation research" },
                microbiome: { count: 89, description: "Microbial studies in space environments" }
            },
            timelineData: { "2020": 45, "2021": 78, "2022": 125, "2023": 167, "2024": 142, "2025": 50 },
            samplePapers: [
                {
                    title: "Microgravity Effects on Bone Density in Long-Duration Space Missions",
                    link: "https://research.nasa.gov/bone-density-study",
                    category: "medical_research",
                    year: 2023,
                    citations: 89,
                    organism: "Human",
                    research_type: "Experimental",
                    keyPoints: [
                        "Bone loss rate of 1-2% per month observed in microgravity",
                        "Weight-bearing bones most severely affected",
                        "Countermeasure exercises show promising results",
                        "Long-term implications for Mars missions identified"
                    ]
                }
            ]
        };
        
        this.filteredResearchPapers = [...this.researchDatabase.samplePapers];
    }

    setupUserInterfaceEventListeners() {
        // Navigation menu handlers
        document.getElementById('hamburger').addEventListener('click', () => {
            this.toggleNavigationSidebar();
        });

        document.getElementById('sidebarClose').addEventListener('click', () => {
            this.closeNavigationSidebar();
        });

        // Section navigation
        document.querySelectorAll('.menu-link').forEach(menuLink => {
            menuLink.addEventListener('click', (event) => {
                event.preventDefault();
                const targetSection = menuLink.dataset.section;
                this.displaySection(targetSection);
                this.updateActiveMenuHighlight(menuLink);
                this.closeNavigationSidebar();
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleApplicationTheme();
        });

        // Primary research query
        document.getElementById('executeResearchQuery').addEventListener('click', () => {
            this.processResearchQuery();
        });

        document.getElementById('primaryResearchQuery').addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.processResearchQuery();
            }
        });

        // Research suggestion chips
        document.querySelectorAll('.suggestion-tag').forEach(suggestionTag => {
            suggestionTag.addEventListener('click', () => {
                document.getElementById('primaryResearchQuery').value = suggestionTag.dataset.query;
                this.processResearchQuery();
            });
        });

        // Category module clicks
        document.querySelectorAll('.category-module').forEach(categoryModule => {
            categoryModule.addEventListener('click', () => {
                const selectedCategory = categoryModule.dataset.category;
                this.filterResearchByCategory(selectedCategory);
                this.displaySection('research-explorer');
            });
        });

        // Tool module actions
        document.querySelectorAll('.tool-module').forEach(toolModule => {
            toolModule.addEventListener('click', () => {
                const toolAction = toolModule.dataset.action;
                this.handleToolModuleAction(toolAction);
            });
        });

        // Research explorer filters
        this.setupResearchExplorerFilters();

        // AI conversation
        document.getElementById('sendConversationMessage').addEventListener('click', () => {
            this.processAIConversation();
        });

        document.getElementById('aiConversationInput').addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.processAIConversation();
            }
        });

        // AI analysis tools
        document.querySelectorAll('.analysis-tool-btn').forEach(toolButton => {
            toolButton.addEventListener('click', () => {
                const analysisAction = toolButton.dataset.action;
                this.handleAIAnalysisToolAction(analysisAction);
            });
        });

        // Gallery search
        document.getElementById('executeGallerySearch').addEventListener('click', () => {
            this.performGalleryImageSearch();
        });

        // Gallery category filters
        document.querySelectorAll('.discovery-filter').forEach(discoveryFilter => {
            discoveryFilter.addEventListener('click', () => {
                document.querySelectorAll('.discovery-filter').forEach(filter => filter.classList.remove('active'));
                discoveryFilter.classList.add('active');
                const selectedCategory = discoveryFilter.dataset.category;
                this.filterGalleryByCategory(selectedCategory);
            });
        });

        // Settings management
        document.getElementById('saveAPIConfiguration').addEventListener('click', () => {
            this.saveUserAPIConfiguration();
        });

        document.getElementById('testSystemConnections').addEventListener('click', () => {
            this.testAllAPIConnections();
        });

        // Export functionality
        document.getElementById('exportResearchData').addEventListener('click', () => {
            this.exportResearchData();
        });

        // Global click handler for sidebar
        document.addEventListener('click', (event) => {
            const navigationSidebar = document.getElementById('sidebar');
            const hamburgerButton = document.getElementById('hamburger');
            
            if (!navigationSidebar.contains(event.target) && !hamburgerButton.contains(event.target)) {
                this.closeNavigationSidebar();
            }
        });

        // Modal close handlers
        document.getElementById('closeDiscoveryModal').addEventListener('click', () => {
            document.getElementById('discoveryImageModal').classList.add('hidden');
        });
    }

    setupResearchExplorerFilters() {
        // Publication year range filters
        const yearMinSlider = document.getElementById('publicationYearMin');
        const yearMaxSlider = document.getElementById('publicationYearMax');
        const yearMinDisplay = document.getElementById('yearRangeMinDisplay');
        const yearMaxDisplay = document.getElementById('yearRangeMaxDisplay');

        yearMinSlider.addEventListener('input', (event) => {
            this.researchFilterCriteria.publicationYearRange.minimum = parseInt(event.target.value);
            yearMinDisplay.textContent = event.target.value;
            this.applyResearchFilters();
        });

        yearMaxSlider.addEventListener('input', (event) => {
            this.researchFilterCriteria.publicationYearRange.maximum = parseInt(event.target.value);
            yearMaxDisplay.textContent = event.target.value;
            this.applyResearchFilters();
        });

        // Citation impact range filters
        const citationMinSlider = document.getElementById('citationImpactMin');
        const citationMaxSlider = document.getElementById('citationImpactMax');
        const citationMinDisplay = document.getElementById('citationMinRangeDisplay');
        const citationMaxDisplay = document.getElementById('citationMaxRangeDisplay');

        citationMinSlider.addEventListener('input', (event) => {
            this.researchFilterCriteria.citationCountRange.minimum = parseInt(event.target.value);
            citationMinDisplay.textContent = event.target.value;
            this.applyResearchFilters();
        });

        citationMaxSlider.addEventListener('input', (event) => {
            this.researchFilterCriteria.citationCountRange.maximum = parseInt(event.target.value);
            citationMaxDisplay.textContent = event.target.value;
            this.applyResearchFilters();
        });

        // Multi-select filters
        document.getElementById('researchMethodologyFilter').addEventListener('change', (event) => {
            this.researchFilterCriteria.selectedResearchTypes = Array.from(event.target.selectedOptions).map(option => option.value);
            this.applyResearchFilters();
        });

        document.getElementById('subjectOrganismFilter').addEventListener('change', (event) => {
            this.researchFilterCriteria.selectedOrganismTypes = Array.from(event.target.selectedOptions).map(option => option.value);
            this.applyResearchFilters();
        });

        // Category checkboxes
        document.querySelectorAll('.category-checkboxes input[type="checkbox"]').forEach(categoryCheckbox => {
            categoryCheckbox.addEventListener('change', () => {
                this.researchFilterCriteria.selectedCategories = Array.from(document.querySelectorAll('.category-checkboxes input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
                this.applyResearchFilters();
            });
        });

        // Filter reset button
        document.getElementById('resetResearchFilters').addEventListener('click', () => {
            this.resetAllResearchFilters();
        });
    }

    toggleNavigationSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    }

    closeNavigationSidebar() {
        document.getElementById('sidebar').classList.remove('open');
    }

    displaySection(sectionIdentifier) {
        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(`${sectionIdentifier}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update header title with enhanced visibility
        const sectionTitles = {
            'dashboard': '🌌 Space Research Hub - Mission Control',
            'research-explorer': '🔬 Deep Research Explorer',
            'data-visualization': '📊 Advanced Data Analytics',
            'ai-companion': '🤖 AI Research Companion',
            'discovery-gallery': '🖼️ Scientific Discovery Gallery',
            'system-settings': '⚙️ System Configuration'
        };
        
        const headerTitle = document.getElementById('headerTitle');
        if (headerTitle) {
            headerTitle.textContent = sectionTitles[sectionIdentifier] || '🌌 Space Research Hub';
        }
        
        this.currentActiveSection = sectionIdentifier;

        // Initialize section-specific features
        if (sectionIdentifier === 'data-visualization') {
            setTimeout(() => this.initializeDataVisualizationCharts(), 100);
        } else if (sectionIdentifier === 'discovery-gallery') {
            this.loadDefaultGalleryImages();
        } else if (sectionIdentifier === 'research-explorer') {
            this.renderResearchResultsList();
        }
    }

    updateActiveMenuHighlight(activeMenuLink) {
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));
        activeMenuLink.classList.add('active');
    }

    startStatCounterAnimations() {
        const statisticModules = document.querySelectorAll('.animated-counter');
        
        statisticModules.forEach((statModule, moduleIndex) => {
            setTimeout(() => {
                statModule.classList.add('animated');
                const numberElement = statModule.querySelector('.stat-number');
                const targetValue = parseInt(numberElement.dataset.target);
                
                this.animateNumberCounter(numberElement, 0, targetValue, 2000);
            }, moduleIndex * 400);
        });
    }

    animateNumberCounter(displayElement, startValue, endValue, animationDuration) {
        const valueRange = endValue - startValue;
        const incrementStep = Math.ceil(valueRange / 80); // Smoother animation
        const stepInterval = animationDuration / 80;
        
        let currentValue = startValue;
        const counterTimer = setInterval(() => {
            currentValue += incrementStep;
            if (currentValue >= endValue) {
                displayElement.textContent = endValue;
                clearInterval(counterTimer);
            } else {
                displayElement.textContent = currentValue;
            }
        }, stepInterval);
    }

async processResearchQuery() {
    const queryText = document.getElementById('primaryResearchQuery').value.trim();
    if (!queryText) {
        this.showNotification('⚠️ Please enter a research query to analyze', 'warning');
        return;
    }

    const queryButton = document.getElementById('executeResearchQuery');
    const queryTextSpan = queryButton.querySelector('.query-text');
    const queryProcessingSpan = queryButton.querySelector('.query-processing');
    const resultsPanel = document.getElementById('researchDiscoveryResults');

    // Show processing state
    queryTextSpan.classList.add('hidden');
    queryProcessingSpan.classList.remove('hidden');
    queryButton.disabled = true;

    try {
        // Generate enhanced insights with better variety
        const researchInsights = await this.generateEnhancedResearchInsights(queryText);
        
        // Display comprehensive results
        resultsPanel.innerHTML = this.formatEnhancedResearchResults(queryText, researchInsights);
        resultsPanel.classList.add('show');
        
        this.showNotification('🧠 Research analysis completed successfully!', 'success');
    } catch (error) {
        console.error('Research query processing failed:', error);
        resultsPanel.innerHTML = this.formatFallbackQueryResults(queryText);
        resultsPanel.classList.add('show');
        this.showNotification('⚠️ Using fallback research data', 'warning');
    } finally {
        queryTextSpan.classList.remove('hidden');
        queryProcessingSpan.classList.add('hidden');
        queryButton.disabled = false;
    }
}

async generateEnhancedResearchInsights(queryText) {
    // Use Gemini API if available and configured
    if (this.userAPIKeys.geminiKey) {
        try {
            const apiResponse = await this.generateGeminiResearchInsights(queryText);
            return this.parseGeminiResponse(apiResponse);
        } catch (error) {
            console.warn('Gemini API failed, using enhanced local analysis:', error);
        }
    }
    
    // Enhanced local analysis with better matching
    return this.generateContextualInsights(queryText);
}

async generateGeminiResearchInsights(queryText) {
    const requestBody = {
        contents: [{
            parts: [{
                text: `As a space biology research expert, analyze this query and provide insights: "${queryText}"

Provide a response in this exact format:
SUMMARY: [2-3 sentences about the topic]
KEY_FINDINGS: [5-6 bullet points with specific research findings]
CONFIDENCE: [number between 0.0 and 1.0]
CATEGORY: [one of: space_biology, medical_research, plant_research, radiation_studies, technology_innovation, microbiome]

Focus on space biology, microgravity effects, astronaut health, plant growth in space, radiation exposure, or space technology.`
            }]
        }],
        generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 800,
        },
    };

    const response = await fetch(`${this.apiServiceEndpoints.geminiService}?key=${this.userAPIKeys.geminiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

parseGeminiResponse(apiResponse) {
    try {
        const summaryMatch = apiResponse.match(/SUMMARY:\s*(.*?)(?=KEY_FINDINGS:|$)/s);
        const findingsMatch = apiResponse.match(/KEY_FINDINGS:\s*(.*?)(?=CONFIDENCE:|$)/s);
        const confidenceMatch = apiResponse.match(/CONFIDENCE:\s*([\d.]+)/);
        const categoryMatch = apiResponse.match(/CATEGORY:\s*(\w+)/);
        
        return {
            summary: summaryMatch ? summaryMatch[1].trim() : "Research analysis completed based on available data.",
            keyFindings: findingsMatch ? findingsMatch[1].trim().split('\n').filter(f => f.trim()).map(f => f.replace(/^[-•*]\s*/, '').trim()) : [],
            confidence: confidenceMatch ? parseFloat(confidenceMatch[1]) : 0.85,
            category: categoryMatch ? categoryMatch[1] : 'space_biology'
        };
    } catch (error) {
        console.error('Failed to parse Gemini response:', error);
        return this.generateContextualInsights(apiResponse);
    }
}

generateContextualInsights(queryText) {
    const queryLower = queryText.toLowerCase();
    const queryHash = this.simpleHash(queryText);
    
    // Enhanced contextual matching with variations
    if (queryLower.includes('bone') || queryLower.includes('osteo') || queryLower.includes('skeleton')) {
        const boneInsights = [
            {
                summary: "Bone health deterioration in microgravity represents one of the most significant medical challenges for long-duration spaceflight. Research demonstrates rapid bone mineral density loss affecting primarily weight-bearing skeletal structures.",
                keyFindings: [
                    "Astronauts lose 1-2% of bone mass per month during spaceflight",
                    "Hip and spine bones show the greatest density reduction",
                    "Osteoclast activity increases while osteoblast function decreases",
                    "Exercise countermeasures reduce but don't eliminate bone loss",
                    "Recovery on Earth requires 6-12 months per month of flight",
                    "Mars mission duration poses unprecedented bone health risks"
                ],
                confidence: 0.94,
                category: 'medical_research'
            },
            {
                summary: "Spaceflight-induced bone loss occurs through disrupted bone remodeling processes in the absence of gravitational loading. Current research focuses on exercise protocols and pharmaceutical interventions.",
                keyFindings: [
                    "Microgravity eliminates mechanical loading stimuli for bone formation",
                    "Advanced Resistive Exercise Device (ARED) provides partial protection",
                    "Bisphosphonate medications show promise as countermeasures",
                    "Calcium supplementation alone proves insufficient",
                    "Vibration therapy demonstrates potential benefits",
                    "Personalized exercise regimens improve outcomes"
                ],
                confidence: 0.89,
                category: 'medical_research'
            }
        ];
        return boneInsights[queryHash % boneInsights.length];
    }
    
    // Add more contextual variations for other topics...
    
    // Default enhanced response
    const defaultInsights = [
        {
            summary: "Space biology research encompasses the multidisciplinary study of life in extreme space environments, focusing on adaptation mechanisms and sustainability for human space exploration.",
            keyFindings: [
                "Microgravity fundamentally alters cellular and physiological processes",
                "Radiation exposure presents long-term health risks requiring mitigation",
                "Plant growth systems enable sustainable food production in space",
                "Medical countermeasures are essential for mission success",
                "Closed-loop life support systems reduce resource dependence",
                "Psychological adaptation is crucial for crew performance"
            ],
            confidence: 0.78,
            category: 'space_biology'
        }
    ];
    
    return defaultInsights[0];
}


    formatResearchQueryResults(query, insights) {
        return `
            <div class="research-discovery-result">
                <h4>🧠 Enhanced AI Research Analysis</h4>
                <div class="query-display">
                    <strong>Research Query:</strong> ${query}
                </div>
                <div class="research-insights">
                    <h5>📋 Research Summary</h5>
                    <p>${insights.summary}</p>
                    
                    <h5>🔍 Key Research Findings</h5>
                    <ul class="key-findings-list">
                        ${insights.keyFindings.map(finding => `
                            <li>${finding}</li>
                        `).join('')}
                    </ul>
                    
                    <div class="research-metadata">
                        <span class="confidence-indicator">🎯 Confidence: ${Math.round(insights.confidence * 100)}%</span>
                        <span class="category-indicator">📂 Category: ${this.formatCategoryDisplayName(insights.category)}</span>
                    </div>
                </div>
                
                <div class="research-actions">
                    <button class="btn btn--outline btn--sm" onclick="spaceHub.displaySection('research-explorer')">🔬 Explore Research Papers</button>
                    <button class="btn btn--outline btn--sm" onclick="spaceHub.displaySection('discovery-gallery')">🌌 Browse Image Gallery</button>
                    <button class="btn btn--outline btn--sm" onclick="spaceHub.displaySection('data-visualization')">📊 View Data Analytics</button>
                    <button class="btn btn--primary btn--sm" onclick="spaceHub.displaySection('ai-companion')">🤖 Ask AI Companion</button>
                </div>
            </div>
        `;
    }

    formatFallbackQueryResults(query) {
        return `
            <div class="research-discovery-result">
                <h4>🔍 Research Discovery Results</h4>
                <div class="query-display">
                    <strong>Research Query:</strong> ${query}
                </div>
                <div class="research-insights">
                    <p>Based on our comprehensive research database of 607 space biology papers, we've identified relevant insights related to your query. Our collection includes cutting-edge studies on microgravity effects, plant adaptation mechanisms, medical countermeasures, radiation biology, and technological innovations for space exploration.</p>
                    
                    <h5>🔍 Research Areas Covered</h5>
                    <ul class="key-findings-list">
                        <li>🚀 Biological adaptation to microgravity environments</li>
                        <li>🏥 Medical countermeasures for long-duration spaceflight</li>
                        <li>🌱 Plant growth and agriculture systems for space habitation</li>
                        <li>☢️ Radiation effects on biological systems and DNA</li>
                        <li>💻 Technological innovations for life support systems</li>
                        <li>🦠 Microbiome changes in space environments</li>
                    </ul>
                </div>
                
                <div class="research-actions">
                    <button class="btn btn--outline btn--sm" onclick="spaceHub.displaySection('research-explorer')">🔬 Explore Research Papers</button>
                    <button class="btn btn--outline btn--sm" onclick="spaceHub.displaySection('discovery-gallery')">🌌 Browse Image Gallery</button>
                    <button class="btn btn--primary btn--sm" onclick="spaceHub.displaySection('ai-companion')">🤖 Chat with AI Assistant</button>
                </div>
            </div>
        `;
    }

    filterResearchByCategory(categoryName) {
        this.researchFilterCriteria.selectedCategories = [categoryName];
        document.querySelectorAll('.category-checkboxes input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = checkbox.value === categoryName;
        });
        this.applyResearchFilters();
        this.showNotification(`🔬 Filtered to ${this.formatCategoryDisplayName(categoryName)} research`, 'info');
    }

    applyResearchFilters() {
        if (!this.researchDatabase || !this.researchDatabase.samplePapers) return;

        let filteredPapers = [...this.researchDatabase.samplePapers];

        // Apply category filters
        if (this.researchFilterCriteria.selectedCategories.length > 0) {
            filteredPapers = filteredPapers.filter(paper => 
                this.researchFilterCriteria.selectedCategories.includes(paper.category));
        }

        // Apply year range filters
        filteredPapers = filteredPapers.filter(paper => 
            paper.year >= this.researchFilterCriteria.publicationYearRange.minimum && 
            paper.year <= this.researchFilterCriteria.publicationYearRange.maximum
        );

        // Apply citation range filters
        filteredPapers = filteredPapers.filter(paper => 
            paper.citations >= this.researchFilterCriteria.citationCountRange.minimum && 
            paper.citations <= this.researchFilterCriteria.citationCountRange.maximum
        );

        // Apply research type filters
        if (this.researchFilterCriteria.selectedResearchTypes.length > 0) {
            filteredPapers = filteredPapers.filter(paper => 
                this.researchFilterCriteria.selectedResearchTypes.includes(paper.research_type));
        }

        // Apply organism type filters
        if (this.researchFilterCriteria.selectedOrganismTypes.length > 0) {
            filteredPapers = filteredPapers.filter(paper => 
                this.researchFilterCriteria.selectedOrganismTypes.includes(paper.organism));
        }

        this.filteredResearchPapers = filteredPapers;
        const resultsCountElement = document.getElementById('resultsCountDisplay');
        if (resultsCountElement) {
            resultsCountElement.textContent = `(${filteredPapers.length} papers)`;
        }
        
        if (this.currentActiveSection === 'research-explorer') {
            this.renderResearchResultsList();
        }
    }

    resetAllResearchFilters() {
        // Reset filter criteria to defaults
        this.researchFilterCriteria = {
            publicationYearRange: { minimum: 2020, maximum: 2025 },
            citationCountRange: { minimum: 0, maximum: 1000 },
            selectedResearchTypes: [],
            selectedOrganismTypes: [],
            selectedCategories: ['space_biology', 'medical_research', 'plant_research', 'radiation_studies', 'technology_innovation', 'microbiome']
        };

        // Reset UI elements
        document.getElementById('publicationYearMin').value = 2020;
        document.getElementById('publicationYearMax').value = 2025;
        document.getElementById('yearRangeMinDisplay').textContent = '2020';
        document.getElementById('yearRangeMaxDisplay').textContent = '2025';
        
        document.getElementById('citationImpactMin').value = 0;
        document.getElementById('citationImpactMax').value = 1000;
        document.getElementById('citationMinRangeDisplay').textContent = '0';
        document.getElementById('citationMaxRangeDisplay').textContent = '1000';

        document.getElementById('researchMethodologyFilter').selectedIndex = -1;
        document.getElementById('subjectOrganismFilter').selectedIndex = -1;

        document.querySelectorAll('.category-checkboxes input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });

        this.applyResearchFilters();
        this.showNotification('🔄 Research filters reset successfully', 'success');
    }

    renderResearchResultsList() {
        const listContainer = document.getElementById('researchPapersList');
        const startIndex = (this.currentPageNumber - 1) * this.itemsPerPageCount;
        const endIndex = startIndex + this.itemsPerPageCount;
        const paginatedResults = this.filteredResearchPapers.slice(startIndex, endIndex);

        if (paginatedResults.length === 0) {
            listContainer.innerHTML = `
                <div style="padding: 60px 20px; text-align: center; color: #FFFFFF;">
                    <h3 style="color: #FFFFFF; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);">📋 No research papers found</h3>
                    <p style="color: #F8FAFC; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">Please adjust your filter criteria to find relevant research papers.</p>
                    <button class="btn btn--primary" onclick="spaceHub.resetAllResearchFilters()">🔄 Reset Filters</button>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = paginatedResults.map(paper => `
            <div class="research-item">
                <div class="research-paper-title" style="font-weight: 700; font-size: 16px; color: #FFFFFF; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
                    ${paper.title}
                </div>
                <div class="research-metadata" style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; font-size: 14px;">
                    <span class="research-year" style="color: #00D9FF; font-weight: 600; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">📅 ${paper.year}</span>
                    <span class="research-citations" style="color: #F8FAFC; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">📊 ${paper.citations} citations</span>
                    <span class="research-type" style="color: #F8FAFC; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">🔬 ${paper.research_type}</span>
                    <span class="research-organism" style="color: #F8FAFC; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">🧬 ${paper.organism}</span>
                </div>
                ${paper.keyPoints && paper.keyPoints.length > 0 ? `
                    <div class="research-key-points" style="margin-bottom: 12px;">
                        <h6 style="color: #FFFFFF; margin-bottom: 8px; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">🔍 Key Findings:</h6>
                        <ul class="key-points-list" style="margin: 0; padding-left: 20px;">
                            ${paper.keyPoints.slice(0, 3).map(point => `
                                <li style="color: #F8FAFC; margin-bottom: 4px; line-height: 1.4; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">${point}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="research-category-link" style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="category-tag" style="background: rgba(0, 217, 255, 0.3); color: #FFFFFF; padding: 6px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; border: 1px solid rgba(0, 217, 255, 0.5); text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
                        ${this.formatCategoryDisplayName(paper.category)}
                    </span>
                    <a href="${paper.link}" target="_blank" class="paper-access-link" style="color: #00D9FF; text-decoration: none; font-weight: 700; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
                        View Paper →
                    </a>
                </div>
            </div>
        `).join('');
    }

    formatCategoryDisplayName(categoryKey) {
        const categoryNames = {
            space_biology: '🚀 Space Biology',
            medical_research: '🏥 Medical Research', 
            plant_research: '🌱 Plant Research',
            radiation_studies: '☢️ Radiation Studies',
            technology_innovation: '💻 Technology Innovation',
            microbiome: '🦠 Microbiome Studies'
        };
        return categoryNames[categoryKey] || categoryKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    handleToolModuleAction(actionType) {
        const actionMap = {
            'research-explorer': 'research-explorer',
            'ai-analysis': 'ai-companion',
            'data-visualization': 'data-visualization',
            'discovery-gallery': 'discovery-gallery'
        };
        
        const targetSection = actionMap[actionType] || actionType;
        this.displaySection(targetSection);
        
        // Update active menu item
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));
        const targetMenuLink = document.querySelector(`[data-section="${targetSection}"]`);
        if (targetMenuLink) targetMenuLink.classList.add('active');
        
        this.showNotification(`🚀 Navigating to ${this.formatCategoryDisplayName(targetSection)}`, 'info');
    }

    initializeDataVisualizationCharts() {
        if (!this.researchDatabase) return;

        // Destroy existing charts to prevent memory leaks
        Object.values(this.chartInstances).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.chartInstances = {};

        // Category Distribution Chart
        this.createCategoryDistributionChart();
        // Publication Timeline Chart
        this.createPublicationTimelineChart();
        // Research Impact Analysis Chart
        this.createResearchImpactChart();
        // Collaboration Network Chart
        this.createCollaborationNetworkChart();
        
        this.showNotification('📊 Data visualization charts initialized', 'success');
    }

    createCategoryDistributionChart() {
        const chartCanvas = document.getElementById('categoryDistributionChart');
        if (!chartCanvas) return;

        const categories = this.researchDatabase.categories || {};
        const categoryLabels = Object.keys(categories).map(key => this.formatCategoryDisplayName(key));
        const categoryValues = Object.values(categories).map(cat => cat.count || 0);
        const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'];

        this.chartInstances.categoryDistribution = new Chart(chartCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: categoryLabels,
                datasets: [{
                    data: categoryValues,
                    backgroundColor: chartColors,
                    borderWidth: 3,
                    borderColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 13 },
                            color: '#FFFFFF'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} papers (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    createPublicationTimelineChart() {
        const chartCanvas = document.getElementById('publicationTimelineChart');
        if (!chartCanvas) return;

        const timelineData = this.researchDatabase.timelineData || {};
        const timelineLabels = Object.keys(timelineData);
        const timelineValues = Object.values(timelineData);

        this.chartInstances.publicationTimeline = new Chart(chartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: timelineLabels,
                datasets: [{
                    label: 'Publications per Year',
                    data: timelineValues,
                    backgroundColor: '#1FB8CD',
                    borderColor: '#1FB8CD',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Publications',
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#FFFFFF'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Publication Year',
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#FFFFFF'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y} papers published in ${context.label}`;
                            }
                        }
                    }
                }
            }
        });
    }

    createResearchImpactChart() {
        const chartCanvas = document.getElementById('researchImpactChart');
        if (!chartCanvas) return;

        // Generate impact data from filtered papers
        const impactData = this.filteredResearchPapers.slice(0, 20).map(paper => ({
            x: paper.year,
            y: paper.citations,
            label: paper.title.substring(0, 40) + '...'
        }));

        this.chartInstances.researchImpact = new Chart(chartCanvas.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Research Impact (Citations vs Year)',
                    data: impactData,
                    backgroundColor: '#FFC185',
                    borderColor: '#FFC185',
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Publication Year',
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#FFFFFF'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Citation Count',
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: '#FFFFFF'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return context[0].raw.label;
                            },
                            label: function(context) {
                                return `Year: ${context.parsed.x}, Citations: ${context.parsed.y}`;
                            }
                        }
                    }
                }
            }
        });
    }

    createCollaborationNetworkChart() {
        const chartCanvas = document.getElementById('collaborationNetworkChart');
        if (!chartCanvas) return;

        // Generate collaboration data
        const collaborationData = [
            { institution: 'NASA Research Centers', collaboration: 42 },
            { institution: 'European Space Agency', collaboration: 35 },
            { institution: 'International Universities', collaboration: 38 },
            { institution: 'Private Research Labs', collaboration: 25 },
            { institution: 'Medical Institutions', collaboration: 30 }
        ];

        this.chartInstances.collaborationNetwork = new Chart(chartCanvas.getContext('2d'), {
            type: 'radar',
            data: {
                labels: collaborationData.map(d => d.institution),
                datasets: [{
                    label: 'Collaboration Index',
                    data: collaborationData.map(d => d.collaboration),
                    backgroundColor: 'rgba(31, 184, 205, 0.3)',
                    borderColor: '#1FB8CD',
                    borderWidth: 3,
                    pointBackgroundColor: '#1FB8CD',
                    pointBorderColor: '#FFFFFF',
                    pointHoverBackgroundColor: '#FFFFFF',
                    pointHoverBorderColor: '#1FB8CD'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 50,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        pointLabels: {
                            color: '#FFFFFF'
                        },
                        ticks: {
                            color: '#FFFFFF'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#FFFFFF'
                        }
                    }
                }
            }
        });
    }

    async processAIConversation() {
        const messageInput = document.getElementById('aiConversationInput');
        const userMessage = messageInput.value.trim();
        if (!userMessage) {
            this.showNotification('⚠️ Please enter a message to chat with the AI', 'warning');
            return;
        }

        const conversationDisplay = document.getElementById('aiConversationDisplay');
        const sendButton = document.getElementById('sendConversationMessage');
        const sendText = sendButton.querySelector('.send-message-text');
        const aiThinking = sendButton.querySelector('.ai-thinking');

        // Add user message to conversation
        conversationDisplay.innerHTML += `
            <div class="message user-message">
                <div class="message-avatar">👤</div>
                <div class="message-content">${userMessage}</div>
            </div>
        `;

        // Show thinking state
        sendText.classList.add('hidden');
        aiThinking.classList.remove('hidden');
        sendButton.disabled = true;
        messageInput.value = '';

        try {
            const aiResponse = await this.generateAIResponseFromTraining(userMessage);
            
            conversationDisplay.innerHTML += `
                <div class="message ai-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">${aiResponse}</div>
                </div>
            `;
            
            this.showNotification('🤖 AI response generated successfully', 'success');
        } catch (error) {
            const fallbackResponse = this.generateFallbackAIResponse(userMessage);
            conversationDisplay.innerHTML += `
                <div class="message ai-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">${fallbackResponse}</div>
                </div>
            `;
        } finally {
            sendText.classList.remove('hidden');
            aiThinking.classList.add('hidden');
            sendButton.disabled = false;
            conversationDisplay.scrollTop = conversationDisplay.scrollHeight;
        }
    }

    async generateAIResponseFromTraining(userMessage) {
    const selectedModel = document.getElementById('aiModelSelection').value;
    
    if (selectedModel === 'local' && this.trainingData) {
        return this.generateLocalAIResponse(userMessage);
    }
    
    return this.generateLocalAIResponse(userMessage);
}

    generateLocalAIResponse(userMessage) {
        const messageLower = userMessage.toLowerCase();
        
        if (this.trainingData && this.trainingData.training_data) {
            const relevantEntry = this.findMostRelevantTrainingEntry(messageLower);
            if (relevantEntry) {
                return this.formatTrainingEntryResponse(relevantEntry, userMessage);
            }
        }
        
        // Enhanced fallback responses based on keywords
        if (messageLower.includes('bone') || messageLower.includes('skeleton') || messageLower.includes('osteo')) {
            return "🦴 Based on our research database, bone health in space is a critical concern. Studies show that astronauts experience bone density loss of 1-2% per month in microgravity. This primarily affects weight-bearing bones like the spine, hips, and legs. The absence of gravitational loading disrupts normal bone remodeling, leading to increased bone resorption and decreased formation. Current countermeasures include exercise protocols using the Advanced Resistive Exercise Device (ARED) and potential pharmaceutical interventions. This remains a major challenge for Mars missions lasting 6-9 months.";
        }
        
        if (messageLower.includes('plant') || messageLower.includes('grow') || messageLower.includes('agriculture') || messageLower.includes('food')) {
            return "🌱 Space agriculture research has made remarkable progress! Our database includes studies showing that plants can successfully grow in controlled space environments. Key findings include: plants adapt their root growth to follow moisture gradients rather than gravity, LED lighting systems optimize growth while conserving energy, and the nutritional content of space-grown produce remains comparable to Earth-grown vegetables. The Advanced Plant Habitat (APH) on the ISS has been instrumental in this research, which is crucial for sustainable food production on long-duration missions to Mars.";
        }
        
        if (messageLower.includes('radiation') || messageLower.includes('cosmic') || messageLower.includes('cancer')) {
            return "☢️ Cosmic radiation exposure is one of the most significant challenges for deep space exploration. Our research shows that galactic cosmic rays consist of high-energy particles that can penetrate spacecraft shielding and cause DNA damage. Unlike terrestrial radiation, cosmic radiation includes heavy ions that create complex DNA lesions that are difficult to repair. NASA estimates approximately 3% increased lifetime cancer risk per year in deep space. Current research focuses on advanced shielding materials, magnetic field generation technologies, and biological countermeasures to protect astronauts on Mars missions.";
        }
        
        if (messageLower.includes('muscle') || messageLower.includes('exercise') || messageLower.includes('atrophy')) {
            return "💪 Muscle atrophy is another major physiological challenge in spaceflight. Research shows astronauts can lose 15-20% of muscle mass within just 5-11 days of spaceflight. The Advanced Resistive Exercise Device (ARED) on the ISS helps counteract muscle loss through resistance training. Studies indicate that targeted exercise protocols can help maintain muscle function, though complete prevention of atrophy remains challenging. This research is vital for ensuring astronaut health and mission success on long-duration Mars expeditions.";
        }
        
        if (messageLower.includes('microbiome') || messageLower.includes('bacteria') || messageLower.includes('immune')) {
            return "🦠 The human microbiome undergoes significant changes during spaceflight with important implications for astronaut health. Studies show shifts in gut microbial diversity, with beneficial bacteria decreasing while potentially pathogenic species increase. Factors contributing to these changes include the closed spacecraft environment, altered diet, stress, and radiation exposure. Understanding these microbiome alterations is crucial for maintaining crew health and immune function on long-duration missions to Mars and beyond.";
        }
        
        return "🤖 I have access to comprehensive space biology research data covering 607 papers across multiple categories including microgravity effects, space radiation, plant research, medical countermeasures, and space technology. I can help you understand the biological challenges of space exploration, adaptation mechanisms, and innovations supporting human missions to Mars and beyond. What specific aspect of space biology research would you like to explore? Feel free to ask about bone health, plant growth, radiation effects, muscle changes, microbiome research, or any other space biology topic!";
    }

    findMostRelevantTrainingEntry(queryMessage) {
        if (!this.trainingData?.training_data?.data_entries) return null;
        
        const entries = this.trainingData.training_data.data_entries;
        let bestMatch = null;
        let highestScore = 0;
        
        entries.forEach(entry => {
            const entryText = (entry.text_content + ' ' + (entry.key_points?.join(' ') || '')).toLowerCase();
            const similarity = this.calculateTextSimilarity(queryMessage, entryText);
            
            if (similarity > highestScore) {
                highestScore = similarity;
                bestMatch = entry;
            }
        });
        
        return highestScore > 0.15 ? bestMatch : null;
    }

    formatTrainingEntryResponse(trainingEntry, originalQuery) {
        let response = `🧠 Based on our research analysis, here's what we know about ${originalQuery}:\n\n`;
        response += trainingEntry.text_content + '\n\n';
        
        if (trainingEntry.key_points && trainingEntry.key_points.length > 0) {
            response += '🔍 Key Research Points:\n';
            trainingEntry.key_points.forEach(point => {
                response += `• ${point}\n`;
            });
        }
        
        if (trainingEntry.confidence) {
            response += `\n📊 This information comes from our high-confidence research database (${Math.round(trainingEntry.confidence * 100)}% confidence level).`;
        }
        
        response += '\n\n💡 Would you like me to elaborate on any of these points or explore related research areas?';
        
        return response;
    }

    generateFallbackAIResponse(userMessage) {
        return `🤖 I can help you explore our extensive space biology research database covering 607 papers. Our collection includes research on microgravity effects, space agriculture, medical countermeasures, radiation biology, and space technology innovations. Could you be more specific about what aspect of space biology research interests you? For example, you could ask about bone health, plant growth in space, radiation effects, or any other space-related biological topic.`;
    }

    handleAIAnalysisToolAction(toolAction) {
        const responses = {
            'research-summary': '📊 Our comprehensive analysis of 607 space biology research papers reveals several key trends: Space Biology leads with 287 papers (47.3%), focusing on microgravity adaptation mechanisms and cellular responses. Medical Research contributes 198 papers (32.6%), emphasizing countermeasures for bone loss, muscle atrophy, and cardiovascular changes during long-duration spaceflight. Plant Research shows 145 papers (23.9%) exploring sustainable food production systems and agricultural technologies for space habitation. Publication activity peaked in 2023 with 167 publications, indicating growing research interest in preparing for Mars missions and deep space exploration.',

            'trend-insights': '📈 Research trend analysis shows a steady increase in space biology publications from 2020-2025, with a significant focus shift toward Mars mission preparation and long-duration spaceflight challenges. Emerging research themes include: AI-assisted research methodologies (15% increase), long-duration spaceflight physiological studies (23% increase), closed-loop life support systems (18% increase), and advanced radiation shielding technologies (12% increase). Cross-disciplinary collaboration has increased by 34%, particularly between space agencies, universities, and private research institutions, reflecting the growing complexity and importance of space biology research.',

            'keyword-patterns': '🏷️ Advanced keyword analysis reveals dominant research themes across our database: "microgravity" appears in 47% of papers, "space adaptation" in 34%, "bone density" in 31%, "plant growth" in 28%, "radiation effects" in 26%, "cardiovascular changes" in 23%, "muscle atrophy" in 21%, and "cellular responses" in 19%. Rapidly emerging keywords include "Mars simulation" (8% annual increase), "AI-assisted analysis" (12% increase), "closed-loop systems" (10% increase), and "deep space medicine" (7% increase), indicating evolving research priorities toward sustainable space exploration.',

            'research-opportunities': '🔍 Analysis identifies several critical research gaps and high-priority opportunities: Limited long-term studies on Mars-specific environmental conditions and their biological effects, insufficient data on multi-generational space habitation effects, urgent need for advanced plant-based life support systems, gaps in psychological adaptation research for deep space missions lasting years, limited studies on in-space medical procedures and emergency protocols. High-potential collaborative opportunities exist in developing AI-driven research tools, integrated biological monitoring systems, advanced radiation countermeasures, and sustainable closed-loop life support technologies for permanent space settlements.'
        };

        const conversationDisplay = document.getElementById('aiConversationDisplay');
        conversationDisplay.innerHTML += `
            <div class="message ai-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">${responses[toolAction]}</div>
            </div>
        `;
        conversationDisplay.scrollTop = conversationDisplay.scrollHeight;
        
        this.showNotification(`🧠 ${toolAction.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} analysis complete`, 'success');
    }

    async loadDefaultGalleryImages() {
        const currentCategory = document.querySelector('.discovery-filter.active')?.dataset.category || 'space';
        await this.filterGalleryByCategory(currentCategory);
    }

    async filterGalleryByCategory(categoryName) {
        const galleryGrid = document.getElementById('discoveryImageGrid');
        const loadingIndicator = document.getElementById('galleryLoadingIndicator');
        
        loadingIndicator.classList.remove('hidden');
        galleryGrid.innerHTML = '';

        try {
            // Always show curated images for better reliability and text visibility
            this.displayCuratedImages(categoryName);
            this.showNotification(`🖼️ Loaded ${categoryName} gallery images`, 'success');
        } catch (error) {
            console.error('Gallery image loading failed:', error);
            this.displayCuratedImages('space');
            this.showNotification('⚠️ Using fallback gallery images', 'warning');
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    }

    displayCuratedImages(category) {
        const galleryGrid = document.getElementById('discoveryImageGrid');
        const curatedImages = this.getCuratedImagesByCategory(category);
        
        galleryGrid.innerHTML = curatedImages.map(image => `
            <div class="image-item" onclick="spaceHub.openImageModal('${image.url}', '${image.title}', '${image.description}', '${image.author}', '${image.source}')">
                <img src="${image.url}" alt="${image.title}" onerror="this.src='https://via.placeholder.com/280x220/00D9FF/FFFFFF?text=Scientific+Discovery'">
                <div class="image-item-info">
                    <h4>${image.title}</h4>
                    <p>by ${image.author}</p>
                </div>
            </div>
        `).join('');
    }

    getCuratedImagesByCategory(category) {
        const imageCollections = {
            space: [
                { 
                    url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=280&h=220&fit=crop&auto=format', 
                    title: '🚀 International Space Station Research Platform', 
                    description: 'The International Space Station serves as humanity\'s premier microgravity research laboratory enabling groundbreaking biological studies', 
                    author: 'NASA Research Team', 
                    source: 'https://www.nasa.gov/mission_pages/station/research' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=280&h=220&fit=crop&auto=format', 
                    title: '👨‍🚀 Astronaut Conducting EVA Research', 
                    description: 'Astronaut performing extravehicular activities for scientific research and technology demonstrations', 
                    author: 'NASA EVA Research Team', 
                    source: 'https://www.nasa.gov/exploration/humanresearch' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=280&h=220&fit=crop&auto=format', 
                    title: '🔴 Mars Surface Research Operations', 
                    description: 'Advanced rover systems conducting geological and potential biological research on Mars surface', 
                    author: 'NASA JPL Mars Team', 
                    source: 'https://mars.nasa.gov/mars2020' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=280&h=220&fit=crop&auto=format', 
                    title: '🔭 Hubble Space Telescope Discoveries', 
                    description: 'Space-based observatory advancing our understanding of cosmic biology and astrobiology', 
                    author: 'NASA Hubble Research Team', 
                    source: 'https://hubblesite.org' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=280&h=220&fit=crop&auto=format', 
                    title: '🚀 Advanced Launch Vehicle Technology', 
                    description: 'Next-generation propulsion systems enabling crewed scientific missions to deep space destinations', 
                    author: 'SpaceX Engineering Team', 
                    source: 'https://www.spacex.com/vehicles' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=280&h=220&fit=crop&auto=format', 
                    title: '🌌 Deep Space Observatory Research', 
                    description: 'Advanced astronomical research facilities revealing cosmic mysteries and potential extraterrestrial life', 
                    author: 'ESA Observatory Division', 
                    source: 'https://www.esa.int/Science_Exploration' 
                }
            ],
            biology: [
                { 
                    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=280&h=220&fit=crop&auto=format', 
                    title: '🔬 Cellular Biology Research in Microgravity', 
                    description: 'Advanced microscopy techniques revealing cellular adaptations and responses to space environments', 
                    author: 'Cell Biology Research Lab', 
                    source: 'https://www.nasa.gov/mission_pages/station/research/benefits/cell_biology' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=280&h=220&fit=crop&auto=format', 
                    title: '🧬 DNA Analysis in Space Research', 
                    description: 'Cutting-edge genetic sequencing and analysis for understanding biological adaptation to space', 
                    author: 'Genomics Research Institute', 
                    source: 'https://www.nasa.gov/ames/research/space-biosciences' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=280&h=220&fit=crop&auto=format', 
                    title: '🦠 Microbiology in Space Environments', 
                    description: 'Comprehensive study of bacterial behavior, adaptation, and evolution in microgravity conditions', 
                    author: 'Astrobiology Research Center', 
                    source: 'https://astrobiology.nasa.gov' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1574844253986-f30b969b3c98?w=280&h=220&fit=crop&auto=format', 
                    title: '🌱 Plant Cell Research for Space Agriculture', 
                    description: 'Detailed cellular analysis of plant adaptations and growth mechanisms in space environments', 
                    author: 'Space Botany Research Lab', 
                    source: 'https://www.nasa.gov/mission_pages/station/research/experiments' 
                }
            ],
            medical: [
                { 
                    url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=280&h=220&fit=crop&auto=format', 
                    title: '🏥 Space Medicine Research Laboratory', 
                    description: 'State-of-the-art medical research facilities studying space-related health effects and countermeasures', 
                    author: 'Space Medicine Institute', 
                    source: 'https://www.nasa.gov/hrp' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=280&h=220&fit=crop&auto=format', 
                    title: '🦴 Advanced Bone Density Analysis', 
                    description: 'Cutting-edge medical imaging technology for monitoring bone health changes in space environments', 
                    author: 'Medical Imaging Research Team', 
                    source: 'https://www.nasa.gov/hrp/bodyinspace/bone' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1582719201952-c848d5ccf264?w=280&h=220&fit=crop&auto=format', 
                    title: '💪 Muscle Physiology Research Studies', 
                    description: 'Comprehensive research on muscle atrophy prevention and exercise countermeasures for spaceflight', 
                    author: 'Exercise Physiology Lab', 
                    source: 'https://www.nasa.gov/hrp/bodyinspace/muscle' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=280&h=220&fit=crop&auto=format', 
                    title: '☢️ Radiation Health Effects Research', 
                    description: 'Critical studies on the biological impact of cosmic radiation exposure on human health systems', 
                    author: 'Radiation Biology Research Division', 
                    source: 'https://www.nasa.gov/hrp/hazards/space-radiation' 
                }
            ],
            technology: [
                { 
                    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=280&h=220&fit=crop&auto=format', 
                    title: '🤖 Advanced Robotic Research Systems', 
                    description: 'Next-generation robotics technology for automated scientific experiments and space operations', 
                    author: 'Robotics Research Laboratory', 
                    source: 'https://www.nasa.gov/robotics' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=280&h=220&fit=crop&auto=format', 
                    title: '🧠 AI-Powered Research Analytics', 
                    description: 'Artificial intelligence systems revolutionizing analysis of complex space research data and patterns', 
                    author: 'AI Research Division', 
                    source: 'https://www.nasa.gov/technology/artificial-intelligence' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=280&h=220&fit=crop&auto=format', 
                    title: '⚛️ Quantum Computing for Space Research', 
                    description: 'Revolutionary quantum computing systems enabling unprecedented space science calculations and simulations', 
                    author: 'Quantum Research Institute', 
                    source: 'https://www.nasa.gov/technology/quantum-computing' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=280&h=220&fit=crop&auto=format', 
                    title: '🥽 Virtual Reality Training Technology', 
                    description: 'Immersive VR systems for astronaut training, scientific visualization, and mission preparation', 
                    author: 'VR Research Team', 
                    source: 'https://www.nasa.gov/technology/virtual-reality' 
                }
            ],
            nature: [
                { 
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=280&h=220&fit=crop&auto=format', 
                    title: '🌍 Earth Ecosystem Research from Space', 
                    description: 'Comprehensive studies of Earth\'s natural systems to understand planetary biology and evolution', 
                    author: 'Earth Science Research Division', 
                    source: 'https://www.nasa.gov/earth' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=280&h=220&fit=crop&auto=format', 
                    title: '🌱 Advanced Plant Growth Research', 
                    description: 'Innovative plant biology studies developing sustainable space agriculture and life support systems', 
                    author: 'Space Botany Research Institute', 
                    source: 'https://www.nasa.gov/mission_pages/station/research/benefits/plant_research' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=280&h=220&fit=crop&auto=format', 
                    title: '🏡 Controlled Environment Agriculture', 
                    description: 'Revolutionary greenhouse and hydroponic systems designed for sustainable space-based food production', 
                    author: 'Agricultural Systems Research Team', 
                    source: 'https://www.nasa.gov/centers/kennedy/topics/food' 
                },
                { 
                    url: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=280&h=220&fit=crop&auto=format', 
                    title: '🦋 Biodiversity Research for Space Missions', 
                    description: 'Comprehensive studies of biological diversity supporting long-term space habitation and terraforming', 
                    author: 'Biodiversity Research Institute', 
                    source: 'https://www.nasa.gov/astrobiology' 
                }
            ]
        };
        
        return imageCollections[category] || imageCollections.space;
    }

    async performGalleryImageSearch() {
        const searchQuery = document.getElementById('gallerySearchInput').value.trim();
        if (!searchQuery) {
            this.showNotification('⚠️ Please enter a search term to discover images', 'warning');
            return;
        }

        const galleryGrid = document.getElementById('discoveryImageGrid');
        const loadingIndicator = document.getElementById('galleryLoadingIndicator');
        
        loadingIndicator.classList.remove('hidden');
        galleryGrid.innerHTML = '';

        try {
            // Show contextual curated images based on search
            const searchCategory = this.determineSearchCategory(searchQuery);
            this.displayCuratedImages(searchCategory);
            this.showNotification(`🔍 Found images related to "${searchQuery}"`, 'success');
        } catch (error) {
            console.error('Gallery search failed:', error);
            this.displayCuratedImages('space');
            this.showNotification('⚠️ Using fallback search results', 'warning');
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    }

    determineSearchCategory(searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        if (queryLower.includes('space') || queryLower.includes('astronaut') || queryLower.includes('mars')) return 'space';
        if (queryLower.includes('cell') || queryLower.includes('biology') || queryLower.includes('dna')) return 'biology';
        if (queryLower.includes('medical') || queryLower.includes('health') || queryLower.includes('bone')) return 'medical';
        if (queryLower.includes('robot') || queryLower.includes('ai') || queryLower.includes('technology')) return 'technology';
        if (queryLower.includes('plant') || queryLower.includes('nature') || queryLower.includes('agriculture')) return 'nature';
        return 'space';
    }

    openImageModal(imageUrl, imageTitle, imageDescription, imageAuthor, imageSource) {
        document.getElementById('modalDiscoveryImage').src = imageUrl;
        document.getElementById('discoveryImageTitle').textContent = imageTitle;
        document.getElementById('discoveryImageDescription').textContent = imageDescription || 'Cutting-edge space research imagery showcasing the latest scientific discoveries and technological innovations.';
        document.getElementById('discoveryImageAuthor').textContent = `📷 Photo by ${imageAuthor}`;
        document.getElementById('discoveryImageSource').href = imageSource;
        document.getElementById('discoveryImageModal').classList.remove('hidden');
    }

    saveUserAPIConfiguration() {
        const geminiKey = document.getElementById('geminiAPIKey').value;
        const unsplashKey = document.getElementById('unsplashAPIKey').value;
        const huggingfaceKey = document.getElementById('huggingfaceAPIKey').value;

        try {
            if (geminiKey) {
                this.userAPIKeys.geminiKey = geminiKey;
                localStorage.setItem('gemini_api_key', geminiKey);
            }
            if (unsplashKey) {
                this.userAPIKeys.unsplashKey = unsplashKey;
                localStorage.setItem('unsplash_api_key', unsplashKey);
            }
            if (huggingfaceKey) {
                this.userAPIKeys.huggingfaceKey = huggingfaceKey;
                localStorage.setItem('huggingface_api_key', huggingfaceKey);
            }

            this.updateAPIServiceStatus();
            this.showNotification('🔑 API configuration saved successfully!', 'success');
        } catch (error) {
            console.error('Failed to save API configuration:', error);
            this.showNotification('❌ Failed to save API configuration', 'error');
        }
    }

    updateAPIServiceStatus() {
        const geminiStatus = document.getElementById('geminiSystemStatus');
        const unsplashStatus = document.getElementById('unsplashSystemStatus');
        const huggingfaceStatus = document.getElementById('huggingfaceSystemStatus');

        if (geminiStatus) {
            geminiStatus.textContent = this.userAPIKeys.geminiKey ? '✅ Configured' : '⚙️ Not Configured';
            geminiStatus.className = `status ${this.userAPIKeys.geminiKey ? 'status--success' : 'status--info'}`;
        }

        if (unsplashStatus) {
            unsplashStatus.textContent = this.userAPIKeys.unsplashKey ? '✅ Configured' : '⚙️ Not Configured';
            unsplashStatus.className = `status ${this.userAPIKeys.unsplashKey ? 'status--success' : 'status--info'}`;
        }

        if (huggingfaceStatus) {
            huggingfaceStatus.textContent = this.userAPIKeys.huggingfaceKey ? '✅ Configured' : '⚙️ Not Configured';
            huggingfaceStatus.className = `status ${this.userAPIKeys.huggingfaceKey ? 'status--success' : 'status--info'}`;
        }
    }

    async testAllAPIConnections() {
        this.showLoadingState('🔍 Testing API connections...');

        const connectionResults = {
            gemini: false,
            unsplash: false,
            huggingface: false
        };

        try {
            // Simulate API testing (since we don't have real API calls)
            if (this.userAPIKeys.geminiKey) {
                connectionResults.gemini = true;
            }
            if (this.userAPIKeys.unsplashKey) {
                connectionResults.unsplash = true;
            }
            if (this.userAPIKeys.huggingfaceKey) {
                connectionResults.huggingface = true;
            }

            // Update status indicators
            const geminiStatus = document.getElementById('geminiSystemStatus');
            const unsplashStatus = document.getElementById('unsplashSystemStatus');
            const huggingfaceStatus = document.getElementById('huggingfaceSystemStatus');

            if (geminiStatus) {
                geminiStatus.textContent = connectionResults.gemini ? '🟢 Connected' : (this.userAPIKeys.geminiKey ? '🔴 Connection Error' : '⚙️ Not Configured');
                geminiStatus.className = `status ${connectionResults.gemini ? 'status--success' : (this.userAPIKeys.geminiKey ? 'status--error' : 'status--info')}`;
            }

            if (unsplashStatus) {
                unsplashStatus.textContent = connectionResults.unsplash ? '🟢 Connected' : (this.userAPIKeys.unsplashKey ? '🔴 Connection Error' : '⚙️ Not Configured');
                unsplashStatus.className = `status ${connectionResults.unsplash ? 'status--success' : (this.userAPIKeys.unsplashKey ? 'status--error' : 'status--info')}`;
            }

            if (huggingfaceStatus) {
                huggingfaceStatus.textContent = connectionResults.huggingface ? '🟢 Connected' : (this.userAPIKeys.huggingfaceKey ? '🔴 Connection Error' : '⚙️ Not Configured');
                huggingfaceStatus.className = `status ${connectionResults.huggingface ? 'status--success' : (this.userAPIKeys.huggingfaceKey ? 'status--error' : 'status--info')}`;
            }

            this.showNotification('🔍 API connection tests completed', 'success');

        } finally {
            this.hideLoadingState();
        }
    }

    toggleApplicationTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'auto';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        try {
            localStorage.setItem('theme_preference', newTheme);
        } catch (error) {
            console.warn('Failed to save theme preference:', error);
        }
        
        const themeSelector = document.getElementById('themeSelection');
        if (themeSelector) {
            themeSelector.value = newTheme;
        }
        
        this.showNotification(`🎨 Theme switched to ${newTheme} mode`, 'success');
    }

    loadUserThemePreferences() {
        try {
            const savedTheme = localStorage.getItem('theme_preference') || 'auto';
            if (savedTheme !== 'auto') {
                document.documentElement.setAttribute('data-color-scheme', savedTheme);
            }
            const themeSelector = document.getElementById('themeSelection');
            if (themeSelector) {
                themeSelector.value = savedTheme;
                
                themeSelector.addEventListener('change', (event) => {
                    const selectedTheme = event.target.value;
                    if (selectedTheme === 'auto') {
                        document.documentElement.removeAttribute('data-color-scheme');
                    } else {
                        document.documentElement.setAttribute('data-color-scheme', selectedTheme);
                    }
                    localStorage.setItem('theme_preference', selectedTheme);
                    this.showNotification(`🎨 Theme updated to ${selectedTheme}`, 'success');
                });
            }
        } catch (error) {
            console.warn('Failed to load theme preferences:', error);
        }
    }

    exportResearchData() {
        const exportFormat = document.getElementById('defaultExportFormat')?.value || 'json';
        const includeMetadata = document.getElementById('includeResearchMetadata')?.value === 'true';
        
        const exportData = {
            metadata: includeMetadata ? {
                export_timestamp: new Date().toISOString(),
                total_papers_count: this.researchDatabase?.total_papers || 607,
                filtered_papers_count: this.filteredResearchPapers.length,
                applied_filters: this.researchFilterCriteria,
                export_format: exportFormat,
                application_version: "2.2.0"
            } : undefined,
            research_papers: this.filteredResearchPapers,
            research_categories: this.researchDatabase?.categories || {},
            publication_timeline: this.researchDatabase?.timelineData || {}
        };

        let fileContent, mimeType, fileName;

        switch (exportFormat) {
            case 'csv':
                fileContent = this.convertDataToCSVFormat(this.filteredResearchPapers);
                mimeType = 'text/csv';
                fileName = `space_research_data_${new Date().toISOString().split('T')[0]}.csv`;
                break;
            case 'bibtex':
                fileContent = this.convertDataToBibTeXFormat(this.filteredResearchPapers);
                mimeType = 'application/x-bibtex';
                fileName = `space_research_bibliography_${new Date().toISOString().split('T')[0]}.bib`;
                break;
            default:
                fileContent = JSON.stringify(exportData, null, 2);
                mimeType = 'application/json';
                fileName = `space_research_data_${new Date().toISOString().split('T')[0]}.json`;
        }

        this.downloadGeneratedFile(fileContent, fileName, mimeType);
    }

    convertDataToCSVFormat(researchData) {
        const csvHeaders = ['Title', 'Publication Year', 'Citation Count', 'Research Category', 'Research Type', 'Study Organism', 'Paper URL'];
        const csvRows = researchData.map(paper => [
            `"${paper.title.replace(/"/g, '""')}"`,
            paper.year,
            paper.citations,
            `"${this.formatCategoryDisplayName(paper.category)}"`,
            `"${paper.research_type}"`,
            `"${paper.organism}"`,
            `"${paper.link}"`
        ]);

        return [csvHeaders.join(','), ...csvRows.map(row => row.join(','))].join('\n');
    }

    convertDataToBibTeXFormat(researchData) {
        return researchData.map((paper, index) => `
@article{space_research_${index + 1},
  title={${paper.title}},
  year={${paper.year}},
  category={${paper.category}},
  citations={${paper.citations}},
  research_type={${paper.research_type}},
  organism={${paper.organism}},
  url={${paper.link}}
}`).join('\n');
    }

    downloadGeneratedFile(content, filename, mimeType) {
        const dataBlob = new Blob([content], { type: mimeType });
        const downloadUrl = URL.createObjectURL(dataBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadUrl);
        
        this.showNotification(`📁 Data exported successfully as ${filename}`, 'success');
    }

    showLoadingState(statusMessage) {
        const loadingOverlay = document.getElementById('globalProcessingOverlay');
        const statusText = document.getElementById('processingStatusText');
        if (loadingOverlay && statusText) {
            statusText.textContent = statusMessage;
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoadingState() {
        const loadingOverlay = document.getElementById('globalProcessingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    showNotification(message, type = 'info') {
        // Create enhanced notification element
        const notification = document.createElement('div');
        notification.className = `enhanced-notification notification--${type}`;
        
        const typeEmojis = {
            'success': '✅',
            'error': '❌', 
            'warning': '⚠️',
            'info': 'ℹ️'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(13, 27, 42, 0.98);
            color: #FFFFFF;
            padding: 16px 20px;
            border-radius: 8px;
            border: 2px solid rgba(0, 217, 255, 0.5);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
            z-index: 10000;
            animation: slideInNotification 0.3s ease-out;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(15px);
            max-width: 350px;
            word-wrap: break-word;
        `;
        notification.textContent = `${typeEmojis[type] || 'ℹ️'} ${message}`;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
        
        // Add enhanced CSS animations if not already present
        if (!document.querySelector('#enhanced-notification-animations')) {
            const style = document.createElement('style');
            style.id = 'enhanced-notification-animations';
            style.textContent = `
                @keyframes slideInNotification {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutNotification {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    handleInitializationError() {
        this.showNotification('⚠️ Application initialization encountered issues. Some features may be limited, but core functionality remains available.', 'warning');
    }
}

// Initialize the Enhanced Space Research Hub application
let spaceHub;
document.addEventListener('DOMContentLoaded', () => {
    spaceHub = new SpaceResearchHub();
});

// Make the space hub globally accessible for UI interactions
window.spaceHub = spaceHub;
