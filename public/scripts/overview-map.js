/**
 * Overview Map
 * Displays all GPX routes as full polylines on an interactive Leaflet map
 */

class OverviewMap {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.map = null;
        this.layers = [];

        if (this.container) {
            this.init();
        }
    }

    async init() {
        try {
            const routes = await this.fetchRouteData();

            if (routes.length === 0) {
                this.showEmptyState();
                return;
            }

            this.initMap(routes);
            this.addRoutes(routes);
            this.fitBounds();
        } catch (error) {
            console.error('Failed to initialize overview map:', error);
            this.showError();
        }
    }

    async fetchRouteData() {
        const response = await fetch('/data/routes.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch routes: ${response.status}`);
        }
        return response.json();
    }

    initMap(routes) {
        this.container.innerHTML = '';

        const centerLat = routes.reduce((sum, r) => sum + r.lat, 0) / routes.length;
        const centerLon = routes.reduce((sum, r) => sum + r.lon, 0) / routes.length;

        this.map = L.map(this.containerId, {
            center: [centerLat, centerLon],
            zoom: 6,
            zoomControl: false,          // disable default (top-left)
            attributionControl: true
        });

        // Re-add zoom control at bottom-left so it clears the logo
        L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(this.map);
    }

    addRoutes(routes) {
        routes.forEach(route => {
            const hasTrack = route.trackPoints && route.trackPoints.length > 1;

            if (hasTrack) {
                // Draw full route as a polyline
                const line = L.polyline(route.trackPoints, {
                    color: '#717045',
                    weight: 3,
                    opacity: 0.85,
                    lineJoin: 'round'
                }).addTo(this.map);

                line.bindTooltip(route.title, {
                    direction: 'top',
                    className: 'overview-map-tooltip',
                    sticky: true
                });

                line.on('click', () => {
                    window.location.href = `/articles/${route.slug}`;
                });

                // Start point marker
                const startIcon = L.divIcon({
                    className: 'overview-map-marker',
                    iconSize: [14, 14],
                    iconAnchor: [7, 7],
                    popupAnchor: [0, -7]
                });

                const startMarker = L.marker(route.trackPoints[0], { icon: startIcon })
                    .addTo(this.map);

                startMarker.bindTooltip(route.title, {
                    direction: 'top',
                    className: 'overview-map-tooltip',
                    offset: [0, -6]
                });

                startMarker.on('click', () => {
                    window.location.href = `/articles/${route.slug}`;
                });

                this.layers.push(line);
            } else {
                // Fallback: just a marker if no track points
                const icon = L.divIcon({
                    className: 'overview-map-marker',
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
                    popupAnchor: [0, -12]
                });

                const marker = L.marker([route.lat, route.lon], { icon })
                    .addTo(this.map);

                marker.bindTooltip(route.title, {
                    direction: 'top',
                    className: 'overview-map-tooltip',
                    offset: [0, -8]
                });

                marker.on('click', () => {
                    window.location.href = `/articles/${route.slug}`;
                });

                this.layers.push(marker);
            }
        });
    }

    fitBounds() {
        if (this.layers.length === 0) return;

        const group = L.featureGroup(this.layers);
        const bounds = group.getBounds();
        if (bounds.isValid()) {
            this.map.fitBounds(bounds.pad(0.15));
        }
    }

    showEmptyState() {
        this.container.innerHTML = `
            <div class="overview-map-empty">
                <span class="overview-map-empty-icon">🗺️</span>
                <span>No routes available yet</span>
                <span class="overview-map-empty-subtitle">Check back soon for adventure maps!</span>
            </div>
        `;
    }

    showError() {
        this.container.innerHTML = `
            <div class="overview-map-error">
                <span class="overview-map-error-icon">⚠️</span>
                <span>Failed to load map</span>
            </div>
        `;
    }
}

window.OverviewMap = OverviewMap;
