/**
 * Route Map System
 * Handles GPX route display with Leaflet and elevation profiles with Chart.js
 */

class RouteMap {
    constructor(container) {
        this.container = container;
        this.mapId = container.dataset.mapId;
        this.gpxFile = container.dataset.gpxFile;
        this.map = null;
        this.gpxLayer = null;
        this.elevationChart = null;
        this.elevationData = [];
        this.distanceData = [];
        this.highlightMarker = null;

        // Color scheme matching website
        this.colors = {
            routeLine: '#C4623A',        // --rust-orange
            routeLineWeight: 4,
            waypointFill: '#C4A43A',      // --yellow-mustard
            waypointBorder: '#4A4419',    // --yellow-dark
            startMarker: '#3D5C4A',       // --green-forest
            endMarker: '#C4623A',         // --rust-orange
            chartFill: 'rgba(232, 144, 112, 0.4)', // --rust-salmon with alpha
            chartLine: '#C4623A',         // --rust-orange
            chartGrid: 'rgba(61, 92, 74, 0.2)',    // --green-forest with alpha
        };

        this.init();
    }

    async init() {
        try {
            await this.initMap();
            await this.loadGPX();
        } catch (error) {
            console.error('RouteMap initialization error:', error);
            this.showError('Failed to load route map');
        }
    }

