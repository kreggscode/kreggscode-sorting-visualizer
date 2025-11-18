// Sorting Algorithms Implementation
// This file extends the SortingVisualizer class with all sorting algorithm methods

SortingVisualizer.prototype.bubbleSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    for (let i = 0; i < n - 1 && this.isRunning; i++) {
        for (let j = 0; j < n - i - 1 && this.isRunning; j++) {
            panel.comparisons++;
            this.draw(algoId, [j, j + 1]);
            this.updateStats(algoId);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                panel.swaps++;
                this.playSound(200 + arr[j] * 8);
            }
            await this.sleep();
        }
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.insertionSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    for (let i = 1; i < n && this.isRunning; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && this.isRunning) {
            panel.comparisons++;
            this.draw(algoId, [j, j + 1]);
            this.updateStats(algoId);
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                panel.swaps++;
                this.playSound(200 + arr[j] * 8);
                j--;
                await this.sleep();
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.selectionSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    for (let i = 0; i < n - 1 && this.isRunning; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n && this.isRunning; j++) {
            panel.comparisons++;
            this.draw(algoId, [i, j, minIdx]);
            this.updateStats(algoId);
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
            await this.sleep();
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            panel.swaps++;
            this.playSound(200 + arr[i] * 8);
        }
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.mergeSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    await this.mergeSortHelper(algoId, 0, panel.array.length - 1);
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.mergeSortHelper = async function(algoId, left, right) {
    if (left >= right || !this.isRunning) return;
    const mid = Math.floor((left + right) / 2);
    await this.mergeSortHelper(algoId, left, mid);
    await this.mergeSortHelper(algoId, mid + 1, right);
    await this.merge(algoId, left, mid, right);
};

SortingVisualizer.prototype.merge = async function(algoId, left, mid, right) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length && this.isRunning) {
        panel.comparisons++;
        this.draw(algoId, [k]);
        this.updateStats(algoId);
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        panel.swaps++;
        this.playSound(200 + arr[k] * 8);
        k++;
        await this.sleep();
    }
    while (i < leftArr.length && this.isRunning) {
        arr[k] = leftArr[i];
        panel.swaps++;
        this.draw(algoId, [k]);
        this.updateStats(algoId);
        this.playSound(200 + arr[k] * 8);
        i++;
        k++;
        await this.sleep();
    }
    while (j < rightArr.length && this.isRunning) {
        arr[k] = rightArr[j];
        panel.swaps++;
        this.draw(algoId, [k]);
        this.updateStats(algoId);
        this.playSound(200 + arr[k] * 8);
        j++;
        k++;
        await this.sleep();
    }
};

SortingVisualizer.prototype.quickSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    await this.quickSortHelper(algoId, 0, panel.array.length - 1);
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.quickSortHelper = async function(algoId, low, high) {
    if (low < high && this.isRunning) {
        const pi = await this.partition(algoId, low, high);
        await this.quickSortHelper(algoId, low, pi - 1);
        await this.quickSortHelper(algoId, pi + 1, high);
    }
};

SortingVisualizer.prototype.partition = async function(algoId, low, high) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high && this.isRunning; j++) {
        panel.comparisons++;
        this.draw(algoId, [j, high]);
        this.updateStats(algoId);
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            panel.swaps++;
            this.playSound(200 + arr[i] * 8);
        }
        await this.sleep();
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    panel.swaps++;
    this.playSound(200 + arr[i + 1] * 8);
    await this.sleep();
    return i + 1;
};

SortingVisualizer.prototype.heapSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0 && this.isRunning; i--) {
        await this.heapify(algoId, n, i);
    }
    for (let i = n - 1; i > 0 && this.isRunning; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        panel.swaps++;
        this.playSound(200 + arr[0] * 8);
        this.draw(algoId, [0, i]);
        this.updateStats(algoId);
        await this.sleep();
        await this.heapify(algoId, i, 0);
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.heapify = async function(algoId, n, i) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) {
        panel.comparisons++;
        if (arr[left] > arr[largest]) {
            largest = left;
        }
    }
    if (right < n) {
        panel.comparisons++;
        if (arr[right] > arr[largest]) {
            largest = right;
        }
    }
    if (largest !== i && this.isRunning) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        panel.swaps++;
        this.draw(algoId, [i, largest]);
        this.updateStats(algoId);
        this.playSound(200 + arr[i] * 8);
        await this.sleep();
        await this.heapify(algoId, n, largest);
    }
};

