export default function Admin(){

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    }

  return(
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={()=>handleLogout()}>
        Logout
      </button>
    </div>
  )
}