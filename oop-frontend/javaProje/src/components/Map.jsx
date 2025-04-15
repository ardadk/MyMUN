// src/components/MapComponent.jsx

import React from "react";

function MapComponent() {
  return (
    <div style={styles.mapContainer}>
      {/* Örnek bir dünya haritası resmi veya harita kütüphanesi */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
        alt="World Map"
        style={styles.mapImage}
      />
      {/* İsteğe göre konum pinleri veya custom markerlar ekleyebilirsiniz */}
    </div>
  );
}

const styles = {
  mapContainer: {
    margin: "16px",
    textAlign: "center"
  },
  mapImage: {
    maxWidth: "600px",
    width: "100%"
  }
};

export default MapComponent;
