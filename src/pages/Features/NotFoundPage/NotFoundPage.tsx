import React from 'react';
import imgPageNotFound from '../../../imgs/pageNotFound.jpg';

import './NotFoundPage.scss';

function NotFoundPage() {
    return (
        <div className="unauthorized-container">
            <div className="img-not-found">
                <img src={imgPageNotFound} alt="cat" />
            </div>
        </div>
    );
}

export default NotFoundPage;