SortingVisualizer.prototype.shellSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0 && this.isRunning; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n && this.isRunning; i++) {
            const temp = arr[i];
            let j = i;
            while (j >= gap && this.isRunning) {
                panel.comparisons++;
                this.draw(algoId, [j, j - gap]);
                this.updateStats(algoId);
                if (arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    panel.swaps++;
                    this.playSound(200 + arr[j] * 8);
                    j -= gap;
                    await this.sleep();
                } else {
                    break;
                }
            }
            arr[j] = temp;
        }
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.countingSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(n);
    for (let i = 0; i < n && this.isRunning; i++) {
        count[arr[i] - min]++;
        panel.comparisons++;
        await this.sleep();
    }
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    for (let i = n - 1; i >= 0 && this.isRunning; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
        panel.swaps++;
        this.draw(algoId, [i]);
        this.updateStats(algoId);
        this.playSound(200 + arr[i] * 8);
        await this.sleep();
    }
    for (let i = 0; i < n && this.isRunning; i++) {
        arr[i] = output[i];
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.radixSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0 && this.isRunning; exp *= 10) {
        await this.countingSortByDigit(algoId, exp);
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.countingSortByDigit = async function(algoId, exp) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    for (let i = n - 1; i >= 0 && this.isRunning; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
        panel.swaps++;
        this.draw(algoId, [i]);
        this.updateStats(algoId);
        this.playSound(200 + arr[i] * 8);
        await this.sleep();
    }
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
};

SortingVisualizer.prototype.bucketSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const bucketCount = 10;
    const buckets = Array.from({ length: bucketCount }, () => []);
    for (let i = 0; i < n && this.isRunning; i++) {
        const bucketIndex = Math.floor(((arr[i] - min) / (max - min + 1)) * bucketCount);
        buckets[Math.min(bucketIndex, bucketCount - 1)].push(arr[i]);
        panel.comparisons++;
        await this.sleep();
    }
    let index = 0;
    for (let i = 0; i < bucketCount && this.isRunning; i++) {
        buckets[i].sort((a, b) => a - b);
        for (let j = 0; j < buckets[i].length && this.isRunning; j++) {
            arr[index] = buckets[i][j];
            panel.swaps++;
            this.draw(algoId, [index]);
            this.updateStats(algoId);
            this.playSound(200 + arr[index] * 8);
            index++;
            await this.sleep();
        }
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.cocktailSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    let swapped = true;
    let start = 0;
    let end = arr.length - 1;
    while (swapped && this.isRunning) {
        swapped = false;
        for (let i = start; i < end && this.isRunning; i++) {
            panel.comparisons++;
            this.draw(algoId, [i, i + 1]);
            this.updateStats(algoId);
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                panel.swaps++;
                this.playSound(200 + arr[i] * 8);
                swapped = true;
            }
            await this.sleep();
        }
        if (!swapped) break;
        swapped = false;
        end--;
        for (let i = end - 1; i >= start && this.isRunning; i--) {
            panel.comparisons++;
            this.draw(algoId, [i, i + 1]);
            this.updateStats(algoId);
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                panel.swaps++;
                this.playSound(200 + arr[i] * 8);
                swapped = true;
            }
            await this.sleep();
        }
        start++;
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.combSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    let gap = n;
    const shrink = 1.3;
    let sorted = false;
    while (!sorted && this.isRunning) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }
        for (let i = 0; i + gap < n && this.isRunning; i++) {
            panel.comparisons++;
            this.draw(algoId, [i, i + gap]);
            this.updateStats(algoId);
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                panel.swaps++;
                this.playSound(200 + arr[i] * 8);
                sorted = false;
            }
            await this.sleep();
        }
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.gnomeSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    let index = 0;
    while (index < n && this.isRunning) {
        if (index === 0) {
            index++;
        }
        panel.comparisons++;
        this.draw(algoId, [index, index - 1]);
        this.updateStats(algoId);
        if (arr[index] >= arr[index - 1]) {
            index++;
        } else {
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            panel.swaps++;
            this.playSound(200 + arr[index] * 8);
            index--;
        }
        await this.sleep();
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.bitonicSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const n = panel.array.length;
    await this.bitonicSortHelper(algoId, 0, n, 1);
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.bitonicSortHelper = async function(algoId, low, cnt, dir) {
    if (cnt > 1 && this.isRunning) {
        const k = Math.floor(cnt / 2);
        await this.bitonicSortHelper(algoId, low, k, 1);
        await this.bitonicSortHelper(algoId, low + k, k, 0);
        await this.bitonicMerge(algoId, low, cnt, dir);
    }
};

SortingVisualizer.prototype.bitonicMerge = async function(algoId, low, cnt, dir) {
    if (cnt > 1 && this.isRunning) {
        const k = Math.floor(cnt / 2);
        for (let i = low; i < low + k && this.isRunning; i++) {
            await this.bitonicCompare(algoId, i, i + k, dir);
        }
        await this.bitonicMerge(algoId, low, k, dir);
        await this.bitonicMerge(algoId, low + k, k, dir);
    }
};

SortingVisualizer.prototype.bitonicCompare = async function(algoId, i, j, dir) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    panel.comparisons++;
    this.draw(algoId, [i, j]);
    this.updateStats(algoId);
    if ((arr[i] > arr[j] && dir === 1) || (arr[i] < arr[j] && dir === 0)) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        panel.swaps++;
        this.playSound(200 + arr[i] * 8);
    }
    await this.sleep();
};

