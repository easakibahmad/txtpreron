export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    window.location.href = "/login"; 
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}
