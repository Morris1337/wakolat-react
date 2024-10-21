import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./TrendingArea.scss";
import './TrendingAreaComponents/TrendingAreaComponents.css';

const TrendingArea = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        async function get_news() {
            const url = "http://164.92.147.233:8020/api/get_news";
            const count = 10; // количество постов, которые вы хотите получить
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ count }) // передаем параметр count
            });
            const data = await response.json();
            console.log(data);
            setNews(data);
        }
        get_news();
    }, []);

    return (
        <>
            {/* Trending Area Start */}
            <div className="trending-area fix">
                <div className="container">
                    <div className="trending-main">
                        <div className="row trend-center">
                            <div className="trend-center-size">
                                {news.slice(0, 1).map((obj) =>  
                                    <div key={obj["id"]} className="trending-top mb-30">
                                        <div className="trend-top-img">
                                            <img 
                                                src={"http://164.92.147.233:8020/upload/" + obj["image"]} 
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
                                                        src={"http://164.92.147.233:8020/upload/" + obj["image"]} 
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
                                                <img src={"http://164.92.147.233:8020/upload/" + obj["image"]} alt="img"/>
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
