import React, { useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import classes from "./SearchBox.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../node_modules/swiper/swiper.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

function SearchModal({ query, setQuery, categories, setCategories }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetch(
          `http://localhost/backend/search.php?q=${encodeURIComponent(query)}`
        )
          .then((res) => res.json())
          .then((data) => setCategories(data))
          .catch((err) => console.error(err));
      } else {
        setCategories([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    // Focus the input when modal is shown
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const grouped = categories.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  const BASE_URL = "http://localhost/images/";
  return (
    <>
      <Modal
        show={true}
        onHide={() => setQuery("")}
        dialogClassName={classes["modal-90w"]}
      >
        <Modal.Header closeButton>
          <Modal.Title>جستجو</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="btnGroupAddon">
              <SearchIcon fontSize="medium" />
            </InputGroup.Text>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="جستجو بر اساس عنوان محصول..."
              aria-label="Search"
              aria-describedby="btnGroupAddon"
              className={classes["form-placeholder"]["input-form"]}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>

          {categories.length > 0 ? (
            <>
              {Object.entries(grouped).map(([persianCategory, products]) => (
                <div key={persianCategory}>
                  <Link
                    to={`/${products[0].type}`}
                    onClick={() => setQuery("")}
                    className={classes.searchcategory}
                  >
                    <h5>{persianCategory}</h5>
                  </Link>

                  <Swiper
                    // slidesPerView={6}
                    spaceBetween={5}
                    // loop={true}
                    navigation={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                    // autoplay={true}
                    style={{ height: "280px" }}
                    breakpoints={{
                      425: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 6,
                      },
                    }}
                  >
                    <ul className={classes.searchresultlist}>
                      {products.map((product) => (
                        <SwiperSlide className="d-flex justify-content-center">
                          <li key={product.code}>
                            <Link
                              to={`/products/${product.type}/${product.code}`}
                              onClick={() => setQuery("")}
                              className={classes.serachresultitem}
                            >
                              <img
                                src={`${BASE_URL}${product.src}`}
                                alt=""
                                className={classes.itemimage}
                              />
                              <h6>{product.title}</h6>
                            </Link>
                          </li>
                        </SwiperSlide>
                      ))}
                    </ul>
                  </Swiper>
                </div>
              ))}
            </>
          ) : (
            query.trim() && <p>نتیجه‌ای یافت نشد.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SearchModal;
