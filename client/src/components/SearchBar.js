import React, {useState} from "react";
import '../styles/SearchBar.css';
import {Link} from "react-router-dom";

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
                    if(filterBy == "username") {
                        return <div key={value._id} className="search-result"> <Link to={"/profilepage/" + value.username}>{value[filterBy]}</Link> </div> 
                    } else {
                        return <div key={value._id} className="search-result"> {value[filterBy]} </div> 
                    }
                })}
            </div>
            )
            }
        </div>
    )
}
