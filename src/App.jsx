import React, { useEffect, useState } from "react";
import Countries from "./components/Countries";
import "./App.css";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [filterContinent, setFilterContinent] = useState("");
	const [filterSubregion, setFilterSubregion] = useState("");
	const [sortCriteria, setSortCriteria] = useState("alphabetical");
	const [top10Criteria, setTop10Criteria] = useState(null);

	useEffect(() => {
		fetch("https://restcountries.com/v3.1/all")
			.then((response) => response.json())
			.then((data) => {
				setCountries(data);
				setFilteredCountries(data);
			});
	}, []);

	const filterCountries = () => {
		let data = [...countries];

		if (filterContinent) {
			data = data.filter((country) =>
				country.continents.includes(filterContinent)
			);
			setFilterSubregion("");
		}
		if (filterSubregion) {
			data = data.filter((country) => country.subregion === filterSubregion);
			setFilterContinent("");
		}

		if (top10Criteria) {
			data = data
				.sort((a, b) =>
					top10Criteria === "population"
						? b.population - a.population
						: b.area - a.area
				)
				.slice(0, 10);
		}

		if (sortCriteria === "alphabetical") {
			data.sort((a, b) => a.name.common.localeCompare(b.name.common));
		}

		setFilteredCountries(data);
	};

	useEffect(() => {
		filterCountries();
	}, [filterContinent, filterSubregion, sortCriteria, top10Criteria]);

	return (
		<div>
			<h1>Countries of the World</h1>

			<div className="filters-container">
				<div className="filter-item">
					<label>Filter by Continent:</label>
					<select
						onChange={(e) => setFilterContinent(e.target.value)}
						value={filterContinent}
					>
						<option value="">All</option>
						<option value="Asia">Asia</option>
						<option value="Africa">Africa</option>
						<option value="Europe">Europe</option>
						<option value="Oceania">Oceania</option>
						<option value="Americas">Americas</option>
					</select>
				</div>

				<div className="filter-item">
					<label>Filter by Subregion:</label>
					<select
						onChange={(e) => setFilterSubregion(e.target.value)}
						value={filterSubregion}
					>
						<option value="">All</option>
						<option value="Southern Asia">Southern Asia</option>
						<option value="Northern Europe">Northern Europe</option>
						<option value="Polynesia">Polynesia</option>
						<option value="Middle Africa">Middle Africa</option>
						<option value="Caribbean">Caribbean</option>
					</select>
				</div>

				<div className="filter-item">
					<label>Top 10 by:</label>
					<select
						onChange={(e) => setTop10Criteria(e.target.value)}
						value={top10Criteria}
					>
						<option value="">None</option>
						<option value="population">Population</option>
						<option value="area">Area</option>
					</select>
				</div>

				<div className="filter-item">
					<label>Sort:</label>
					<select
						onChange={(e) => setSortCriteria(e.target.value)}
						value={sortCriteria}
					>
						<option value="alphabetical">Alphabetically</option>
					</select>
				</div>
			</div>

			<Countries countries={filteredCountries} />
		</div>
	);
};

export default App;
