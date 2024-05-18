import { useState } from "react";
import axios from "axios";

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        const response = await axios.get(`https://rocky-falls-31896-02470e784f64.herokuapp.com/employees/search/?query=${query}`);
        onSearch(response.data)
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
      };

    return (
        <div>
            <input type="text" value={query} onChange={handleChange}></input>
            <button onClick={handleSearch}>Search Positions!</button>
        </div>
    )
}

export default SearchBar