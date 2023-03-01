

// Will return up to 'numOfRecomendations' users based on the friend graph of us the session user
// Need to edit new friend schema
export default async function ReccomendFriends(numOfRecomendations, depthFactor=0.1, maxDepth=3){
    async function fetchUser(user="") {
        let path = `/getfriends`;
        if (user != "") path += `:${user}`;
        return fetch(`${path}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json().then((data) => {
                    console.log(data);
                    return data;
                });
              } else {
                throw new Error("Failed to retrieve friends");
              }
            })
            .catch((error) => {
              console.error(error);
            });
    }

    let level = 0;
    let count = {};
    let queue = await fetchUser();
    while (queue.length > 0 && maxDepth > level){
        let levelSize = queue.length;
        while (levelSize-- > 0){
            let friend = queue.shift();
            for (let friendOfFriend in friend){
                if (friendOfFriend._id in count){
                    count[friendOfFriend._id] += (depthFactor ** level);
                } else{
                    count[friendOfFriend._id] = (depthFactor ** level);
                }
                let newElems = await fetchUser(friendOfFriend.ursname);
                queue.push(newElems);
            }
        }
        level++;
    }

    let recomendations = Object.entries(count);
    recomendations.sort(function(a, b){return b[1] - a[1]});
    if (recomendations.length === 0){
        return [{
            "_id": undefined,
            "username": "No recommendations"
        }]
    } 
    
    // Add usernames to output
    let friendRecommendations = []
    for(let i = 0; i < numOfRecomendations; i++){
        if(i >= recomendations.length) break;
        let user = recomendations[i][0];
        let username = await fetch(`/userById/:${user}`)
        friendRecommendations.append({
            "_id": user,
            "usrname": username
        });
    }

    return friendRecommendations
}   