import Header from './Header';

function Layout({children}) {
  return (
    <div className="layout">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;