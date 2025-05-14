import React from "react";
import "./Home.css";
import { NavLink } from "react-router";

function Home() {
  return (
    <section className="home-page">
      <img
        src="https://media.istockphoto.com/id/509423868/sv/foto/sand-castle-on-tropical-beach-family-vacation.jpg?s=612x612&w=0&k=20&c=ncZPz-Xh_7n209ys3Q8iGGmqf5CxagDEE7_P5Kdc2Mc="
        alt=""
      />
      <div className="welcome-text">
        <h1>Welcome to Summer Toys Heaven</h1>
        <p>

Brighten your summer with fun! Beach toys, water games, kites & more – safe, colorful, and ready to play.

We deliver fast with great quality.

        </p>
        <NavLink className="primary-button" to="/menu">
          Go to products
        </NavLink>
      </div>
    </section>
  );
}

export default Home;
