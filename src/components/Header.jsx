

function Header({ name }) {
    return ( 
        <div className="w-full pt-5 inset-shadow">
            <h1 className="text-2xl font-bold">Hello {name}!👋</h1>
            <p className="text-md text-black/60">Here's your financial overview</p>
        </div>
     );
}

export default Header;