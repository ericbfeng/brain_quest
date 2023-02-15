import React, {useState} from "react";
import '../styles/SearchBar.css';

export default function SearchBar({data, filterBy}) {
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleFilter = (event) => {
        setSearchQuery(event.target.value);
    }

    function getResults() {
        //console.log(data);
        if (searchQuery.length !== 0) {
            const filter = data.filter((value) => {
                return value[filterBy].toLowerCase().includes(searchQuery.toLowerCase());
            })
            setFilteredData(filter);
        } else {
            setFilteredData([]);
        }
    }
    return (
        <div>
            <div>
                <input type="SearchBar" className="search-bar" placeholder="Find a user..." onChange={handleFilter}></input>
                <button className="search-bar-button" onClick={getResults} >Search</button>
            </div>
            {filteredData.length !== 0 && 
            (
            <div>
                {filteredData.map((value) => {
                    return <div key={value._id} className="search-result"> {value[filterBy]} </div> // TODO: change into <a> tag so that you can link profiles
                })}
            </div>
            )
            }
        </div>
    )
}
