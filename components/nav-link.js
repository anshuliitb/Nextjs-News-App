'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
  const path = usePathname();
  console.log(path);
  

  function isActiveLink() {
        if (path=="/news/create" && children === "News") {
          return "";
        }else if (path.startsWith(href)) {
          return "active";
        }
        else {
          return "";
        } 
      }
  return (
    <Link href={href} className={isActiveLink()}>
      {children}
    </Link>
  );
}
