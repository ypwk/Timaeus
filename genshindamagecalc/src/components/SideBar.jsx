import React from 'react';

import {Link, Outlet} from 'react-router-dom';

class SideBar extends React.Component{
    render(){
        return (
            <div className="navigation">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="container">
                <Link className="navbar-brand" to="/">
                  Timaeus
                </Link>
                <div>
                  <ul className="navbar-nav ml-auto">
                    <li>
                      <Link className="nav-link" to="/character/">
                        Character
                      </Link>
                      <Outlet />
                    </li>
                    <li
                    >
                      <Link className="nav-link" to="/artifact/">
                        Artifact
                      </Link>
                    </li>
                    <li
                    >
                      <Link className="nav-link" to="/environment/">
                        Environment
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>);
    }
}

export default SideBar;