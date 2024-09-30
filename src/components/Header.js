// src/components/Header.js
'use client'
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header style={{paddingInline:'40px',paddingTop:"20px",paddingBottom:"20px",backgroundColor:'green',color:"white"}}>
      <nav style={{display:'flex',justifyContent: 'space-between',alignItems:'center'}}>
        <div>
          <Link href="/users">{t('users')}</Link>
        </div>
        <div>
          <Link href="/albums">{t('albums')}</Link>
        </div>
        <div>
          <Link href="/posts">{t('posts')}</Link>
        </div>
      </nav>
      <div style={{marginTop:10}}>
            <LanguageSwitcher/>
      </div>
    </header>
  );
};

export default Header;
