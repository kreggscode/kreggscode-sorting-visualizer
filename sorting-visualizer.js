// Sorting Algorithm Visualizer - Part 1: Main Class and Setup
class SortingVisualizer {
    constructor() {
        this.algorithms = [
            { name: 'Bubble Sort', id: 'bubble', complexity: 'O(n²)' },
            { name: 'Insertion Sort', id: 'insertion', complexity: 'O(n²)' },
            { name: 'Selection Sort', id: 'selection', complexity: 'O(n²)' },
            { name: 'Merge Sort', id: 'merge', complexity: 'O(n log n)' },
            { name: 'Quick Sort', id: 'quick', complexity: 'O(n log n)' },
            { name: 'Heap Sort', id: 'heap', complexity: 'O(n log n)' },
            { name: 'Shell Sort', id: 'shell', complexity: 'O(n log n)' },
            { name: 'Counting Sort', id: 'counting', complexity: 'O(n + k)' },
            { name: 'Radix Sort', id: 'radix', complexity: 'O(nk)' },
            { name: 'Bucket Sort', id: 'bucket', complexity: 'O(n + k)' },
            { name: 'Cocktail Sort', id: 'cocktail', complexity: 'O(n²)' },
            { name: 'Comb Sort', id: 'comb', complexity: 'O(n²/2ᵖ)' },
            { name: 'Gnome Sort', id: 'gnome', complexity: 'O(n²)' },
            { name: 'Bitonic Sort', id: 'bitonic', complexity: 'O(n log² n)' },
            { name: 'Tim Sort', id: 'tim', complexity: 'O(n log n)' },
            { name: 'Cycle Sort', id: 'cycle', complexity: 'O(n²)' },
            { name: 'Bogo Sort', id: 'bogo', complexity: 'O((n+1)!)' }
        ];

        this.selectedAlgorithms = ['bubble', 'insertion'];
        this.arraySize = 50;
        this.speed = 50;
        this.simultaneousCount = 2;
        this.colorMode = 'gradient';
        this.barColor = '#00ff00';
        this.gradientStart = '#00ff00';
        this.gradientEnd = '#00ffff';
        this.highlightColor = '#ff0000'; // Red highlight color
        this.completionColor = '#ffffff';
        this.soundEnabled = true;
        this.isRunning = false;
        this.audioContext = null;
        this.sortPanels = new Map();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateAlgorithmSelector();
        this.generateArray();
        this.createSortPanels();
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    playSound(frequency) {
        if (!this.soundEnabled || !this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    playCompletionSound() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        // Create a sharp "ting" sound like iPhone WhatsApp notification
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Sharp high-pitched tone like WhatsApp
        oscillator.frequency.value = 1200;
        oscillator.type = 'sine';
        
        // Quick attack and decay for sharp sound
        const now = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01); // Fast attack
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15); // Quick decay
        
        oscillator.start(now);
        oscillator.stop(now + 0.15);
    }

