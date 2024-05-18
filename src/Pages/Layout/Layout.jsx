import { Outlet, Link } from "react-router-dom";

import "./Layout.css";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useState } from "react";

const Layout = () => {
  const [searchResults, setSearchResults] = useState([]);

const handleSearch = (results) => {
  setSearchResults(results);
}


  return (<div className="Layout">
    <nav>
      <SearchBar onSearch={handleSearch} />
      <ul>
        <li className="grow">
          <Link to="/">Scrambled Science</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Add Scientist</button>
          </Link>
        </li>
      </ul>
    </nav>
    <div>
      <h1>
        Are you an interdisciplinary scientist?
      </h1>
      <h2>
        Test your knowledge!
      </h2>
      <h2>
        Correct the list below and feel free to add your own favourites to the list!
      </h2>
      <ul>
        {console.log(searchResults)}
        {searchResults.map((result) => {
          return <li key={result._id}>{result.name} - {result.position} - {result.level}</li>
        })}
      </ul>
    </div>
    <Outlet />
  </div>)
};

export default Layout;
