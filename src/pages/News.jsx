import { useEffect, useState } from "react";
import Article from "../components/Article";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const News = () => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState(null);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [init, setInit] = useState(true);

    useEffect(() => {
        setLoading(true);
        setArticles(null);

        axios
            .get(
                `https://newsapi.org/v2/everything?q=+chess&searchIn=title&pageSize=3&apiKey=009f843c9303421b9048011b95ccf8c9&page=${page}`
            )
            .then(function (response) {
                // Handle success
                setLoading(false);
                setArticles(response.data.articles);
                setInit(false);
            })
            .catch(function (error) {
                // Handle error
                setLoading(false);
                setError(error.message);
            });
    }, [page]);

    return (
        <div className="h-full w-full p-2 flex flex-col items-center justify-center">
            {articles && (
                <div className="w-full flex-grow flex flex-col gap-3 p-2 max-w-2xl lg:max-w-6xl max-h-[50rem]">
                    {articles.map((article, index) => (
                        <Article
                            key={index}
                            title={article.title}
                            content={article.content}
                            img={article.urlToImage}
                            url={article.url}
                        />
                    ))}
                </div>
            )}

            {loading && (
                <div className="w-full h-full flex items-center justify-center">
                    <BeatLoader />
                </div>
            )}

            {!init && (
                <div className="join w-full flex-grow-0 flex justify-center">
                    <button
                        className="join-item btn"
                        onClick={() => {
                            if (page > 1) {
                                setPage(page - 1);
                            }
                        }}
                    >
                        «
                    </button>
                    <button className="join-item btn">Page {page}</button>
                    <button
                        className="join-item btn"
                        onClick={() => setPage(page + 1)}
                    >
                        »
                    </button>
                </div>
            )}

            {error && <p className="text-xl">{error}</p>}
        </div>
    );
};

export default News;
