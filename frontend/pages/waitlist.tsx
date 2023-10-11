import React, { useState } from 'react';
import styles from './waitlist.module.scss';

const Waitlist: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className={styles.waitlistContainer}>
            <div className={styles.waitlistBody}>
                <div className={styles.waitlistHeader}>
                    <h1>Strong Vision Initial Product Launch</h1>
                    <h2>Join the waitlist for priority access</h2>
                </div>
                <form className={styles.userInputForm} onSubmit={handleSubmit}>
                    <fieldset className={styles.waitlistFieldset}>
                        <input 
                            type="text" 
                            name="firstname" 
                            className={styles.waitlistInput} 
                            placeholder='First name *'
                            onChange={handleInputChange}
                        />
                        {isSubmitted && !formData.firstname && 
                            <p className={styles.waitlistError}>First name is required</p>
                        }
                    </fieldset>

                    <fieldset className={styles.waitlistFieldset}>
                        <input 
                            type="text" 
                            name="lastname" 
                            className={styles.waitlistInput} 
                            placeholder='Last name *'
                            onChange={handleInputChange}
                        />
                        {isSubmitted && !formData.lastname && 
                            <p className={styles.waitlistError}>Last name is required</p>
                        }
                    </fieldset>

                    <fieldset className={styles.waitlistFieldset}>
                        <input 
                            type="text" 
                            name="email" 
                            className={styles.waitlistInput} 
                            placeholder='Email *'
                            onChange={handleInputChange}
                        />
                        {isSubmitted && !formData.email && 
                            <p className={styles.waitlistError}>Email is required</p>
                        }
                    </fieldset>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Waitlist;
