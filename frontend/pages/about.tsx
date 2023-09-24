import dynamic from 'next/dynamic';
import styles from './index.module.scss'
import React from 'react';


const about: React.FC = () => {
    const text = 'hello world duhhhhhh' 

    return (
        <div>
            {text}
        </div>
    )
}

export default about;