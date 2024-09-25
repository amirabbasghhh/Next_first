// src/components/Header.js
import Link from "next/link";

const Header = () => {
  return (
    <header style={{paddingInline:'40px',paddingTop:"20px",paddingBottom:"20px",backgroundColor:'green',color:"white"}}>
      <nav style={{display:'flex',justifyContent: 'space-between',alignItems:'center'}}>
        <div>
          <Link href="/users">users</Link>
        </div>
        <div>
          <Link href="/albums">albums</Link>
        </div>
        <div>
          <Link href="/posts">posts</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
