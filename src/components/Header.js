import React, { Component, PropTypes } from 'react';

class Header extends Component {
  render() {
    return <header className="intro-header" style={this.props.bgStyle}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div className={this.props.headerClass}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    </header>;
  }
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  bgStyle: PropTypes.object,
  headerClass: PropTypes.string,
};

Header.defaultProps = {
  bgStyle: {backgroundImage: "url('/img/home-bg.jpg')"},
  headerClass: 'site-heading',
};

export default Header;
