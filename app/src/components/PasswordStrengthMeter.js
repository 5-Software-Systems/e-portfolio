import React from 'react';
import zxcvbn from 'zxcvbn';
import '../styles/PasswordStrengthMeter.css';

export default function PasswordStrengthMeter(props) {
    const password = props.password;
    const testedResult = zxcvbn(password);

    function createPasswordLabel(result) {
        switch (result.score) {
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
    }
  }

    return (
        <div className="password-strength-meter">
            <progress
                className={`password-strength-meter-progress strength-${createPasswordLabel(testedResult)}`}
                value={testedResult.score}
                max="4"
            />
            <label className="password-strength-meter-label">
                {createPasswordLabel(testedResult)}
            </label>
        </div>
    );
}