SortingVisualizer.prototype.timSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    const RUN = 32;
    for (let i = 0; i < n && this.isRunning; i += RUN) {
        await this.insertionSortRange(algoId, i, Math.min(i + RUN - 1, n - 1));
    }
    for (let size = RUN; size < n && this.isRunning; size = 2 * size) {
        for (let start = 0; start < n && this.isRunning; start += 2 * size) {
            const mid = start + size - 1;
            const end = Math.min(start + 2 * size - 1, n - 1);
            if (mid < end) {
                await this.merge(algoId, start, mid, end);
            }
        }
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.insertionSortRange = async function(algoId, left, right) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    for (let i = left + 1; i <= right && this.isRunning; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= left && this.isRunning) {
            panel.comparisons++;
            this.draw(algoId, [j, j + 1]);
            this.updateStats(algoId);
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                panel.swaps++;
                this.playSound(200 + arr[j] * 8);
                j--;
                await this.sleep();
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
};

SortingVisualizer.prototype.cycleSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    for (let cycleStart = 0; cycleStart < n - 1 && this.isRunning; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;
        for (let i = cycleStart + 1; i < n && this.isRunning; i++) {
            panel.comparisons++;
            if (arr[i] < item) {
                pos++;
            }
        }
        if (pos === cycleStart) continue;
        while (item === arr[pos]) {
            pos++;
        }
        if (pos !== cycleStart) {
            [item, arr[pos]] = [arr[pos], item];
            panel.swaps++;
            this.draw(algoId, [pos]);
            this.updateStats(algoId);
            this.playSound(200 + arr[pos] * 8);
            await this.sleep();
        }
        while (pos !== cycleStart && this.isRunning) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < n && this.isRunning; i++) {
                panel.comparisons++;
                if (arr[i] < item) {
                    pos++;
                }
            }
            while (item === arr[pos]) {
                pos++;
            }
            if (item !== arr[pos]) {
                [item, arr[pos]] = [arr[pos], item];
                panel.swaps++;
                this.draw(algoId, [pos]);
                this.updateStats(algoId);
                this.playSound(200 + arr[pos] * 8);
                await this.sleep();
            }
        }
    }
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

SortingVisualizer.prototype.bogoSort = async function(algoId) {
    const panel = this.sortPanels.get(algoId);
    const arr = panel.array;
    const n = arr.length;
    
    // Helper function to check if array is sorted
    const isSorted = () => {
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) return false;
        }
        return true;
    };
    
    // Helper function to shuffle array
    const shuffle = async () => {
        for (let i = n - 1; i > 0 && this.isRunning; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
            panel.swaps++;
            this.draw(algoId, [i, j]);
            this.updateStats(algoId);
            this.playSound(200 + arr[i] * 8);
            await this.sleep();
        }
    };
    
    // Keep shuffling until sorted (or stopped)
    let attempts = 0;
    const maxAttempts = 1000; // Safety limit to prevent infinite loop
    
    while (!isSorted() && this.isRunning && attempts < maxAttempts) {
        await shuffle();
        panel.comparisons += n - 1;
        this.updateStats(algoId);
        attempts++;
    }
    
    this.draw(algoId);
    panel.isComplete = true;
    this.playCompletionSound();
};

// Initialize the visualizer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
});
