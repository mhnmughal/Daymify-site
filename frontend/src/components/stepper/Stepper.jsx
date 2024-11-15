import React from 'react';
import './stepper.css';

const Stepper = ({ currentStep }) => {
    const steps = ['Cart', 'Checkout', 'Payment'];

    return (
        <div className="stepper-container">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="stepper-step">
                        <div className={`stepper-circle ${currentStep >= index + 1 ? 'active' : ''}`}>
                            {currentStep >= index + 1 && <div className="stepper-fill" />}
                        </div>
                        <div className={`stepper-label ${currentStep >= index + 1 ? 'active-label' : ''}`}>
                            {step}
                        </div>
                    </div>

                    {/* Render line between steps */}
                    {index < steps.length - 1 && (
                        <div className={`stepper-line ${currentStep > index + 1 ? 'completed' : ''}`}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Stepper;
