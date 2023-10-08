import { MapProvider } from "react-map-gl";
import MyMap from "./Mapbox/Mapbox";
import ResultEnrollment from './ResultEnrollment/ResultEnrollment';
import ResultStatistic from './ResultStatistic/ResultStatistic';
import SchoolList from "./SchoolList/SchoolList";

const MapContainer = () => {
    return (  
        <div className='map-container'>
            <MapProvider>
                <MyMap />
                <ResultStatistic />
                <ResultEnrollment />
                <SchoolList />
            </MapProvider>
        </div>
    );
}
 
export default MapContainer;