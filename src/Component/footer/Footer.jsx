import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import { NavLink } from 'react-router';
import { faLock } from "@fortawesome/free-solid-svg-icons";



const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

            <section className='footer-section'>
                <div className="footer-heading1">

                    <h4>Summer Toys Heaven</h4>
                    <p className='footer-text'>Your Paradise of Playful Possibilities.</p>
                </div>

                <div className="footer-heading1">
                    <h4>Contact</h4>
                    <p className='footer-text'> summertoys@gmail.se </p>
                    <p className='footer-text'> 031-123000 </p>
                        <section className='footer-font'>
                        
                        <FontAwesomeIcon icon={faInstagram} fontSize={'20'}className='fonts'/>
                        <FontAwesomeIcon icon={faTwitter} className='fonts'/> 
                        <FontAwesomeIcon icon={faFacebook} className='fonts'/>
                        </section> 
                </div>
            </section>
                
            <section className='footer-section'>   
                <div className="footer-heading1">
                    <h4>Address</h4>
                    <p className='footer-text'>Sörredsvägen 112</p>
                    <p className='footer-text'> 418 78 Göteborg</p>
                </div>

                <div className="footer-heading1">
                    <h4>Find us</h4>
                    <p className='footer-text'>You can find us 50meters from the bus stop</p>
                   
                </div>
            </section>
            
                <section className='footer-source'>
                <NavLink className='lock-button' to="/signin">
                    <FontAwesomeIcon icon={faLock} className="lock" />
                    <span className='hover-text'>Admin</span>
                </NavLink>
                    <p className='source'> Developed by Shweta </p>
                </section>
                </div>
        </footer>
    );
}
export default Footer;
