import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import logo from '../assets/images/fgclogo.png';
import { AuthContext } from '../context/AuthContext'; // Update with your path

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isAdmin = user && user.email === 'huzaifa@gmail.com';
  const isTeamLead = user && user.email === 'huzaifa8195@gmail.com';

  return (
    <nav className="bg-red-800">
      <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link to='/' className="flex flex-shrink-0 items-center mr-4">
              <img className="h-10 w-auto" src={logo} alt="React Jobs" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">FGC</span>
            </Link>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Home</NavLink>
                <NavLink to="/jobs" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Events</NavLink>
                {isAdmin && (
                  <>
                    <NavLink to="/add-job" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Create Event</NavLink>
                    <NavLink to="/applicationlist" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">View Applications</NavLink>
                    <NavLink to="/eventrequestlist" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">View Event Requests</NavLink>
                  </>
                )}

                {isTeamLead && (
                  <>
                    <NavLink to="/viewtask" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Tasks</NavLink>
                    <NavLink to="/addtask" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Create Task</NavLink>
                    <NavLink to="/appointmember" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Appoint Members</NavLink>
                   </>
                )}


                <NavLink to="/application" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Join Us</NavLink>
                <NavLink to="/eventrequest" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Request Event</NavLink>
                <NavLink to="/blog" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Blog</NavLink>
                <NavLink to="/gallery" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Gallery</NavLink>

                {user ? (
                  <>
                    <span className="text-white rounded-md px-3 py-2">{user.email}</span>
                    <button onClick={handleLogout} className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Logout</button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Login</NavLink>
                    <NavLink to="/signup" className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">Signup</NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
