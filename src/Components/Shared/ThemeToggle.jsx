import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "rokthona" 
  );

  useEffect(() => {
   
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="btn btn-sm"
      onClick={() =>
       setTheme(theme === "darkblood" ? "rokthona" : "darkblood")

      }
    >
      {theme === "rokthona" ? "🌙 " : "🌞 "}
    </button>
  );
};

export default ThemeToggle;
