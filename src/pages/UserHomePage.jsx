import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import '../home.css';

function UserHomePage() {
  const [donor, setDonor] = useState(false);
  const [needful, setNeedfull] = useState(false);
  const { user } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log(user);

      if (response.data.userType === 'Donor') {
        setDonor(true);
      } else {
        setNeedfull(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <div className="userHomePage">
      {donor && (
        <>
          <div className="donorHP">
            <div>
              <p>
                It is with hope that we thank you for your contribution. <br />
                The act of giving means helping somebody else, making them happy in some way, no
                matter how simple your action may be. <hr /> Within each help, a merit of its own.
              </p>
            </div>
            <div className="donationCards">
              <div>
                <Link className="LinkBtnHome" to="/basket/add">
                  Choose Predefined Basket
                </Link>
              </div>
              <div>
                <Link className="LinkBtnHome" to="/basket/create">
                  Make your own Basket
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {needful && (
        <>
          <div className="needfulHP">
            <div className="hp-background"></div>
            <h1>IM HEREEEEEE</h1>
            <div className="search">Future Searchbar</div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserHomePage;
