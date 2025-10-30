// Lucky Wheel Application
class LuckyWheel {
    constructor() {
        this.canvas = document.getElementById('wheelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.confettiCanvas = document.getElementById('confettiCanvas');
        this.confettiCtx = this.confettiCanvas.getContext('2d');

        this.items = [];
        this.colors = [];
        this.isSpinning = false;
        this.currentRotation = 0;
        this.targetRotation = 0;
        this.spinVelocity = 0;
        this.lastSpinTime = 0;

        // Statistics
        this.stats = {
            totalSpins: 0,
            winners: {},
            history: []
        };

        // Settings
        this.settings = {
            soundEnabled: true,
            confettiEnabled: true,
            spinTime: false
        };

        // Confetti particles
        this.confettiParticles = [];

        this.init();
    }

    init() {
        this.setupCanvas();
        this.loadFromStorage();
        this.setupEventListeners();
        this.updateDisplay();
        this.drawWheel();

        // Set up confetti canvas
        this.resizeConfettiCanvas();
        window.addEventListener('resize', () => this.resizeConfettiCanvas());
    }

    setupCanvas() {
        // Set canvas size
        const size = Math.min(400, window.innerWidth - 40);
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = size / 2 - 10;
    }

    resizeConfettiCanvas() {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
    }

    setupEventListeners() {
        // Spin button
        document.getElementById('spinButton').addEventListener('click', () => {
            if (!this.isSpinning && this.items.length > 0) {
                this.spin();
            } else if (this.items.length === 0) {
                this.showToast('Please add items first!', 'warning');
            }
        });

        // Item management
        document.getElementById('addItemBtn').addEventListener('click', () => this.addItem());
        document.getElementById('itemInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem();
        });

        // Bulk import
        document.getElementById('bulkImportBtn').addEventListener('click', () => this.bulkImport());

        // Settings
        document.getElementById('soundEnabled').addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.saveToStorage();
        });

        document.getElementById('confettiEnabled').addEventListener('change', (e) => {
            this.settings.confettiEnabled = e.target.checked;
            this.saveToStorage();
        });

        document.getElementById('spinTime').addEventListener('change', (e) => {
            this.settings.spinTime = e.target.checked;
            this.saveToStorage();
        });

        // Action buttons
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAll());
        document.getElementById('resetStatsBtn').addEventListener('click', () => this.resetStats());
    }

    generateColor(index) {
        const hue = (index * 360 / 8) % 360;
        return `hsl(${hue}, 70%, 60%)`;
    }

    addItem() {
        const input = document.getElementById('itemInput');
        const itemName = input.value.trim();

        if (!itemName) {
            this.showToast('Please enter an item name', 'warning');
            return;
        }

        if (this.items.some(item => item.name === itemName)) {
            this.showToast('Item already exists!', 'error');
            return;
        }

        const item = {
            id: Date.now(),
            name: itemName,
            color: this.generateColor(this.items.length)
        };

        this.items.push(item);
        this.colors.push(item.color);
        input.value = '';

        this.updateDisplay();
        this.drawWheel();
        this.saveToStorage();
        this.playSound('add');
        this.showToast('Item added successfully!', 'success');
    }

    editItem(id) {
        const item = this.items.find(item => item.id === id);
        if (!item) return;

        const newName = prompt('Edit item name:', item.name);
        if (newName && newName.trim() && newName.trim() !== item.name) {
            if (this.items.some(i => i.name === newName.trim() && i.id !== id)) {
                this.showToast('Item with this name already exists!', 'error');
                return;
            }

            item.name = newName.trim();
            this.updateDisplay();
            this.drawWheel();
            this.saveToStorage();
            this.showToast('Item updated successfully!', 'success');
        }
    }

    deleteItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const itemName = this.items[index].name;
            this.items.splice(index, 1);
            this.colors.splice(index, 1);

            // Recalculate colors
            this.items.forEach((item, i) => {
                item.color = this.generateColor(i);
                this.colors[i] = item.color;
            });

            this.updateDisplay();
            this.drawWheel();
            this.saveToStorage();
            this.playSound('delete');
            this.showToast(`"${itemName}" removed`, 'success');
        }
    }

    bulkImport() {
        const textarea = document.getElementById('bulkInput');
        const lines = textarea.value.split('\n').map(line => line.trim()).filter(line => line);

        if (lines.length === 0) {
            this.showToast('Please enter items to import', 'warning');
            return;
        }

        let addedCount = 0;
        let duplicateCount = 0;

        lines.forEach(line => {
            if (!this.items.some(item => item.name === line)) {
                const item = {
                    id: Date.now() + Math.random(),
                    name: line,
                    color: this.generateColor(this.items.length)
                };

                this.items.push(item);
                this.colors.push(item.color);
                addedCount++;
            } else {
                duplicateCount++;
            }
        });

        textarea.value = '';

        if (addedCount > 0) {
            this.updateDisplay();
            this.drawWheel();
            this.saveToStorage();
            this.playSound('add');
        }

        const message = addedCount > 0
            ? `Added ${addedCount} items${duplicateCount > 0 ? ` (${duplicateCount} duplicates skipped)` : ''}`
            : 'No new items added (all duplicates)';

        this.showToast(message, addedCount > 0 ? 'success' : 'warning');
    }

    spin() {
        if (this.isSpinning || this.items.length === 0) return;

        this.isSpinning = true;
        document.getElementById('spinButton').classList.add('spinning');
        document.getElementById('winnerDisplay').classList.remove('show');

        // Calculate random spin with border avoidance
        const minSpins = 5;
        const maxSpins = 8;
        const totalSpins = minSpins + Math.random() * (maxSpins - minSpins);

        // Calculate segment angle and add random offset within segment center
        const segmentAngle = 360 / this.items.length;
        const segmentPadding = segmentAngle * 0.2; // 20% padding from edges
        const safeZone = segmentAngle - segmentPadding;
        const randomSegment = Math.floor(Math.random() * this.items.length);
        const randomOffset = segmentPadding/2 + Math.random() * safeZone;
        const randomAngle = randomSegment * segmentAngle + randomOffset;

        this.targetRotation = this.currentRotation + (totalSpins * 360) + randomAngle;
        this.spinVelocity = 0.3;

        // Start spin animation
        this.lastSpinTime = performance.now();
        this.animateSpin();

        this.playSound('spin');
    }

    animateSpin() {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastSpinTime;
        this.lastSpinTime = currentTime;

        // Calculate rotation
        const rotationDiff = this.targetRotation - this.currentRotation;
        this.currentRotation += rotationDiff * this.spinVelocity;

        // Apply friction
        this.spinVelocity *= 0.985;

        // Draw wheel
        this.drawWheel();

        // Continue animation or finish
        if (Math.abs(rotationDiff) > 0.1 && this.spinVelocity > 0.001) {
            requestAnimationFrame(() => this.animateSpin());
        } else {
            this.currentRotation = this.targetRotation;
            this.drawWheel();
            this.finishSpin();
        }
    }

    finishSpin() {
        this.isSpinning = false;
        document.getElementById('spinButton').classList.remove('spinning');

        // Calculate winner - pointer is at top (0 degrees), need to find which segment is at top
        const normalizedAngle = (360 - (this.currentRotation % 360)) % 360;
        const segmentAngle = 360 / this.items.length;

        // Adjust for the fact that first segment starts at angle 0 (right side, 3 o'clock)
        // and we need to account for pointer being at top (12 o'clock = 270 degrees)
        const adjustedAngle = (normalizedAngle + 270) % 360;
        const winnerIndex = Math.floor(adjustedAngle / segmentAngle) % this.items.length;
        const winner = this.items[winnerIndex];

        // Update statistics
        this.updateStats(winner);

        // Show winner
        this.showWinner(winner);

        // Play effects
        this.playSound('win');
        if (this.settings.confettiEnabled) {
            this.startConfetti();
        }
    }

    showWinner(winner) {
        document.getElementById('winnerText').textContent = winner.name;
        document.getElementById('winnerDisplay').classList.add('show');
    }

    drawWheel() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.items.length === 0) {
            // Draw empty wheel
            ctx.beginPath();
            ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#f3f4f6';
            ctx.fill();
            ctx.strokeStyle = '#d1d5db';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#6b7280';
            ctx.font = '16px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Add items to start', this.centerX, this.centerY);
            return;
        }

        // Save context state
        ctx.save();

        // Apply rotation
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate((this.currentRotation * Math.PI) / 180);
        ctx.translate(-this.centerX, -this.centerY);

        // Draw segments
        const anglePerSegment = (2 * Math.PI) / this.items.length;

        this.items.forEach((item, index) => {
            const startAngle = index * anglePerSegment;
            const endAngle = (index + 1) * anglePerSegment;

            // Draw segment
            ctx.beginPath();
            ctx.moveTo(this.centerX, this.centerY);
            ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = item.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.translate(this.centerX, this.centerY);
            ctx.rotate(startAngle + anglePerSegment / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px Inter';
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 4;
            ctx.fillText(item.name, this.radius * 0.65, 0);
            ctx.restore();
        });

        // Restore context state
        ctx.restore();

        // Draw center circle
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, 30, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    updateStats(winner) {
        this.stats.totalSpins++;
        this.stats.winners[winner.name] = (this.stats.winners[winner.name] || 0) + 1;

        // Add to history
        const historyEntry = {
            winner: winner.name,
            time: new Date().toLocaleTimeString()
        };
        this.stats.history.unshift(historyEntry);
        if (this.stats.history.length > 10) {
            this.stats.history.pop();
        }

        this.updateStatsDisplay();
        this.saveToStorage();
    }

    updateStatsDisplay() {
        document.getElementById('totalSpins').textContent = this.stats.totalSpins;
        document.getElementById('uniqueWinners').textContent = Object.keys(this.stats.winners).length;

        // Find most frequent winner
        let mostFrequent = '-';
        let maxCount = 0;
        for (const [name, count] of Object.entries(this.stats.winners)) {
            if (count > maxCount) {
                maxCount = count;
                mostFrequent = `${name} (${count})`;
            }
        }
        document.getElementById('mostFrequent').textContent = mostFrequent;

        // Update history
        const historyList = document.getElementById('historyList');
        if (this.stats.history.length === 0) {
            historyList.innerHTML = '<p class="no-history">No spins yet</p>';
        } else {
            historyList.innerHTML = this.stats.history.map(entry => `
                <div class="history-item">
                    <span class="history-winner">${entry.winner}</span>
                    <span class="history-time">${entry.time}</span>
                </div>
            `).join('');
        }
    }

    updateDisplay() {
        const itemsList = document.getElementById('itemsList');

        if (this.items.length === 0) {
            itemsList.innerHTML = '<p class="no-items">No items added yet</p>';
        } else {
            itemsList.innerHTML = this.items.map(item => `
                <div class="item">
                    <div style="display: flex; align-items: center;">
                        <span class="item-color" style="background: ${item.color}"></span>
                        <span class="item-name">${item.name}</span>
                    </div>
                    <div class="item-actions">
                        <button class="item-btn edit-btn" onclick="wheel.editItem(${item.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="item-btn delete-btn" onclick="wheel.deleteItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Update settings display
        document.getElementById('soundEnabled').checked = this.settings.soundEnabled;
        document.getElementById('confettiEnabled').checked = this.settings.confettiEnabled;
        document.getElementById('spinTime').checked = this.settings.spinTime;
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all items? This cannot be undone.')) {
            this.items = [];
            this.colors = [];
            this.updateDisplay();
            this.drawWheel();
            this.saveToStorage();
            this.showToast('All items cleared', 'success');
        }
    }

    resetStats() {
        if (confirm('Are you sure you want to reset all statistics?')) {
            this.stats = {
                totalSpins: 0,
                winners: {},
                history: []
            };
            this.updateStatsDisplay();
            this.saveToStorage();
            this.showToast('Statistics reset', 'success');
        }
    }

    // Confetti effect
    startConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080'];

        for (let i = 0; i < 150; i++) {
            this.confettiParticles.push({
                x: Math.random() * this.confettiCanvas.width,
                y: -10,
                vx: Math.random() * 6 - 3,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 4 + 2,
                angle: Math.random() * 360,
                angleVelocity: Math.random() * 10 - 5
            });
        }

        this.animateConfetti();
    }

    animateConfetti() {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
            const particle = this.confettiParticles[i];

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.angle += particle.angleVelocity;

            // Remove if out of bounds
            if (particle.y > this.confettiCanvas.height) {
                this.confettiParticles.splice(i, 1);
                continue;
            }

            // Draw particle
            this.confettiCtx.save();
            this.confettiCtx.translate(particle.x, particle.y);
            this.confettiCtx.rotate((particle.angle * Math.PI) / 180);
            this.confettiCtx.fillStyle = particle.color;
            this.confettiCtx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            this.confettiCtx.restore();
        }

        if (this.confettiParticles.length > 0) {
            requestAnimationFrame(() => this.animateConfetti());
        }
    }

    // Sound effects
    playSound(type) {
        if (!this.settings.soundEnabled) return;

        // Create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
            case 'spin':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'win':
                oscillator.frequency.value = 1200;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.frequency.exponentialRampToValueAtTime(2400, audioContext.currentTime + 0.2);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'add':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.05);
                break;
            case 'delete':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
        }
    }

    // Toast notifications
    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? 'check-circle' :
                    type === 'error' ? 'times-circle' :
                    type === 'warning' ? 'exclamation-triangle' : 'info-circle';

        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => container.removeChild(toast), 300);
        }, 3000);
    }

    // Storage functions
    saveToStorage() {
        const data = {
            items: this.items,
            stats: this.stats,
            settings: this.settings
        };
        localStorage.setItem('luckyWheelData', JSON.stringify(data));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('luckyWheelData');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.items = data.items || [];
                this.stats = data.stats || { totalSpins: 0, winners: {}, history: [] };
                this.settings = data.settings || { soundEnabled: true, confettiEnabled: true, spinTime: false };

                // Recalculate colors
                this.colors = this.items.map((item, i) => {
                    item.color = this.generateColor(i);
                    return item.color;
                });

                this.updateStatsDisplay();
            } catch (error) {
                console.error('Error loading data:', error);
                // Load default items if storage is corrupted
                this.loadDefaultItems();
            }
        } else {
            this.loadDefaultItems();
        }
    }

    loadDefaultItems() {
        // Load some default items for demonstration
        const defaultItems = [
            { id: 1, name: 'Option 1', color: this.generateColor(0) },
            { id: 2, name: 'Option 2', color: this.generateColor(1) },
            { id: 3, name: 'Option 3', color: this.generateColor(2) },
            { id: 4, name: 'Option 4', color: this.generateColor(3) }
        ];

        this.items = defaultItems;
        this.colors = defaultItems.map(item => item.color);
    }
}

// Initialize the application
let wheel;
document.addEventListener('DOMContentLoaded', () => {
    wheel = new LuckyWheel();
});