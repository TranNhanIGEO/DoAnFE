import './Mapbox.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import './react-map-gl-directions/style.css'
import mapboxgl from 'mapbox-gl'
import Directions from './react-map-gl-directions'
import Map, { GeolocateControl, Marker, NavigationControl, Popup, useMap } from 'react-map-gl'
import { useContext, useEffect, useRef, useState, useMemo, useCallback } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { MapContext } from 'src/contexts/MapContext'
import { apiGetSchoolName } from 'src/redux//request/mapRequest'

const Mapbox = () => {
    const {dataResponseEnrollment} = useContext(MapContext)
    const {enrollmentCoords} = useContext(MapContext)
    const {setIsCloseSidebar} = useContext(MapContext)
    const {directionCurrent} = useContext(MapContext)
    const [viewState, setViewState] = useState({});
    const [isShowPopup, setIsShowPopup] = useState(false)
    const [infoPopup, setInfoPopup] = useState({})
    const [isShowDirections, setIsShowDirections] = useState(false)
    const styleMap = {width: '100%', height: '100%'}
    const bigScreen = window.innerWidth > 768
    const mapRef = useRef(null)
    const directionRef = useRef(null)

    useEffect(() => {
        const success = (pos) => setViewState({latitude: pos.coords.latitude, longitude: pos.coords.longitude, zoom: 14})
        const error = () => alert('Geolocation is not supported by this browser.')
        navigator.geolocation.getCurrentPosition(success, error)
    }, [])

    const handleSetInfoPopup = (e) => {
        if (!mapRef.current?.getLayer("allschool")) return
        const features = e.target.queryRenderedFeatures(e.point, {layers: ['allschool']});
        if (!features.length) return
        const [feature] = features
        setIsShowPopup(prev => bigScreen ? true : !prev)
        setInfoPopup(feature)
    }

    const handleMouseMoveMap = (e) => {
        handleSetInfoPopup(e)
    }

    const handleClickMap = (e) => {
        handleSetInfoPopup(e)
        setIsCloseSidebar(true)
    }

    const handleDragMap = (e) => {
        setIsShowPopup(false)
        setInfoPopup({})
    }

    const handleTouchMoveMap = (e) => {
        setIsShowPopup(false)
        setInfoPopup({})
    }

    const handleLoadMap = (e) => {
        setIsShowDirections(true)
    }

    useEffect(() => {
        if (!mapRef.current) return
        const map = mapRef.current.getMap()
        enrollmentCoords.length && map.flyTo({center: enrollmentCoords, zoom: 15, curve: 1, speed: 0.5})
    }, [enrollmentCoords])

    useEffect(() => {
        if (!directionRef.current) return
        const mapDirection = directionRef.current.directions.actions
        directionCurrent.current = mapDirection
        mapDirection.setOriginFromCoordinates(enrollmentCoords)
    }, [enrollmentCoords, directionCurrent])

    useEffect(() => {
        if (!mapRef.current) return
        const map = mapRef.current.getMap()
        map.getLayer('inlinebuffer') && map.removeLayer('inlinebuffer')
        map.getLayer('outlinebuffer') && map.removeLayer('outlinebuffer')
        map.getLayer('markerschoolpoint') && map.removeLayer('markerschoolpoint')
        map.hasImage('icon-schoolpoint') && map.removeImage('icon-schoolpoint')
        map.getSource('pointjson') && map.removeSource('pointjson')
        map.getSource('bufferjson') && map.removeSource('bufferjson')
        
        if (!dataResponseEnrollment.length) return
        const [resultBufferJson] = dataResponseEnrollment
        const dataBufferJson = resultBufferJson.bufferjson
        const [coordsBufferJson] = dataBufferJson.coordinates
        map.addSource('bufferjson', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [coordsBufferJson]
                }
            }
        })
        map.addLayer({
            'id': 'inlinebuffer',
            'type': 'fill',
            'source': 'bufferjson',
            'layout': {},
            'paint': {
                'fill-color': '#0080ff',
                'fill-opacity': 0.5
            }
        })
        map.addLayer({
            'id': 'outlinebuffer',
            'type': 'line',
            'source': 'bufferjson',
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 1
            }
        })
        map.loadImage('/imgs/icon-school-result.png', (error, image) => {
            if (error) throw error;
            map.addImage('icon-schoolpoint', image)
            const resultPointJson = dataResponseEnrollment
            const dataPointJson = resultPointJson.map(result => result.pointjson)
            const featurePointJson = dataPointJson.map(point => ({
                'type': 'Feature',
                'geometry': {
                    'type': point.type,
                    'coordinates': point.coordinates
                }
            }))
            map.addSource('pointjson', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': featurePointJson
                }
            })
            map.addLayer({
                'id': 'markerschoolpoint',
                'type': 'symbol',
                'source': 'pointjson',
                'layout': {
                    'icon-image': 'icon-schoolpoint',
                    'icon-size': 1,
                    'icon-ignore-placement': true
                }
            })
        })
        const boundsBuffer = new mapboxgl.LngLatBounds()
        coordsBufferJson.map(coordinates => boundsBuffer.extend(coordinates))
        map.fitBounds(boundsBuffer, {padding: {top: 20, bottom: 300}})
    }, [dataResponseEnrollment])

    return (  
        <Map 
            id="mapbox"
            language="vi"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_KEY}
            mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
            initialViewState={{longitude: 106.6860544, latitude: 10.7773952, zoom: 10} || viewState}
            style={styleMap}
            ref={mapRef}
            onMouseMove={(e) => bigScreen && handleMouseMoveMap(e)}
            onClick={(e) => !bigScreen && handleClickMap(e)}
            onDrag={(e) => handleDragMap(e)}
            onTouchMove={(e) => handleTouchMoveMap(e)}
            onLoad={(e) => handleLoadMap(e)}
        >
            <NavigationControl position={'top-right'} visualizePitch={true} showCompass={true} showZoom={bigScreen} />
            <GeolocateControl position={'bottom-right'} positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} showUserLocation={true} showAccuracyCircle={false} />
            {isShowPopup && infoPopup.geometry &&
                <Popup 
                    longitude={infoPopup.geometry.coordinates[0]} 
                    latitude={infoPopup.geometry.coordinates[1]} 
                    className='mapbox-popup'
                    maxWidth='350px'
                    anchor="bottom"
                    onClose={() => setIsShowPopup(false)}
                >
                    <h4>Tên trường: {infoPopup.properties.tentruong}</h4>
                    <p>Địa chỉ: {infoPopup.properties.diachi}</p>
                    <div className='link-web'>Website: <a href={infoPopup.properties.trangweb}>{infoPopup.properties.trangweb}</a></div>
                </Popup>
            }
            {enrollmentCoords.length &&
                <Marker 
                    longitude={enrollmentCoords[0]} 
                    latitude={enrollmentCoords[1]} 
                    anchor="bottom" 
                    popup={new mapboxgl.Popup().setHTML("<h3>Vị trí tư vấn tuyển sinh</h3>")}
                >
                </Marker>
            }
            {isShowDirections &&
                <Directions 
                    ref={directionRef}
                    mapRef={mapRef} 
                    position='top-left'
                    unit='metric'
                    profile='mapbox/driving'
                    language='vi'
                    placeholderOrigin='Nhập điểm bắt đầu'
                    placeholderDestination='Nhập điểm đi đến'
                    zoom={10}
                    flyTo={false}
                    interactive={false}
                    alternatives={false}
                    congestion={false}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_KEY} 
                />
            }
            <NavigateButton directionRef={directionRef} />
        </Map>
    );
}
 
