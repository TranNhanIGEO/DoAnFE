import "./SchoolList.css";
import { useCallback, useContext, useEffect, useState } from "react";
import Offcanvas from "src/components/interfaces/Offcanvas/Offcanvas";
import { MapContext } from "src/contexts/MapContext";
import { apiGetSchoolName } from "src/redux/request/mapRequest";
import { pointSrc } from "../Mapbox/source";
import { useMap } from "react-map-gl";
import mapboxgl from "mapbox-gl";

const SchoolList = () => {
  const { setIsOpenOffCanvasSchoolList } = useContext(MapContext);
  const { isOpenOffCanvasSchoolList } = useContext(MapContext);
  const [schoolList, setSchoolList] = useState({});
  const [thisSchool, setThisSchool] = useState();
  const { mapbox: map } = useMap();

  const handleCloseOffCanvas = () => {
    setIsOpenOffCanvasSchoolList(false);
  };

  const getListSchool = async () => {
    const request = await apiGetSchoolName();
    const response = pointSrc({
      name: "schools",
      data: request,
      attributes: ["tentruong", "diachi", "trangweb"],
    });
    setSchoolList(response.data);
  };

  useEffect(() => {
    getListSchool();
  }, []);

  useEffect(() => {
    if (!map) return;
    map.on("load", () => {
      map.loadImage("/imgs/icon-school.png", (error, image) => {
        if (error) throw error;
        map.addImage("icon-school", image);
        map.getMap()?.addLayer({
          id: "allschool",
          type: "symbol",
          source: {
            type: "geojson",
            data: schoolList,
          },
          layout: {
            "icon-image": "icon-school",
            "icon-size": 0.5,
          },
        });
      });
    });
  }, [map, schoolList]);

  const showPopup = useCallback((coords) => {
    const [popUps] = document.getElementsByClassName("mapboxgl-popup");
    if (popUps) popUps.remove();
    new mapboxgl.Popup({
      closeOnClick: false,
      focusAfterOpen: false,
      anchor: "top",
      className: "school-popup",
    })
      .setLngLat(coords)
      .setHTML(`<h3>Hello</h3>`)
      .addTo(map.getMap());
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["allschool"],
      });
      if (!features.length) return;
      const pointName = features[0].properties.tentruong;
      const pointCoords = features[0].geometry.coordinates;
      setThisSchool(pointName);
      showPopup(pointCoords)
    });
  });

  const handleFlyToSchool = (coords) => {
    map.flyTo({
      center: coords,
      zoom: 15,
    });
    showPopup(coords)
  };

  const handleClickSchool = (name) => {
    setThisSchool(name);
  };

  return (
    <Offcanvas
      isOpen={isOpenOffCanvasSchoolList}
      onClose={() => setIsOpenOffCanvasSchoolList(false)}
      position={"bottomleft"}
      size={{ height: "50vh", width: "30vw" }}
      style={{ overflowY: "auto" }}
    >
      <Offcanvas.Header onClick={() => handleCloseOffCanvas()}>
        Danh sách trường học
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="schoollist">
          {schoolList?.features?.map((school, index) => (
            <div
              key={index}
              className={`schoollist-item ${
                school.properties.tentruong === thisSchool ? "active" : ""
              }`}
              onClick={() => handleClickSchool(school.properties.tentruong)}
            >
              <div
                className="schoollist-title"
                onClick={() => handleFlyToSchool(school.geometry.coordinates)}
              >
                {school.properties.tentruong}
              </div>
            </div>
          ))}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SchoolList;
