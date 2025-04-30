import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center h-12 bg-black/60 text-white flex items-center justify-center bottom-0">
        <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by TinderGO</p>
        </aside>
    </footer>
  )
}

export default Footer