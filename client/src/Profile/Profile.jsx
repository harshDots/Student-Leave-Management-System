import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import "../Profile/Profile.css";
import axios from "axios";
import Spinner from "../Components/Spinner";

function Profile() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    enrollNo: "",
    email: "",
    phoneNumber: "",
    batch: "",
    mentor: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://0f819354-3c43-4575-bf68-e22befe09770-00-339m6mfv7g82q.sisko.replit.dev/user/profile",
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log(res);
        setLoading(true);
        const responseData = res.data;
        setData({
          name: responseData.firstName + " " + responseData.lastName,
          enrollNo: responseData.enrollno,
          email: responseData.email,
          phoneNumber: responseData.phoneNumber,
          batch: responseData.batch,
          mentor:
            responseData.mentorFirstName + " " + responseData.mentorLastName,
        });
        setLoading(false);
      } catch (err) {
        console.log("ERR", err);
      }
    };

    fetchData();
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <main className="main-profile">
          <div className="settings">
            <div className="settings__wrapper">
              <div className="details__form">
                <h1 className="profile__title">Profile</h1>
                <form>
                  <div className="form__group">
                    <div>
                      <label>Name</label>
                      <input type="text" value={data.name} placeholder="Name" />
                    </div>

                    <div>
                      <label>Enrollment No</label>
                      <input
                        type="text"
                        value={data.enrollNo}
                        placeholder="Enrollment No"
                      />
                    </div>
                  </div>

                  <div className="form__group">
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        value={data.email}
                        placeholder="Email"
                      />
                    </div>

                    <div>
                      <label>Phone Number</label>
                      <input
                        type="number"
                        value={data.phoneNumber}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div className="form__group">
                    <div>
                      <label>Batch</label>
                      <input
                        type="text"
                        value={data.batch}
                        placeholder="Batch"
                      />
                    </div>

                    <div>
                      <label>Mentor</label>
                      <input
                        type="text"
                        value={data.mentor}
                        placeholder="Mentor"
                      />
                    </div>
                  </div>

                  <div className="form__group">
                    <div className="profile__img-btns"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default Profile;
