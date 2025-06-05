import React from 'react'

function Button({ text, onClick, className = '' }) {
    return (
        <div>
            <button
                onClick={onClick}
                className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white  transition duration-200 ${className}`}
            >
                {text}
            </button>
        </div>
    )
}

export default Button