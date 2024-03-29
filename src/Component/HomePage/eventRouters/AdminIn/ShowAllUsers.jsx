import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

 function ShowAllUsers(props){
  const { setEventClick } = props;
  const inpueRef = useRef("");
  const inpueAllRef = useRef("");

  const [ArrUsers, setArrUsers] = useState(null);
  const [vi, setVi] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASIC_URL_SERVER}/admin/ShowAllUsersAdmin`).then((res) => {
      setArrUsers(res.data.GetIt);
      const tempArr = new Array(res.data.GetIt.length).fill(false);
      setVi(tempArr);
    });
  }, []);

  useEffect(() => {
    console.log(vi);
  }, [vi]);

  function sendMsgToUsers() {
    const result = vi.filter((item) => item);
    const tempArr = new Array(ArrUsers.length).fill(false);
    setVi(tempArr);
    axios
      .post(`${process.env.REACT_APP_BASIC_URL_SERVER}/admin/sendMsgToUser`, {
        arrUsers: result,
        msg: inpueRef.current.value,
      })
      .then(() => {
        alert("ההודעה נשלחה !");
        const tempArr = new Array(ArrUsers.length).fill(false);
        setVi(tempArr);
        inpueRef.current.value = "";
      });
  }

  function changeViAll() { 
    const mapp = ArrUsers.map((item) => {
      return item._id;
    });
    setVi(mapp);
  }
  return (
    <>
      <div >
      <h1 >
        שלח הודעה למשתמשים
      </h1>
      <br />
      <br />
      <input type="text" ref={inpueRef} />
      <button  onClick={sendMsgToUsers}>שלח הודעה</button>
      <br />
      <br />
      <button onClick={changeViAll}>בחירת כל המשתמשים</button>
      </div>
      <br />
      <br />
      <br />

      <div className="container text-center">
        <div className="row">
          {ArrUsers &&
            ArrUsers.map((item, index) => {
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
            })}
        </div>
      </div>
    </>
  );
};
export default ShowAllUsers