import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./TrendingArea.scss";
import './TrendingAreaComponents/TrendingAreaComponents.css';

const TrendingArea = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        async function get_news() {
            try {
                const response = await fetch("https://myproject123.zapto.org/api/news");
                if (!response.ok) throw new Error("Ошибка HTTP: " + response.status);
                const data = await response.json();
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNews(data);
            } catch (err) {
                console.error("❌ Ошибка при загрузке новостей:", err.message);
            }
        }
        get_news();
    }, []);
    

    return (
        <>
            {/* Trending Area Start */}
            <div className="trending-area fix">
                <div className="">
                    <div className="trending-main">
                        <div className="row trend-center">
                            <div className="trend-center-size">
                                {news.slice(0, 1).map((obj) =>  
                                    <div key={obj["id"]} className="trending-top mb-30">
                                        <div className="trend-top-img">
                                            <img 
                                                src={"https://myproject123.zapto.org/upload/" + obj["image"]} 
                                                alt=""
                                                className='top-img'
                                            />
                                            <div className="trend-top-cap">
                                                <span>News</span>
                                                <Link to={`/PublicatePosts/${obj.id}`}>
                                                    <h2>{obj["header"]}</h2>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="trend-block-bottom">
                                    {news.slice(1, 4).map((obj) =>  
                                        <div className="row" key={obj["id"]}>
                                            <div className="single-bottom mb-35">
                                                <div className="trend-bottom-img mb-30">
                                                    <img 
                                                        src={"https://myproject123.zapto.org/upload/" + obj["image"]} 
                                                        alt="img"
                                                        className='bottom-img'
                                                    />
                                                </div>
                                                <div className="trend-bottom-cap">
                                                    <h4>
                                                        <Link to={`/PublicatePosts/${obj.id}`}>{obj.header}</Link>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-1 trend-right-blocks">
                                {news.slice(4, 9).map((obj) => 
                                    <div key={obj["id"]}>
                                        <div className="trand-right-single d-flex">
                                            <div className="trand-right-img">
                                                <img src={"https://myproject123.zapto.org/upload/" + obj["image"]} alt="img"/>
                                            </div>
                                            <div className="trand-right-cap">
                                                <Link to={`/PublicatePosts/${obj.id}`}>{obj.header}</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrendingArea;