    async initMap() {
        const mapContainer = document.getElementById(this.mapId);
        if (!mapContainer) return;

        // Clear loading state
        mapContainer.innerHTML = '';

        // Initialize Leaflet map
        this.map = L.map(this.mapId, {
            zoomControl: true,
            scrollWheelZoom: true,
            minZoom: 4,
            maxZoom: 16,
        });

        // Add Esri NatGeo World Map tiles
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
            maxZoom: 16,
        }).addTo(this.map);

        // Add scale control
        L.control.scale({
            metric: true,
            imperial: true,
            position: 'bottomleft'
        }).addTo(this.map);
    }

    async loadGPX() {
        if (!this.gpxFile) {
            this.showError('No GPX file specified');
            return;
        }

        // Use leaflet-gpx plugin to load and display GPX
        this.gpxLayer = new L.GPX(this.gpxFile, {
            async: true,
            marker_options: {
                startIconUrl: null,
                endIconUrl: null,
                shadowUrl: null,
                wptIconUrls: {
                    '': null
                }
            },
            polyline_options: {
                color: this.colors.routeLine,
                weight: this.colors.routeLineWeight,
                opacity: 0.9,
                lineCap: 'round',
                lineJoin: 'round'
            }
        });

        this.gpxLayer.on('loaded', (e) => {
            const gpx = e.target;

            // Fit map to route bounds
            this.map.fitBounds(gpx.getBounds(), {
                padding: [30, 30]
            });

            // Add start and end markers
            this.addRouteMarkers(gpx);

            // Extract and display elevation data
            this.extractElevationData(gpx);

            // Update statistics
            this.updateStats(gpx);

            // Make route clickable for elevation info
            this.bindRouteClickEvents();
        });

        this.gpxLayer.on('error', (e) => {
            console.error('GPX load error:', e);
            this.showError('Failed to load GPX file');
        });

        this.gpxLayer.addTo(this.map);
    }

    addRouteMarkers(gpx) {
        const points = gpx.get_elevation_data();
        if (!points || points.length === 0) return;

        // Get start and end coordinates from the track
        const layers = gpx.getLayers();
        let trackLayer = null;

        layers.forEach(layer => {
            if (layer.getLatLngs) {
                trackLayer = layer;
            }
        });

        if (!trackLayer) return;

        const latLngs = trackLayer.getLatLngs();
        if (!latLngs || latLngs.length === 0) return;

        // Flatten in case of multi-dimensional array
        const flatLatLngs = this.flattenLatLngs(latLngs);
        if (flatLatLngs.length === 0) return;

        const startPoint = flatLatLngs[0];
        const endPoint = flatLatLngs[flatLatLngs.length - 1];

        // Create custom markers
        const startMarker = L.divIcon({
            className: 'route-waypoint-marker start-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const endMarker = L.divIcon({
            className: 'route-waypoint-marker end-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        L.marker(startPoint, { icon: startMarker })
            .addTo(this.map)
            .bindPopup('<strong>Start</strong>');

        L.marker(endPoint, { icon: endMarker })
            .addTo(this.map)
            .bindPopup('<strong>End</strong>');
    }

    flattenLatLngs(latLngs) {
        let flat = [];
        latLngs.forEach(item => {
            if (Array.isArray(item)) {
                flat = flat.concat(this.flattenLatLngs(item));
            } else if (item.lat !== undefined) {
                flat.push(item);
            }
        });
        return flat;
    }

    extractElevationData(gpx) {
        const elevData = gpx.get_elevation_data();
        if (!elevData || elevData.length === 0) {
            console.warn('RouteMap: No elevation data available');
            return;
        }

        // elevData format: [[distance, elevation, latlng], ...]
        // Convert to miles and feet for display
        this.elevationData = [];
        this.distanceData = [];

        elevData.forEach(point => {
            this.distanceData.push(point[0] * 0.621371); // convert km to miles
            this.elevationData.push(point[1] * 3.28084); // convert meters to feet
        });

        // Extract latlngs directly from the track layer since get_elevation_data()
        // may return null for latlng in some leaflet-gpx versions
        this.elevationLatLngs = [];
        const layers = gpx.getLayers();
        layers.forEach(layer => {
            if (layer.getLatLngs) {
                const trackLatLngs = this.flattenLatLngs(layer.getLatLngs());
                if (trackLatLngs.length > 0) {
                    // Sample the track points to match elevation data length
                    const step = trackLatLngs.length / elevData.length;
                    for (let i = 0; i < elevData.length; i++) {
                        const idx = Math.min(Math.floor(i * step), trackLatLngs.length - 1);
                        this.elevationLatLngs.push(trackLatLngs[idx]);
                    }
                }
            }
        });

        // Create elevation chart
        this.createElevationChart();
    }

    createElevationChart() {
        const canvasId = `${this.mapId}-elevation`;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Destroy existing chart if any
        if (this.elevationChart) {
            this.elevationChart.destroy();
        }

        this.elevationChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.distanceData.map(d => d.toFixed(1)),
                datasets: [{
                    label: 'Elevation (ft)',
                    data: this.elevationData,
                    fill: true,
                    backgroundColor: this.colors.chartFill,
                    borderColor: this.colors.chartLine,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: this.colors.chartLine,
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 48, 40, 0.95)',
                        titleColor: '#CCD9C8',
                        bodyColor: '#DCC86E',
                        borderColor: '#3D5C4A',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: {
                            title: (items) => {
                                if (items.length > 0) {
                                    return `Distance: ${items[0].label} mi`;
                                }
                                return '';
                            },
                            label: (context) => {
                                return `Elevation: ${Math.round(context.raw)} ft`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Distance (mi)',
                            color: '#1A3028',
                            font: {
                                size: 11
                            }
                        },
                        ticks: {
                            color: '#3D5C4A',
                            maxTicksLimit: 10,
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            color: this.colors.chartGrid
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Elevation (ft)',
                            color: '#1A3028',
                            font: {
                                size: 11
                            }
                        },
                        ticks: {
                            color: '#3D5C4A',
                            font: {
                                size: 10
                            }
                        },
                        grid: {
                            color: this.colors.chartGrid
                        }
                    }
                },
                onHover: (event, elements) => {
                    this.handleChartHover(event, elements);
                }
            }
        });

        // Add click event to chart canvas
        canvas.addEventListener('click', (e) => {
            this.handleChartClick(e);
        });
    }

    handleChartHover(event, elements) {
        if (elements.length > 0 && this.elevationLatLngs && this.elevationLatLngs.length > 0) {
            const index = elements[0].index;
            const latLng = this.elevationLatLngs[index];

            if (latLng) {
                this.showHighlightMarker(latLng, this.elevationData[index], this.distanceData[index]);
            }
        } else {
            this.removeHighlightMarker();
        }
    }

    handleChartClick(event) {
        if (!this.elevationChart || !this.elevationLatLngs || this.elevationLatLngs.length === 0) return;

        const points = this.elevationChart.getElementsAtEventForMode(
            event,
            'index',
            { intersect: false },
            false
        );

        if (points.length > 0) {
            const index = points[0].index;
            const latLng = this.elevationLatLngs[index];

            if (latLng) {
                this.map.setView(latLng, Math.min(Math.max(this.map.getZoom(), 12), 16));
                this.showElevationPopup(latLng, this.elevationData[index], this.distanceData[index]);
            }
        }
    }

    showHighlightMarker(latLng, elevation, distance) {
        this.removeHighlightMarker();

        const icon = L.divIcon({
            className: 'route-highlight-marker',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        this.highlightMarker = L.marker(latLng, { icon: icon, interactive: false })
            .addTo(this.map);
    }

    removeHighlightMarker() {
        if (this.highlightMarker) {
            this.map.removeLayer(this.highlightMarker);
            this.highlightMarker = null;
        }
    }

    bindRouteClickEvents() {
        if (!this.gpxLayer) return;

        this.gpxLayer.eachLayer((layer) => {
            if (layer.on && layer.getLatLngs) {
                layer.on('click', (e) => {
                    const latLng = e.latlng;
                    const elevation = this.getElevationAtPoint(latLng);
                    const distance = this.getDistanceAtPoint(latLng);

                    this.showElevationPopup(latLng, elevation, distance);
                });
            }
        });
    }

    getElevationAtPoint(latLng) {
        if (!this.elevationLatLngs || this.elevationLatLngs.length === 0) return null;

        // Find closest point
        let minDist = Infinity;
        let closestIndex = 0;

        this.elevationLatLngs.forEach((point, index) => {
            if (point) {
                const dist = latLng.distanceTo(L.latLng(point));
                if (dist < minDist) {
                    minDist = dist;
                    closestIndex = index;
                }
            }
        });

        return this.elevationData[closestIndex];
    }

    getDistanceAtPoint(latLng) {
        if (!this.elevationLatLngs || this.elevationLatLngs.length === 0) return null;

        let minDist = Infinity;
        let closestIndex = 0;

        this.elevationLatLngs.forEach((point, index) => {
            if (point) {
                const dist = latLng.distanceTo(L.latLng(point));
                if (dist < minDist) {
                    minDist = dist;
                    closestIndex = index;
                }
            }
        });

        return this.distanceData[closestIndex];
    }

    showElevationPopup(latLng, elevation, distance) {
        // elevation and distance are already in feet and miles from chart data
        const content = `
            <div>
                <strong>Elevation:</strong> <span class="elevation-popup-value">${Math.round(elevation)} ft</span>
                (${Math.round(elevation / 3.28084)} m)<br>
                <strong>Distance:</strong> <span class="elevation-popup-value">${distance.toFixed(1)} mi</span>
                (${(distance / 0.621371).toFixed(1)} km)
            </div>
        `;

        L.popup()
            .setLatLng(latLng)
            .setContent(content)
            .openOn(this.map);
    }

    updateStats(gpx) {
        const statsContainer = document.getElementById(`${this.mapId}-stats`);
        if (!statsContainer) return;

        // Get route statistics
        const distanceKm = gpx.get_distance() / 1000;
        const distanceMi = distanceKm * 0.621371;
        const elevationGainM = gpx.get_elevation_gain();
        const elevationGainFt = elevationGainM * 3.28084;

        // Update stat elements with simplified format (miles/km, feet/meters)
        this.updateStatElement(statsContainer, 'distance',
            `${distanceMi.toFixed(1)} miles (${distanceKm.toFixed(1)} km)`);

        this.updateStatElement(statsContainer, 'elevation-gain',
            `${Math.round(elevationGainFt).toLocaleString()} ft (${Math.round(elevationGainM).toLocaleString()} m)`);
    }

    updateStatElement(container, statName, value) {
        const el = container.querySelector(`[data-stat="${statName}"]`);
        if (el) {
            el.textContent = value;
        }
    }

    showError(message) {
        const mapContainer = document.getElementById(this.mapId);
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="route-map-error">
                    <span class="route-map-error-icon">!</span>
                    <span>${message}</span>
                </div>
            `;
        }
    }
}

// Initialize all route maps when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const routeMaps = document.querySelectorAll('[data-route-map]');
    routeMaps.forEach(container => {
        new RouteMap(container);
    });
});
