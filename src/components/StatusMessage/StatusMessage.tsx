import React from 'react';

import './StatusMessage.scss';

interface IProps {
    status: 'error' | 'success';
    message?: string;
    boldText?: boolean;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

function StatusMessage({ status, message, boldText, align, className }: IProps) {
    function getAlignmentCss() {
        switch (align) {
            case 'left':
                return 'justify-content-start';
            case 'center':
                return 'justify-content-center';
            case 'right':
                return 'justify-content-end';
            default:
                return '';
        }
    }
    return (
        <div className='status-message-body'>
            <div className={`${className}`}>
                <div className={`d-flex flex-row icons-message ${getAlignmentCss()}`}>
                    {/* {status === 'error' && (
                        <Icon type="error" size="small" className="mr-2" />
                    )}
                    {status === 'success' && (
                        <Icon type="circleSuccess" size="small" className="mr-2" />
                    )} */}
                    <span
                        className={`text-center ${status === 'error' ? 'errorMsg' : 'successMsg'} ${
                            boldText ? 'font-weight-bold' : ''
                        }`}
                    >
                        {message}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StatusMessage;

StatusMessage.defaultProps = {
    message: '',
    className: '',
    boldText: true,
    align: 'center',
    modal: false,
};
