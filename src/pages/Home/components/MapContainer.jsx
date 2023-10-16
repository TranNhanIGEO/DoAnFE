import { MapProvider } from "react-map-gl";
import { MyMap, SchoolList, ResultEnrollment, ResultStatistic } from "./";

const MapContainer = () => {
  return (
    <div className="map-container">
      <MapProvider>
        <MyMap />
        <ResultStatistic />
        <ResultEnrollment />
        <SchoolList />
      </MapProvider>
    </div>
  );
};

export default MapContainer;
