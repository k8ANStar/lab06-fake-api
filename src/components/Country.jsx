import React from "react";

const Country = ({ country }) => {
	const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${country.latlng[0]},${country.latlng[1]}`;

	return (
		<div className="country-card">
			<img src={country.flags.svg} alt={`${country.name.common} flag`} />
			<h3>{country.name.common}</h3>
			<p>
				<strong>Capital:</strong> {country.capital}
			</p>
			<p>
				<strong>Population:</strong> {country.population.toLocaleString()}
			</p>
			<p>
				<strong>Area:</strong> {country.area.toLocaleString()} km²
			</p>
			<p>
				<strong>Continent:</strong> {country.continents.join(", ")}
			</p>
			<p>
				<strong>Subregion:</strong> {country.subregion}
			</p>
			<a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
				View on Google Maps
			</a>
		</div>
	);
};

export default Country;
