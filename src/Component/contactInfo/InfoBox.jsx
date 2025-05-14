import "./InfoBox.css";
import mapImage from "../../assets/mapImage.jpg";

const InfoBox = () => {
  return (
    <div className="info-container">
      <div className="left-section">
        <div className="left-box">
          <h2 className="oppet">Opening hours</h2>
          <div className="date">
            <p>Weekdays: 10:00-20:00</p>
            
            <p>Saturday-Sunday: 11:00-18:00</p>
           
          </div>
        </div>
        <div className="left-box2">
          <h2 className="besok">Address</h2>
          <div className="address">
            <p>Sörredsvägen 112 2</p>
            <p>418 78 Göteborg</p>
          </div>
        </div>
      </div>

      <div className="right-box">
        <img src={mapImage} alt="map" className="map-img" />
      </div>
    </div>
  );
};

export default InfoBox;
