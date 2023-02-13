import React, {useState} from "react";

export default function SearchBar({data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleFilter = (event) => {
        setSearchQuery(event.target.value);
    }

    function getResults() {
        //console.log(data);
        if (searchQuery.length != 0) {
            const filter = data.filter((value) => {
                return value.username.toLowerCase().includes(searchQuery.toLowerCase());
            })
            setFilteredData(filter);
        } else {
            setFilteredData([]);
        }
    }
    return (
        <div className="SearchBar">
            <div className="SearchInput">
                <input type="SearchBar" placeholder="Find a user..." onChange={handleFilter}></input>
            </div>
            <div className="SearchButton">
                <button onClick={getResults}>Search</button>
            </div>
            {filteredData.length!=0 && 
            (
            <div className="SearchResult">
                {filteredData.map((value) => {
                    return <div key={value._id}> {value.username} </div> // TODO: change into <a> tag so that you can link profiles
                })}
            </div>
            )
            }
        </div>
    )
}
