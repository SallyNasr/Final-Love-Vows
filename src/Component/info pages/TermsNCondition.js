import React from "react";
import Navigationbar from "../Navigationbar";
import Footer from "../Footer";
import ban2 from "../../images/bannner2.png";
import "../../colors.css";
import backg from "../../images/background1.jpg";

const TermsAndConditions = () => {

  const TCStyle = {
    minHeight: " 100vh",
    backgroundImage: `url(${backg})`,
    backgroundRepeat: 'none',
    backgroundSize: '100%',
    
  };

  return (
    //bda tozbeer
    <div>
      <Navigationbar />
      <div >
        <img
          src={ban2}
          alt="banner-images"
          style={{ position: "relative" }}
          height="65px"
          width="100%"
        />
      </div>
      <div style={TCStyle}>
        <h2
          style={{
            fontFamily: "var(--title-font)",
            textAlign: "center",
          }}
        >
          Terms and Conditions
        </h2>
        <div
          style={{
            fontFamily: "var(--text-font)",
            fontSize: "14px",
            textAlign: "center",
            width: "60%",
            marginLeft: "18%",
          }}
        >
          <h4>1. Introduction</h4>
          <p>
            These Terms and Conditions ("Agreement") govern the use of your
            website ("Website") and any related services provided by [Your
            Company Name] ("Company," "we," "us," or "our"). By accessing and
            using the Website, you agree to comply with and be bound by these
            Terms and Conditions. If you do not agree with these Terms and
            Conditions, you must not use the Website.
          </p>

          <h4>2. Intellectual Property</h4>
          <p>
            All content on the Website, including text, graphics, logos, images,
            audio clips, digital downloads, data compilations, and software, is
            the property of the Company or its content suppliers and is
            protected by international copyright laws. You may not reproduce,
            distribute, modify, create derivative works of, publicly display,
            publicly perform, republish, download, store, or transmit any of the
            material on the Website without the prior written consent of the
            Company.
          </p>

          <h4>3. User Accounts </h4>
          <p>
            Some features of the Website may require you to create a user
            account. You are responsible for maintaining the confidentiality of
            your account information, including your username and password. You
            agree to accept responsibility for all activities that occur under
            your account.
          </p>
          <h4>4. Acceptable Use </h4>
          <p>
            You agree not to use the Website for any unlawful purpose or any
            purpose prohibited by these Terms and Conditions. You further agree
            not to use the Website in any way that may damage, disable,
            overburden, or impair the Website or interfere with any other
            party's use and enjoyment of the Website.
          </p>
          <h4>5. Disclaimer of Warranties </h4>
          <p>
            The Website is provided "as is" and "as available," without any
            warranties of any kind, either express or implied. The Company does
            not warrant that the Website will be uninterrupted or error-free,
            nor does it make any warranties as to the accuracy, completeness,
            reliability, or fitness for a particular purpose of the content on
            the Website.
          </p>
          <h4>6. Limitation of Liability </h4>
          <p>
            In no event shall the Company, its affiliates, officers, directors,
            employees, agents, or licensors be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out
            of or relating to your use of the Website.
          </p>
          <h4>7. Indemnification </h4>
          <p>
            You agree to indemnify and hold the Company, its officers,
            directors, employees, agents, and affiliates harmless from any
            claims, liabilities, damages, losses, or expenses, including
            reasonable attorneys' fees, arising out of or in connection with
            your use of the Website.
          </p>
          <h4>8. Governing Law </h4>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of lebanon, without regard to its
            conflict of law principles.
          </p>
          <h4>9. Changes to Terms and Conditions </h4>
          <p>
            The Company reserves the right to modify or revise these Terms and
            Conditions at any time. Your continued use of the Website after any
            changes to these Terms and Conditions are posted will be considered
            acceptance of those changes.
          </p>

          <h4>10. Contact Information</h4>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at LoveAndVows@gmail.com.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
