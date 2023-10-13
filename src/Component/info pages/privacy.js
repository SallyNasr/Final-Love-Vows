//rfce
import React from 'react'
import Navigationbar from '../Navigationbar';
import Footer from '../Footer';
import ban2 from '../../images/bannner2.png'
import backg from '../../images/background1.jpg'
const Privacy = () => {
  const PStyle = {
    minHeight: " 100vh",
    backgroundImage: `url(${backg})`,
    backgroundRepeat: 'none',
    backgroundSize: '100%',
  };

  return (
    <div>
      <Navigationbar />
      <div>
        <img src={ban2} alt='banner-image1' style={{ position: "relative" }} height='65px' width='100%' />
      </div>
      <div style={PStyle}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          listStyle: 'inside',
          width: '50%',
          margin: '0 auto', // Center horizontally
        }}>
          <h1>Privacy Policy</h1>
          <div>
            <ol>
              <li><h3>Introduction</h3>
                <p>
                  Welcome to Love & Vows ("we," "us," or "our"). We are committed to protecting your privacy and handling your personal information with care. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                </p>
              </li>
              <li>
                <h3>Information We Collect</h3>
                <p>
                  We may collect the following types of information:
                </p>
                <ul >
                  <li>Personal Information: This includes information such as your name, email address, and any other information you provide when you contact us or sign up for our newsletter.</li>
                  <li>Log Data: When you visit our website, our servers may automatically record information, including your IP address, browser type, and operating system.</li>
                  <li>Cookies: We may use cookies and similar tracking technologies to collect information about your browsing behavior.</li>
                </ul>
              </li>
              <li>
                <h3>How We Use Your Information</h3>
                <p>
                  We may use the information we collect for various purposes, including:
                </p>
                <ul>
                  <li>To provide, maintain, and improve our website and services.</li>
                  <li>To send you updates, newsletters, and promotional materials if you have subscribed to our mailing list.</li>
                  <li>To respond to your inquiries and provide customer support.</li>
                </ul>
              </li>
              <li>
                <h3>Sharing Your Information</h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following situations:
                </p>
                <ul>
                  <li>To trusted third-party service providers who help us operate our website and provide services.</li>
                  <li>When we believe it is necessary to comply with applicable laws, regulations, or legal processes.</li>
                </ul>
              </li>
              <li>
                <h3>Your Choices</h3>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access, correct, or delete your personal information.</li>
                  <li>Opt-out of receiving marketing emails by following the instructions in our emails.</li>
                </ul>
              </li>
              <li>
                <h3>Security</h3>
                <p>
                  We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction.
                </p>
              </li>
              <li>   <h3>Links to Other Websites</h3>
                <p>
                  Our website may contain links to other websites not operated by us. We are not responsible for the privacy practices of these third-party websites.
                </p>
              </li>
              <li>
                <h3>Changes to this Privacy Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. The date of the most recent revision will be indicated at the top of this page.
                </p>
              </li>
              <li>
                <h3>Contact Us</h3>
                <p>
                  If you have any questions or concerns about our Privacy Policy, please contact us at LoveAndVows@gmail.com.
                </p>
              </li></ol>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}


export default Privacy;