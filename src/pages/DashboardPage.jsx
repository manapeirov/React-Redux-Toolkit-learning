import React from 'react'
import { Link } from 'react-router-dom'

const DashboardPage = () => (
    <section className='dashboard'>
        <h1>Dashboard</h1>
        <p>This is Mana's dashboard</p>
        <Link to='/posts' className='button'>
            View Posts
        </Link>
    </section>
)

export default DashboardPage