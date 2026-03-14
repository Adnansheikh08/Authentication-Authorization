export default function User(){
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    }
  return(
    <div>
      <h1>User Dashboard</h1>
      <button onClick={()=>handleLogout()}>
        Logout
      </button>
    </div>
  )
}