    setupEventListeners() {
        const arraySize = document.getElementById('arraySize');
        if (arraySize) {
            arraySize.addEventListener('input', (e) => {
                this.arraySize = parseInt(e.target.value);
                const display = document.getElementById('arraySizeValue');
                if (display) display.textContent = this.arraySize;
            });
        }

        const speed = document.getElementById('speed');
        if (speed) {
            speed.addEventListener('input', (e) => {
                // Reverse the slider: max value (200) - current value = faster on right
                this.speed = 201 - parseInt(e.target.value);
                const display = document.getElementById('speedValue');
                if (display) display.textContent = this.speed;
            });
        }

        document.querySelectorAll('.simultaneous-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.simultaneous-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const count = e.target.dataset.count;
                this.simultaneousCount = count === 'all' ? this.algorithms.length : parseInt(count);
                this.updateSelectedAlgorithms();
            });
        });

        document.querySelectorAll('.color-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.colorMode = e.target.dataset.mode;
                this.updateColorControls();
                this.drawAllPanels();
            });
        });

        const barColor = document.getElementById('barColor');
        if (barColor) {
            barColor.addEventListener('input', (e) => {
                this.barColor = e.target.value;
                this.drawAllPanels();
            });
        }

        const gradientStart = document.getElementById('gradientStart');
        if (gradientStart) {
            gradientStart.addEventListener('input', (e) => {
                this.gradientStart = e.target.value;
                this.drawAllPanels();
            });
        }

        const gradientEnd = document.getElementById('gradientEnd');
        if (gradientEnd) {
            gradientEnd.addEventListener('input', (e) => {
                this.gradientEnd = e.target.value;
                this.drawAllPanels();
            });
        }

        const highlightColor = document.getElementById('highlightColor');
        if (highlightColor) {
            highlightColor.addEventListener('input', (e) => {
                this.highlightColor = e.target.value;
            });
        }

        const completionColor = document.getElementById('completionColor');
        if (completionColor) {
            completionColor.addEventListener('input', (e) => {
                this.completionColor = e.target.value;
            });
        }

        const soundEnabled = document.getElementById('soundEnabled');
        if (soundEnabled) {
            soundEnabled.addEventListener('change', (e) => {
                this.soundEnabled = e.target.checked;
            });
        }

        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateArray());
        }

        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startSorting());
        }

        const stopBtn = document.getElementById('stopBtn');
        if (stopBtn) {
            stopBtn.addEventListener('click', () => this.stopSorting());
        }

        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
    }

    updateColorControls() {
        const solidControl = document.getElementById('solidColorControl');
        const gradientControl = document.getElementById('gradientColorControl');
        if (this.colorMode === 'solid') {
            solidControl.style.display = 'block';
            gradientControl.style.display = 'none';
        } else if (this.colorMode === 'gradient') {
            solidControl.style.display = 'none';
            gradientControl.style.display = 'block';
        } else {
            solidControl.style.display = 'none';
            gradientControl.style.display = 'none';
        }
    }

    populateAlgorithmSelector() {
        const selector = document.getElementById('algorithmSelector');
        if (selector) {
            this.algorithms.forEach(algo => {
                const label = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = algo.id;
                checkbox.checked = this.selectedAlgorithms.includes(algo.id);
                checkbox.addEventListener('change', () => this.updateSelectedAlgorithms());
                const span = document.createElement('span');
                span.textContent = `${algo.name} (${algo.complexity})`;
                label.appendChild(checkbox);
                label.appendChild(span);
                selector.appendChild(label);
            });
        }
    }

    updateSelectedAlgorithms() {
        const checkboxes = document.querySelectorAll('#algorithmSelector input[type="checkbox"]');
        if (checkboxes.length > 0) {
            this.selectedAlgorithms = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value)
                .slice(0, this.simultaneousCount === this.algorithms.length ? this.algorithms.length : this.simultaneousCount);

            checkboxes.forEach(cb => {
                if (this.selectedAlgorithms.includes(cb.value)) {
                    cb.checked = true;
                } else if (this.selectedAlgorithms.length >= this.simultaneousCount) {
                    cb.checked = false;
                }
            });
        }
        this.createSortPanels();
    }

    generateArray() {
        this.masterArray = Array.from({ length: this.arraySize }, () => 
            Math.floor(Math.random() * 100) + 1
        );
        this.createSortPanels();
    }

    createSortPanels() {
        const container = document.getElementById('visualizerContainer');
        if (!container) return; // Grid view or missing container
        container.innerHTML = '';
        this.sortPanels.clear();

        this.selectedAlgorithms.forEach(algoId => {
            const algo = this.algorithms.find(a => a.id === algoId);
            if (!algo) return;

            const panel = document.createElement('div');
            panel.className = 'sort-panel';
            panel.innerHTML = `
                <h3>${algo.name}</h3>
                <div class="info">(n = ${this.arraySize}) - Time Complexity: ${algo.complexity}</div>
                <div class="canvas-container">
                    <canvas id="canvas-${algoId}"></canvas>
                </div>
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-label">Comparisons</div>
                        <div class="stat-value" id="comparisons-${algoId}">0</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Swaps</div>
                        <div class="stat-value" id="swaps-${algoId}">0</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">Time (ms)</div>
                        <div class="stat-value" id="time-${algoId}">0</div>
                    </div>
                </div>
            `;

            container.appendChild(panel);

            const canvas = document.getElementById(`canvas-${algoId}`);
            const ctx = canvas.getContext('2d');
            // Fix mobile aspect ratio - maintain proper width
            const containerWidth = Math.min(800, window.innerWidth - 40);
            canvas.width = containerWidth;
            canvas.height = Math.min(300, containerWidth * 0.6); // Back to original height

            this.sortPanels.set(algoId, {
                canvas, ctx,
                array: [...this.masterArray],
                comparisons: 0,
                swaps: 0,
                startTime: 0,
                isComplete: false
            });

            this.draw(algoId);
        });
    }

    getBarColor(index, total) {
        if (this.colorMode === 'solid') {
            return this.barColor;
        } else if (this.colorMode === 'gradient') {
            const ratio = index / total;
            return this.interpolateColor(this.gradientStart, this.gradientEnd, ratio);
        } else if (this.colorMode === 'rainbow') {
            const hue = (index / total) * 360;
            return `hsl(${hue}, 100%, 50%)`;
        }
    }

    interpolateColor(color1, color2, ratio) {
        const hex = (color) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        const c1 = hex(color1);
        const c2 = hex(color2);
        const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
        const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
        const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
        return `rgb(${r}, ${g}, ${b})`;
    }

    draw(algoId, highlightIndices = []) {
        const panel = this.sortPanels.get(algoId);
        if (!panel) return;

        const { canvas, ctx, array } = panel;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = canvas.width / array.length;
        const maxValue = Math.max(...array);

        array.forEach((value, index) => {
            // Remove bottom padding to eliminate black space - use full canvas height
            const barHeight = (value / maxValue) * canvas.height;
            const x = index * barWidth;
            const y = canvas.height - barHeight;
            let color;
            
            // Check completion first - this is the most important visual feedback
            if (panel.isComplete) {
                color = this.completionColor;
            } else if (highlightIndices.includes(index)) {
                color = this.highlightColor;
            } else {
                color = this.getBarColor(index, array.length);
            }
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, barWidth - 1, barHeight);
        });
    }

    drawAllPanels() {
        this.sortPanels.forEach((_, algoId) => {
            this.draw(algoId);
        });
    }

    updateStats(algoId) {
        const panel = this.sortPanels.get(algoId);
        if (!panel) return;
        document.getElementById(`comparisons-${algoId}`).textContent = panel.comparisons;
        document.getElementById(`swaps-${algoId}`).textContent = panel.swaps;
        if (panel.startTime) {
            const elapsed = Date.now() - panel.startTime;
            document.getElementById(`time-${algoId}`).textContent = elapsed;
        }
    }

    async startSorting() {
        if (this.isRunning) return;
        this.isRunning = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('generateBtn').disabled = true;

        const sortPromises = this.selectedAlgorithms.map(algoId => {
            const panel = this.sortPanels.get(algoId);
            panel.startTime = Date.now();
            panel.comparisons = 0;
            panel.swaps = 0;
            panel.isComplete = false;
            return this.runAlgorithm(algoId);
        });

        await Promise.all(sortPromises);
        this.isRunning = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('generateBtn').disabled = false;
    }

    async runAlgorithm(algoId) {
        const sortFunctions = {
            bubble: this.bubbleSort.bind(this),
            insertion: this.insertionSort.bind(this),
            selection: this.selectionSort.bind(this),
            merge: this.mergeSort.bind(this),
            quick: this.quickSort.bind(this),
            heap: this.heapSort.bind(this),
            shell: this.shellSort.bind(this),
            counting: this.countingSort.bind(this),
            radix: this.radixSort.bind(this),
            bucket: this.bucketSort.bind(this),
            cocktail: this.cocktailSort.bind(this),
            comb: this.combSort.bind(this),
            gnome: this.gnomeSort.bind(this),
            bitonic: this.bitonicSort.bind(this),
            tim: this.timSort.bind(this),
            cycle: this.cycleSort.bind(this),
            bogo: this.bogoSort.bind(this)
        };

        const sortFunction = sortFunctions[algoId];
        if (sortFunction) {
            await sortFunction(algoId);
        }
    }

    stopSorting() {
        this.isRunning = false;
        document.getElementById('startBtn').disabled = false;
        document.getElementById('generateBtn').disabled = false;
    }

    reset() {
        this.stopSorting();
        this.generateArray();
    }

    async sleep() {
        // Speed is already reversed in the event listener
        return new Promise(resolve => setTimeout(resolve, this.speed));
    }
}
