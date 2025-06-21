import React from 'react'

export default function DeleteModal(
    {
        isOpen,
        onClose,
        onConfirm,
        title,
        description
    }
) {
    if (!isOpen) return null
    return (
        <div className='fixed inset-0 bg-blue bg-opcatity-80
            flex items-center justify-center z-50'>
            <div className='bg-blue p-10 w-[500px]'>
                <h2>{title}</h2>
                <p>{description}</p>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onConfirm}>Delete</button>
            </div>

        </div>
    )
}
