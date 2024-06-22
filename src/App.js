import React, { useEffect, useState } from "react";
import "./index.css"
import './App.css';
import fetchArticles from "./Components/News";
import Filter from "./Components/Filter";
import Pagination from "./Components/Pagination";

const App = () => {
  const [newsData, setNewsData] = useState([]);
  const [category, setCategory] = useState('general')
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const placeholderImage = 'https://picsum.photos/300';



  useEffect(() => {
    const getdata = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchArticles(category, page)
        setNewsData(data.articles)
        setTotalPages(Math.ceil(data.totalResults / 10));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }
    getdata()
  }, [category, page])


  const handleChangeCategory = (newCategory) => {
    setCategory(newCategory);
    setPage(1)
  }
  return (
    <>
      <div className="app">
        <h1>News Articles</h1>
        <Filter selectedCategory={category} onSelectCategory={handleChangeCategory} />
        <div className="container mt-5 news_container">
          <div className="row">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && newsData.length > 0 ? (
              newsData.map((val) => {
                return (
                  <div className="col-lg-4 my-3" >
                    <div className="card" style={{ width: "300px;", height: "550px" }} >
                      <img src={val.image} className="card-img-top" alt={val.title} />
                      <div className="card-body">
                        <h5 className="card-title">{val.title}</h5>
                        <p className="card-text">{val.description}</p>
                        <a href={val.url} className="btn text-primary"> Read More.. </a>
                      </div>
                    </div>
                  </div>
                )

              })
            ) : (!loading && !error && <p>No articles found</p>)
            }
          </div>
        </div >
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>



    </>
  )

}
export default App;
