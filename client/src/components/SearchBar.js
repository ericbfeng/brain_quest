import React, {useState} from "react";
import Box from '@mui/material/Box';
import '../styles/SearchBar.css';
import {Link} from "react-router-dom";
import { Typography } from '@mui/material';
import { Button } from "@mui/material";

export default function SearchBar({data, filterBy, page}) {
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

    // When a user is clicked on profile page add them as a friend
    async function addFriend(event, setAddButton){
        const friendName = event.target.value;


        // Call API
        const data = { friendName };
        try {
          const response = await fetch("/friends", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
      
          const responseData = await response.json();
          setAddButton("Sent");
          console.log(responseData);
        } catch(e) {
          console.error(e);
        }
    }

    // If we are using the search bar for the profile page render it slightly differently
    function UserLink(props){
        const [addbutton, setAddbutton] = useState("Add");
        if (props.page === "profile"){
            return (
                <>
                <Box ml={2.5}>
                    <Typography align="left">{props.value[filterBy]}</Typography>
                </Box>
                <Button key={props.value._id} value={props.value[filterBy]} onClick={(e) => addFriend(e, setAddbutton)}> {addbutton} </Button>
                </>
            );
        }

        return (<div key={props.value._id} className="search-result"> <Link to={"/profilepage/" + props.value.username}>{props.value[filterBy]}</Link> </div>);
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
                    if(filterBy === "username") {
                        return <UserLink value={value} page={page} key={value._id} className="search-result"></UserLink> 
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
