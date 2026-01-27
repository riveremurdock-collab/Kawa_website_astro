/**
 * Audio Player System
 * Handles the Radio/Music player in the menu popup
 */

class AudioPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.currentTrack = 0;
        this.volume = 0.5;
        this.initialized = false;

        this.tracks = [
            { title: 'Yotee', src: '/sounds/radio/yotee.m4a' }
        ];
    }

    init() {
        const container = document.getElementById('audio-player');
        if (!container || this.initialized) return;

        this.initialized = true;
        this.render(container);
        this.bindEvents(container);
    }

    render(container) {
        container.innerHTML = `
            <div class="audio-player">
                <div class="track-info">
                    <span class="track-title" id="track-title">${this.tracks[this.currentTrack].title}</span>
                </div>
                <div class="player-buttons">
                    <button class="audio-btn prev-btn" aria-label="Previous track">&#9664;&#9664;</button>
                    <button class="audio-btn play-btn" aria-label="Play">&#9654;</button>
                    <button class="audio-btn next-btn" aria-label="Next track">&#9654;&#9654;</button>
                </div>
                <div class="volume-control">
                    <span style="font-size: 12px; color: var(--green-sage);">Vol</span>
                    <input type="range"
                           min="0"
                           max="100"
                           value="${this.volume * 100}"
                           class="volume-slider"
                           aria-label="Volume">
                </div>
                <p class="audio-note">Add audio files to the audio/ folder to expand your playlist</p>
            </div>
        `;
    }

    bindEvents(container) {
        const playBtn = container.querySelector('.play-btn');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const volumeSlider = container.querySelector('.volume-slider');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlay());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevTrack());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTrack());
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }
    }

    createAudio() {
        if (!this.audio) {
            this.audio = new Audio();
            this.audio.volume = this.volume;

            this.audio.addEventListener('ended', () => {
                this.nextTrack();
                if (this.isPlaying) {
                    this.play();
                }
            });

            this.audio.addEventListener('error', () => {
                console.log('Audio file not found. Add audio files to the audio/ folder.');
            });
        }
    }

    loadTrack(index) {
        this.createAudio();
        this.currentTrack = index;
        this.audio.src = this.tracks[index].src;
        this.updateTrackInfo();
    }

    play() {
        this.createAudio();

        if (!this.audio.src || this.audio.src === window.location.href) {
            this.loadTrack(this.currentTrack);
        }

        this.audio.play().catch(() => {
            // Audio file doesn't exist yet - that's okay
            console.log('Add audio files to enable playback');
        });

        this.isPlaying = true;
        this.updatePlayButton();
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
        }
        this.isPlaying = false;
        this.updatePlayButton();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    prevTrack() {
        const newIndex = (this.currentTrack - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(newIndex);

        if (this.isPlaying) {
            this.play();
        }
    }

    nextTrack() {
        const newIndex = (this.currentTrack + 1) % this.tracks.length;
        this.loadTrack(newIndex);

        if (this.isPlaying) {
            this.play();
        }
    }

    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));

        if (this.audio) {
            this.audio.volume = this.volume;
        }
    }

    updateTrackInfo() {
        const titleEl = document.getElementById('track-title');
        if (titleEl) {
            titleEl.textContent = this.tracks[this.currentTrack].title;
        }
    }

    updatePlayButton() {
        const playBtn = document.querySelector('.play-btn');
        if (playBtn) {
            playBtn.innerHTML = this.isPlaying ? '&#10074;&#10074;' : '&#9654;';
            playBtn.setAttribute('aria-label', this.isPlaying ? 'Pause' : 'Play');
        }
    }

    // Reset when popup closes
    reset() {
        this.initialized = false;
        if (this.audio) {
            this.pause();
        }
    }
}

// Initialize global instance
document.addEventListener('DOMContentLoaded', () => {
    window.audioPlayer = new AudioPlayer();
});
