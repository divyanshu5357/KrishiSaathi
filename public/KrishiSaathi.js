        // App state
        const appState = {
            userProfile: {},
            currentView: 'dashboard', // default content view
            regionalNames: {
                'hi': 'किसान साथी',
                'pa': 'ਕਿਸਾਨ ਸਾਥੀ',
                'mr': 'शेतकरी साथी',
                'en': ''
            }
        };

        // Get all DOM elements
        const profileView = document.getElementById('profileView');
        const mainAppView = document.getElementById('mainAppView');
        const profileForm = document.getElementById('profileForm');
        const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
        const mainContentDivs = document.querySelectorAll('.main-content');
        
        // AI Help Modal Elements
        const aiHelpButton = document.getElementById('aiHelpButton');
        const aiHelpModal = document.getElementById('aiHelpModal');
        const closeAiModal = document.getElementById('closeAiModal');

        // Function to switch main content
        function showMainContent(contentId) {
            // Hide all content
            mainContentDivs.forEach(div => {
                div.classList.add('hidden');
            });
            // Show selected content
            const activeContent = document.getElementById(`content_${contentId}`);
            if (activeContent) {
                activeContent.classList.remove('hidden');
            }
            // Update nav active state
            bottomNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.content === contentId) {
                    item.classList.add('active');
                }
            });
            appState.currentView = contentId;
            // Scroll to top
            window.scrollTo(0, 0);
        }

        // Function to update header
        function updateHeader() {
            const { name, language } = appState.userProfile;
            const regionalNameEl = document.getElementById('regionalAppName');
            
            regionalNameEl.textContent = appState.regionalNames[language] || '';
        }

        // Function to personalize content
        function personalizeContent() {
            const { name, location, cropType, landSize } = appState.userProfile;
            
            // Dashboard
            document.getElementById('profileName').textContent = name || 'User';
            document.getElementById('weatherLocation').textContent = location || 'Your Location';
            document.getElementById('soilCrop').textContent = cropType || 'your crop';
            document.getElementById('marketCrop').textContent = cropType || 'Your Crop';

            // Techniques
            document.getElementById('techCrop').textContent = cropType || 'your crop';
            document.getElementById('techCrop2').textContent = cropType || 'your crop';
            
            // Schemes
            document.getElementById('schemeLandSize').textContent = landSize || 'your land';
            document.getElementById('schemeCrop').textContent = cropType || 'your crop';
            
            // Market
            document.getElementById('marketCrop2').textContent = cropType || 'crop';
            document.getElementById('marketLocation').textContent = location || 'Your Town';
        }

        // Event Listener for Profile Form Submission
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(profileForm);
            appState.userProfile = Object.fromEntries(formData.entries());
            
            // Hide profile, show main app
            profileView.classList.add('hidden');
            mainAppView.classList.remove('hidden');
            
            // Update UI with profile data
            updateHeader();
            personalizeContent();
            
            // Show default view
            showMainContent(appState.currentView);

            // Re-initialize icons for the main app
            lucide.createIcons();
        });

        // Event Listeners for Bottom Nav
        bottomNavItems.forEach(item => {
            item.addEventListener('click', () => {
                showMainContent(item.dataset.content);
            });
        });

        // Event Listeners for AI Help Modal
        aiHelpButton.addEventListener('click', () => {
            aiHelpModal.classList.remove('hidden');
        });
        closeAiModal.addEventListener('click', () => {
            aiHelpModal.classList.add('hidden');
        });
        // Close modal if clicking on the background
        aiHelpModal.addEventListener('click', (e) => {
            if (e.target === aiHelpModal) {
                aiHelpModal.classList.add('hidden');
            }
        });

        // Initial icon render (for profile page)
        lucide.createIcons();

        // Check if profile is already "saved" (for dev/testing)
        // In a real app, you'd use localStorage
        // init(); // In this flow, we always start with profile
