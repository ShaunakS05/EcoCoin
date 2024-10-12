import React from 'react';
import PropTypes from 'prop-types';

const Investment = ({ goal, title, subtitle, description, timeline }) => {
    return (
        <div className="investment">
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{description}</p>
            <p>Goal: {goal}</p>
            <p>Timeline: {timeline}</p>
        </div>
    );
};

Investment.propTypes = {
    goal: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timeline: PropTypes.string.isRequired,
};

export default Investment;