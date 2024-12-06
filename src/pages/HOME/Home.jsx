import styles from "./home.module.css";
import logo from "./imgs/izemak.jpeg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../COMPONENTS/LOADER/Loader";
// icons
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
export default function Home() {
  const navigate = useNavigate();
  let [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loader, setLoader] = useState(true);
  let [searchValue, setSearchValue] = useState("");
 

  let getData = () => {
    const token = localStorage.getItem("token");
    setLoader(true);
    if (token) {
      fetch(
        `https://www.izemak.com/azimak/public/api/parties?page=${pageNumber}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.data);
          setTotalPages(res.meta.last_page);
          setLoader(false);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must log in",
      });
      navigate("/");
    }
  };
  useEffect(getData, [pageNumber]);
  return (
    <>
      {loader === true ? (
        <Loader />
      ) : (
        <>
          {/* <div className="floating">
            <Link to="/add" className={`floating_icon center`}>
              <FaPlus className={` icon`} />
            </Link>
          </div> */}

          <div>
            <div className={`header_container`}>
              <Link to="/home" className={`img center`}>
                <img src={logo} alt="logo not found" />
              </Link>
              <div className={` search`}>
                <label className={`search_label`}>
                  <input
                    type="text"
                    placeholder="ادخل اسم الحفلة"
                    onChange={(e) => {
                      let value = e.target.value;
                      setSearchValue(e.target.value);
                      if (value === "") {
                        getData();
                      }
                    }}
                  />
                  <span>
                    <IoSearch />
                  </span>
                </label>
                <button
                  onClick={() => {
                    if (searchValue.length > 3) {
                      if (searchValue.length > 1) {
                        fetch(
                          `https://www.izemak.com/azimak/public/api/searchparty/${searchValue}`
                        )
                          .then((res) => res.json())
                          .then((res) => {
                            setData(res.data);
                          });
                      }
                    } else {
                      getData();
                    }
                  }}
                >
                  {" "}
                  بحث
                </button>
              </div>
              <Link to="/add_party" className="add_party center">
                <div className={`add_party_link`}>
                  <FaPlus className={` icon`} /> <span> إضافة حفل جديد</span>
                </div>
              </Link>
            </div>

            <div className="table_container">
              <table className={`table`}>
                <thead>
                  <tr>
                    <th>إسم الحفلة</th>
                    <th>معاد الحفلة</th>
                    <th>عنوان الحفلة</th>
                    <th>#######</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((party) => {
                    return (
                      <tr key={party.id}>
                        <td> {party.name}</td>
                        <td>{party.time} </td>
                        <td>
                          <p>{party.address}</p>
                        </td>
                        <td className={` icons_td`}>
                          <span>
                            <MdDelete
                              className={`icon`}
                              //   onClick={() => {
                              //     deleteP(party);
                              //   }}
                              onClick={() => {
                                Swal.fire({
                                  title: `هل انت متأكد انك ترغب في حذف حفلة ${party.name}`,
                                  showCancelButton: true,
                                }).then((data) => {
                                  if (data.isConfirmed) {
                                    setLoader(true);
                                    fetch(
                                      `https://www.izemak.com/azimak/public/api/deleteparty/${party.id}`,
                                      {
                                        method: "DELETE",
                                      }
                                    )
                                      .then((res) => res.json)
                                      .then((data) => {
                                        getData();
                                      });
                                  }
                                });
                              }}
                            />

                            <Link
                              to={`/add_invitors/${party.id}`}
                              className={`addLink`}
                            >
                              <FaUserEdit className={`icon`} />
                            </Link>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className={`${styles.pagination}`}>
              <div className={`${styles.pagination_container}`}>
                <button
                  onClick={() => {
                    if (pageNumber > 1) {
                      setPageNumber(pageNumber - 1);
                    }
                  }}
                  disabled={pageNumber === 1}
                  className={`${pageNumber === 1 ? "" : styles.control}`}
                >
                  Prev
                </button>
                <div className={`${styles.numbers}`}>
                  <button className={`${styles.active}`}>{pageNumber}</button>
                </div>
                <button
                  onClick={() => {
                    if (pageNumber < totalPages) {
                      setPageNumber(pageNumber + 1);
                    }
                  }}
                  disabled={pageNumber === totalPages}
                  className={`${
                    pageNumber === totalPages ? "" : styles.control
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