export default Mapbox;

export const NavigateButton = ({directionRef}) => {
    const [valueAutoComplete, setValueAutoComplete] = useState('')
    const [showAutoComplete, setShowAutoComplete] = useState(false)
    const [isShowGeocoding, setIsShowGeocoding] = useState(false)
    const [listSchool, setListSchool] = useState([])
    const {enrollmentCoords} = useContext(MapContext)
    const {markerSearch} = useContext(MapContext)
    const {mapbox: map} = useMap()
    
    const handleAutoComplete = (e) => {
        const value = e.target.value
        setValueAutoComplete(value)
    }

    const setAutoComplete = useCallback( async (val) => {
        setValueAutoComplete(val)
        setShowAutoComplete(false)
        const objParam = {school: val}
        const params = "?" + new URLSearchParams(objParam).toString()
        const request = await apiGetSchoolName(params)
        const [response] = request
        const schoolCoords = response.json.coordinates
        markerSearch.current && markerSearch.current.remove()
        map.flyTo({center: schoolCoords, zoom: 15, curve: 1, speed: 0.5})
        const schoolMarker = new mapboxgl.Marker()
            .setLngLat(schoolCoords)
            .addTo(map.getMap())
        markerSearch.current = schoolMarker
    }, [map, markerSearch])

    const ListAutoComplete = useMemo(() => {
        const vi_to_en = require('src/utils/convertVi_En')
        if (!showAutoComplete) return []
        return listSchool
            .filter((val) => vi_to_en(val).includes(vi_to_en(valueAutoComplete)))
            .slice(0, 5)
            .map((val) => (<li key={val} onClick={() => setAutoComplete(val)}> <span>{val}</span> </li>))
    }, [showAutoComplete, valueAutoComplete, setAutoComplete, listSchool])

    const getListSchool = useCallback(async () => {
        const request = await apiGetSchoolName()
        const response = request.map((school) => (school.tentruong))
        setListSchool(response)
    }, [setListSchool])

    useEffect(() => {
        isShowGeocoding && getListSchool()
    }, [isShowGeocoding, getListSchool])

    const handleShowDirection = useCallback( async () => {
        setIsShowGeocoding(prev => !prev)
        if (!directionRef.current) return 
        switch (map.hasControl(directionRef.current.directions)) {
            case true:
            map.removeControl(directionRef.current.directions)
            getListSchool()
            break;
            
            case false:
            default:
            map.addControl(directionRef.current.directions, "top-left")
            directionRef.current.directions.actions.setOriginFromCoordinates(enrollmentCoords)
            break;
        }
    }, [directionRef, enrollmentCoords, getListSchool, map])

    return (
        <div className='mapboxgl-ctrl-custom'>
            {isShowGeocoding &&
                <div className='mapboxgl-ctrl-top-left'>
                    <div className='mapboxgl-ctrl mapboxgl-ctrl-group mapboxgl-ctrl-geocoder'>
                        <SearchIcon className='mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-search' />
                        <input type='text' className='mapboxgl-ctrl-geocoder--input' placeholder='Nhập tên trường' 
                            onChange={(e) => handleAutoComplete(e)}
                            onFocus={() => setShowAutoComplete(true)}
                            onBlur={() => setTimeout(() => setShowAutoComplete(false), 150)}
                            value={valueAutoComplete}/>
                        <div className="suggestions-wrapper">
                            <ul className="suggestions">
                                {ListAutoComplete}
                            </ul>
                        </div>
                    </div>
                </div>
            }

            <div className="mapboxgl-ctrl-bottom-right">
                <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                    <button onClick={() => handleShowDirection()}>
                        {isShowGeocoding 
                            ? <DirectionsIcon titleAccess='Chỉ đường' />
                            : <SearchIcon titleAccess='Tìm kiếm' />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}