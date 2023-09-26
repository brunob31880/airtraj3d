import React, { useRef,useEffect } from 'react';
import {
  Viewer, ImageryLayer, Camera, ScreenSpaceEventHandler,
  ScreenSpaceEvent, KmlDataSource
} from "resium";
import {
  Cartesian3, Cartographic, UrlTemplateImageryProvider, Math as CesiumMath, CesiumTerrainProvider, sampleTerrain
} from "cesium";

import * as Cesium from 'cesium';
import { MAPTILER_API_KEY, ION_KEY } from './config';
Cesium.Ion.defaultAccessToken = ION_KEY;
const terrainProvider = new CesiumTerrainProvider({
  url: `https://api.maptiler.com/tiles/terrain-quantized-mesh/?key=${MAPTILER_API_KEY}`
});

const imageryProvider = new UrlTemplateImageryProvider({
  url: `https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`,
  minimumLevel: 0,
  maximumLevel: 20
});

const initialPosition = Cartesian3.fromDegrees(2.547925, 49.009691, 4300);
const initialOrientation = { pitch: CesiumMath.toRadians(-60) };

function App() {
  const viewerRef = useRef(null);

  const handleMouseMove = (movement) => {
    if (!viewerRef.current || !viewerRef.current.cesiumElement) {
      return;
    }

    const viewer = viewerRef.current.cesiumElement;
    const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);


    if (cartesian) {
      const cartographic = Cartographic.fromCartesian(cartesian);
      const longitudeString = CesiumMath.toDegrees(cartographic.longitude).toFixed(2);
      const latitudeString = CesiumMath.toDegrees(cartographic.latitude).toFixed(2);

      sampleTerrain(terrainProvider, 11, [cartographic]).then(samples => {
        const altitude = samples[0].height;
        const coordsDisplay = document.getElementById("coords-display");

        coordsDisplay.innerHTML = `Lat: ${latitudeString} Lon: ${longitudeString} Alt: ${altitude.toFixed(2)}`;
        coordsDisplay.style.left = movement.endPosition.x + 10 + "px";
        coordsDisplay.style.top = movement.endPosition.y + 10 + "px";
      });
    } else {
      document.getElementById("coords-display").innerHTML = "";  // Cachez l'affichage si la souris n'est pas sur le globe
    }

  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const tolerance = 50; // distance en pixels pour déclencher le menu
      const leftMenu = document.getElementById('left-menu');
      const rightMenu = document.getElementById('right-menu');

      // Si la souris est à proximité du bord gauche
      if (e.clientX < tolerance) {
          console.log("Bord gauche")
          leftMenu.style.transform = 'translateX(0%)';
      } else {
          leftMenu.style.transform = 'translateX(-100%)';
      }

      // Si la souris est à proximité du bord droit
      if (window.innerWidth - e.clientX < tolerance) {
          console.log("Bord droit")
          rightMenu.style.transform = 'translateX(0%)';
      } else {
          rightMenu.style.transform = 'translateX(100%)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Retourne une fonction de nettoyage pour supprimer l'événement lors du démontage du composant
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="cesiumContainer">
      <div id="coords-display" style={{
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '5px',
        borderRadius: '4px',
        color: 'blue',
        zIndex: 1
      }}></div>

      <div id="left-menu" className="side-menu">Menu Gauche</div>
      <div id="right-menu" className="side-menu">Menu Droit</div>
      <Viewer
        ref={viewerRef}
        full
        imageryProvider={imageryProvider}
        terrainProvider={terrainProvider}
        animation={false}
        baseLayerPicker={false}
        fullscreenButton={false}
        geocoder={false}
        homeButton={false}
        infoBox={false}
        sceneModePicker={false}
        selectionIndicator={false}
        timeline={false}
        navigationHelpButton={false}
        navigationInstructionsInitiallyVisible={false}
      >
        <ImageryLayer imageryProvider={imageryProvider} />
        <Camera
          view={{
            destination: initialPosition,
            orientation: initialOrientation
          }}
        />
        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent action={handleMouseMove} type={Cesium.ScreenSpaceEventType.MOUSE_MOVE} />
        </ScreenSpaceEventHandler>
        <KmlDataSource data="./LFPV.kml" />
      </Viewer>
    </div>
  );
}

export default App;
