import PropTypes from "prop-types";

const Article = ({ title, content, img, url }) => {
    return (
        <div className="w-full  flex-1 bg-base-200 rounded flex hover:brightness-90 hover:shadow-lg duration-75">
            <div
                className={"h-full w-2/5 lg:w-[25rem] object-fill"}
                style={{ backgroundImage: `url(${img})` }}
            ></div>

            <div className="flex flex-col w-3/5 p-2">
                <h2 className="text-md md:text-xl font-bold">{title}</h2>
                <p className="hidden md:block md:text-xs lg:text-base">
                    {content}
                </p>
                <a
                    className="link link-neutral no-underline hover:font-bold duration-75 mt-auto"
                    target="_blank"
                    href={url}
                    rel="noopener noreferrer"
                >
                    Read more &gt;
                </a>
            </div>
        </div>
    );
};

Article.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Article;
