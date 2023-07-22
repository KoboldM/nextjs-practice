var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`

var query2 = `
    query ($name: String, $isModerator: Boolean!) {
        User (name: $name, isModerator: $isModerator!) {
            name
            isModerator
        }
    }
`

// var query2 = `
//     query ($name: String) {
//         User (name: $name) {
//             name
//         }
//     }
// `

var variables = {
    id: 15125
};

var variables2 = {
    name: 'KoboldM',
    isModerator: 'false',
}

var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query2,
            variables: variables2
        })
    };


export default async function AnimeList() {
    const { data } = await fetch(url, options)
    .then(data => data.json())
    .catch(error =>{
        console.log(error)
    })

    console.log('data: ', data)

    return(
        <div>
            {/* {data.Media.id}
            {data.Media.title.romaji}
            {data.Media.title.english}
            {data.Media.title.native} */}
            return main div
        </div>
    )
}