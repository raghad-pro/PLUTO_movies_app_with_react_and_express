import '../App.css';
export default function Header({ onSearch }) {

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) onSearch(query);
    }
  }

  return (
    <header id="mainHeader">
      <div className="container">

        <div className="logo">
          <span>new</span> movie
        </div>

        <div className="search">
          <i className="fas fa-search"></i>
          <input
            type="search"
            placeholder="Search..."
            onKeyDown={handleKeyDown}
          />
        </div>

      </div>
    </header>
  );
}