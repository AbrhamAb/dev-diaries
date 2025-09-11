import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SearchResults() {
    const { query } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/posts/?search=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => setResults(data))
            .catch(() => setResults([]));
    }, [query]);

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">Search Results for "<span className="text-primary">{query}</span>"</h2>
            {results.length === 0 ? (
                <div className="alert alert-warning text-center">No results found.</div>
            ) : (
                <div className="row g-4">
                    {results.map(post => (
                        <div className="col-12 col-sm-6 col-lg-4" key={post.id}>
                            <div className="card h-100 shadow-sm border-0 rounded-4">
                                {post.image && (
                                    <img src={post.image} className="card-img-top rounded-top-4" alt={post.title} style={{height: "200px", objectFit: "cover"}} />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text text-truncate">{post.description}</p>
                                    <a href={`/post/${post.slug}`} className="btn btn-outline-primary mt-auto rounded-pill">Read More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;