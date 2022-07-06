import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
function Detail() {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const getMovie = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);

        console.log(json);
    };
    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            {loading ? (<h1>Loading...</h1>) : (
                <div>
                    <img src={movie.large_cover_image} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.description_full}</p>
                <ul>
                    {movie.genres !== undefined && movie.genres.map((g, idx) => <li key={idx}>{g}</li>)}
                </ul>
                {movie.torrents !== undefined &&
                    movie.torrents.map((t, idx) => (
                    <div key={idx}>
                        <a href={t.url}>Torrent Link({t.quality}) #{idx + 1}</a>
                    </div>
                    ))}
                </div>
            )}

        </div>
    );
}
export default Detail;