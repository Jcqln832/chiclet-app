import React from 'react'
import { Link } from 'react-router-dom';
import './landing.css'
import '../months/months.css'

export default function Landing(props) {

    return (
        <div className="container--grid">

            <section className="container--intro">
                <div className="intro">
                    <h3>How to use Chiclet</h3>
                    <p>This app allows you to plan and keep track of your year by month. Add special events, goal deadlines, or focus themes to the months and the app provides a view your plans for the entire year. Alternatively, the app can be used as an accomplishment record keeper rather than a planner of future milestones. Either way, you have an interactive bird's eye view of the year.
                    </p>
                    <ul>
                        <li>Log out and view options in the top right.</li>
                        <li>Click on a month to view just that month.</li>
                        <li>In the single month view, you can add items to the month.</li>
                        <li>Click the edit icon to the left of an item to edit, complete, or delete the item</li>
                        <li><em>Experience the app through the demo account:</em>
                            <ul>
                                <li>User Name: HarryP</li>
                                <li>Password: fluffy</li>
                            </ul>
                        </li>
                    </ul>
                    <div className="container--btn">
                    <Link to="/register" className="btn">Register</Link>
                    <Link to="/login" className="btn" >Log In</Link>
                    </div>  
                </div>
            </section>  

            <section className="container--month">
                <div className="month">
                    <h2 className="month__title">January</h2>
                    <ul>
                    <li>Jennifer & Kyle Wedding (14th)</li>
                    <li>Try new recipes</li>
                    <li>Start book 1</li>
                    </ul>
                </div>  
            </section>
            
            <section className="container--month">
                <div className="month">
                    <h2 className="month__title">February</h2>
                    <ul>
                    <li>Career Conference (18th & 19th)</li>
                    <li>Reach new fitness goal</li>
                    <li>Finish book 1</li>
                    </ul>
                </div>  
            </section>

            <section className="container--month">
                <div className="month">
                    <h2 className="month__title">March</h2>
                    <ul>
                    <li>Family Visiting (5th - 8th)</li>
                    <li>Start book 2</li>
                    <li>Spring Cleaning</li>
                    </ul>
                </div>    
            </section>
        </div>
    )
}