import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
function toTitleCase(slug) {
  if (!slug) return ''; // Prevents .split() on undefined
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const Header = () => {
  const { company, station } = useParams();

  const companyName = toTitleCase(company);
  const stationName = toTitleCase(station);
const domainName = window.location.hostname;
 
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Schedule Dashboard</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href={`${process.env.PUBLIC_URL}/scss/style.css`}
        />
         <script src={`${process.env.PUBLIC_URL}/js/script.js`}></script>
      </Helmet>

        {/* You can add header-related content here if needed */}
         <header className="top-bar">
        <div className="top-bar-row">
          <nav className="breadcrumb-list" aria-label="breadcrumb">
            <ol className="breadcrumb">
                            <li className="breadcrumb-menu" aria-current="page"><a href={domainName ==='localhost'?'/': `/fleetwage`}>Schedule </a></li>
                            {companyName && (<li className="breadcrumb-arrow"><i className="fas fa-chevron-right"></i></li>)}
                            
                            <li className="breadcrumb-menu active" aria-current="page">{companyName && (<a href={domainName ==='localhost'?'/': `/fleetwage`}> {companyName ? `${companyName}` : ''   }  { stationName ? `/ ${stationName}` : ''} </a>)}
                            </li>
                        </ol>
          </nav>
          <div className="user-avatar">
            <div className="notification">
              <a href="#">
                <i className="fa-regular fa-bell"></i>
                <span className="notification-number">2</span>
              </a>
            </div>
            <div className="profile-col">
              <a href="#">
                <img src={`${process.env.PUBLIC_URL}/images/vazgen avakyan.png`} alt="User"/>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
