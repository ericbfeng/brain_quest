

// Will return up to 'numOfRecomendations' users based on the friend graph of us the session user
// Need to edit new friend schema
export default async function ReccomendFriends(numOfRecomendations, user, depthFactor=0.1, maxDepth=3){
    async function fetchUser(user="") {
        let path = `/getfriends/${user}`;
        return fetch(`${path}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.ok) {
                return response.json().then((data) => {
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
    let seen = {user: true};
    let queue = await fetchUser();
    while (queue.length > 0 && maxDepth > level){
        let levelSize = queue.length;
        while (levelSize-- > 0){
          // Get friend from queue of form {usrname:"", state:"", _id:""}
          let friend = queue.shift();
          seen[friend.usrname] = true;
          
          // If friend state is not accepted just continue
          if (friend.state != "accepted") continue;

          // Increment recommendation priority 
          if (friend.usrname in count){
              count[friend.usrname] += (depthFactor ** level);
          } else{
              count[friend.usrname] = (depthFactor ** level);
          }

          // Only add the friend back into the queue if we have not visted them before
          let newElems = await fetchUser(friend.usrname);
          for (let i = 0; i < newElems.length; i++){
            if (!(newElems[i].usrname in seen)){
              queue.push(newElems[i]);
            }
          }
            
        }
        level++;
    }

    // First let us delete any recommendation that the user is already friends with
    let currentFriends = await fetchUser();
    for (let i = 0; i <  currentFriends.length; i++){
      let cFriend = currentFriends[i]
      if (cFriend.state === "accepted" && cFriend.usrname in count){
        delete count[cFriend.usrname];
      }
    }
    if (user in count) delete count[user];

    // Sort the array
    let recomendations = Object.entries(count);
    recomendations.sort(function(a, b){return b[1] - a[1]});
    recomendations = recomendations.map(x => x[0]);
    
    // Make sure to return max numOfRecomendations
    if (recomendations.length > numOfRecomendations) return recomendations.slice(0, numOfRecomendations);

    return recomendations
}   