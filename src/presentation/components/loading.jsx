import React from 'react'
import css from '../styles/loading.scss'

export const LoadingComponent = () => (
    <div className={css.loading}>
        <svg className={css.circular} viewBox="25 25 50 50" >
            <circle className={css.path} cx="50" cy="50" r="20" fill="none" strokeWidth="4" />
        </svg>
    </div>
)