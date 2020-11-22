import React from 'react';

export default  ({handleNav}) => {
    return (
        <>
            <div className="navbar-div">
                <div className="navbar-heading" onClick={handleNav}>
                    SkinVision
                </div>

                <div className="collapse navbar-collapse navbar-list" id="bs-example-navbar-collapse-1" style={{"backgroundColor": "transparent", "marginLeft": "700px"}}>
                    <ul className="nav navbar-nav navbar-right" style={{"backgroundColor": "transparent"}}>
                        
                    </ul>
                </div>
            </div>
       </>
    )

}