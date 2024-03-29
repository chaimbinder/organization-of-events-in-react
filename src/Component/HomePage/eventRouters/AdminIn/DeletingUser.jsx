import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

 function DeletingUser (props) {
  const { setEventClick } = props;
  const [ArrUsers, setArrUsers] = useState(null);
  const [vi, setVi] = useState([]);
  const [cookiesuserName, setcookiesuserName] = useCookies(["UserName"]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASIC_URL_SERVER}/admin/ShowAllUsersAdmin`).then((res) => {
      console.log(res.data);
      setArrUsers(res.data.GetIt);
      const tempArr = new Array(res.data.GetIt.length).fill(false);
      setVi(tempArr);
    });
  }, []);

  useEffect(() => {
    console.log(vi);
  }, [vi]);

  function deleteToUsers() {
    const result = vi.filter(Boolean);
    const tempArr = new Array(ArrUsers.length).fill(false);
    setVi(tempArr);

    axios
      .post(`${process.env.REACT_APP_BASIC_URL_SERVER}/admin/deleteUser`, {
        Name: cookiesuserName.UserName,
        IdUser: result,
      })
      .then(() => {
        alert("המשתמש נמחק");
        const tempArr = new Array(ArrUsers.length).fill(false);
        setVi(tempArr);
      });
  }

  return (
    <>
    <div>
      <h1 dir="rtl" style={{ textAlign: "center" }}>
        בחר אלו משתמשים למחוק
      </h1>
      <br />
      <button onClick={deleteToUsers}> מחק </button>
    </div>
      <br />
      <br />
      <div className="container text-center">
        <div className="row">
          {ArrUsers &&
            ArrUsers.map((item, index) => {
              if (item.admin !== "true") {
                return (
                  <div className="col" key={index}>
                    <div className="card" style={{ width: "10rem" }}>
                      <img
                        style={{
                          width: "10rem",
                          height: "8rem",
                          backgroundSize: "cover",
                          float: "left",
                        }}
                        src={item.photoUser}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 dir="rtl" className="card-title">
                          {item.Name}
                        </h5>
                        <p dir="rtl" className="card-text"></p>

                        <input
                          type="checkbox"
                          checked={vi[index]}
                          onChange={() => {
                            const temp = [...vi];
                            temp[index] = !temp[index] ? item._id : false;
                            setVi(temp);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};
export default DeletingUser