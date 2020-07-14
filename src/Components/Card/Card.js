import React from 'react';
import styles from './Card.module.css';

function Card(){

    return (
        <div className={styles.cardContainer}>
            <h3>Hello,This is card</h3>
        </div>
    );
}

export default Card;