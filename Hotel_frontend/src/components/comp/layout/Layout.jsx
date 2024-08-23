import React from 'react'

import Navbar from '../common/Navbar'

import Footer from '../common/Footer'


function Layout() {
    return (
        <div>
            <Head />
            <body>
                <div>
                    <div className="loader loader3">
                        <div className="loader-inner">
                            <div className="spin">
                                <span />
                                <img src="images/logo.svg" alt="Hotel Himara" />
                            </div>
                        </div>
                    </div>
                    <nav id="mobile-menu" />
                </div>
                <div className='wrapper'>
                    <Navbar />
                    <Header />

                    {/**adada */}
                    <Footer />
                </div>
                <div>
                    <div id="contact-notification" className="notification fixed" />
                    <div className="back-to-top">
                        <i className="fa fa-angle-up" aria-hidden="true" />
                    </div>
                </div>
                <Script />
            </body>
        </div>
    )
}

export default Layout
